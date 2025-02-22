"use client"

import React, { useEffect } from 'react';
// import 'https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css';
import goongjs from '@goongmaps/goong-js';

const TestMap: React.FC = () => {
  useEffect(() => {
    // Access token for Goong Maps
    goongjs.accessToken = 'yn7zQK2me9A32r6ZVGl5BuBYBwjifSF3dqBbo9Wp';

    // Initialize the map
    const map = new goongjs.Map({
      container: 'map',
      style: 'https://tiles.goong.io/assets/goong_map_web.json',
      center: [108.2432527, 16.0600528],
      zoom: 17,
    });

    // Function to get the user's location
    const getUserLocation = (): Promise<[number, number]> => {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve([longitude, latitude]);
            },
            (error) =>
              reject('Không thể lấy vị trí người dùng: ' + error.message)
          );
        } else {
          reject('Trình duyệt không hỗ trợ định vị.');
        }
      });
    };

    // Function to generate random markers around a center point
    const generateRandomMarkers = (
      center: [number, number],
      maxDistance: number,
      numMarkers: number
    ): [number, number][] => {
      const [centerLng, centerLat] = center;
      const markers: [number, number][] = [];

      for (let i = 0; i < numMarkers; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * maxDistance;

        const deltaLat = (distance / 111320) * Math.sin(angle);
        const deltaLng =
          (distance / (111320 * Math.cos((centerLat * Math.PI) / 180))) *
          Math.cos(angle);

        const markerLat = centerLat + deltaLat;
        const markerLng = centerLng + deltaLng;

        markers.push([markerLng, markerLat]);
      }

      return markers;
    };

    // Function to calculate bounding circle
    const calculateBoundingCircle = (
      coordinates: [number, number][]
    ): { center: [number, number]; radius: number } => {
      const lngSum = coordinates.reduce((sum, [lng]) => sum + lng, 0);
      const latSum = coordinates.reduce((sum, [, lat]) => sum + lat, 0);

      const centerLng = lngSum / coordinates.length;
      const centerLat = latSum / coordinates.length;

      const distances = coordinates.map(([lng, lat]) =>
        Math.sqrt(
          Math.pow(lng - centerLng, 2) + Math.pow(lat - centerLat, 2)
        )
      );

      const radius = Math.max(...distances) * 111320;
      return { center: [centerLng, centerLat], radius };
    };

    // Load the map and add markers
    map.on('load', async () => {
      try {
        const userLocation = await getUserLocation();
        const allCoordinates = [userLocation];

        // Add a marker at the user's location
        new goongjs.Marker()
          .setLngLat(userLocation)
          .setPopup(
            new goongjs.Popup({ offset: 25 }).setText("User's Location")
          )
          .addTo(map);

        // Generate random markers around the user's location
        const randomMarkers = generateRandomMarkers(userLocation, 1000, 20);
        randomMarkers.forEach(([lng, lat], index) => {
          new goongjs.Marker({ color: '#FF5733' })
            .setLngLat([lng, lat])
            .setPopup(
              new goongjs.Popup({ offset: 25 }).setText(`Marker ${index + 1}`)
            )
            .addTo(map);
          allCoordinates.push([lng, lat]);
        });

        // Calculate the bounding circle
        const { center, radius } = calculateBoundingCircle(allCoordinates);

        const createCircleGeoJSON = (
          center: [number, number],
          radius: number
        ) => {
          const [lng, lat] = center;
          const points = 64;
          const coordinates: [number, number][] = [];

          for (let i = 0; i < points; i++) {
            const angle = (i * 360) / points;
            const offsetLng =
              (radius *
                Math.cos((angle * Math.PI) / 180)) /
              (111320 * Math.cos((lat * Math.PI) / 180));
            const offsetLat =
              (radius * Math.sin((angle * Math.PI) / 180)) / 111320;

            coordinates.push([lng + offsetLng, lat + offsetLat]);
          }

          coordinates.push(coordinates[0]);
          return {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [coordinates],
            },
          };
        };

        const circleGeoJSON = createCircleGeoJSON(center, 0);

        map.addSource('bounding-circle', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [circleGeoJSON],
          },
        });

        map.addLayer({
          id: 'bounding-circle-layer',
          type: 'fill',
          source: 'bounding-circle',
          paint: {
            'fill-color': '#888888',
            'fill-opacity': 0.4,
          },
        });

        let currentRadius = 0;
        let increasing = true;

        const animateCircle = () => {
          currentRadius += increasing ? 5 : -5;
          if (currentRadius >= radius) increasing = false;
          if (currentRadius <= 0) increasing = true;

          const updatedCircleGeoJSON = createCircleGeoJSON(
            center,
            currentRadius
          );

          map
            .getSource('bounding-circle')
            .setData({
              type: 'FeatureCollection',
              features: [updatedCircleGeoJSON],
            });

          requestAnimationFrame(animateCircle);
        };

        animateCircle();
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  return <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;
};

export default TestMap;
