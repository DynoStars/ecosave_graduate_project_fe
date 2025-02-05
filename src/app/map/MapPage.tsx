"use client"

import { useEffect, useState } from 'react';
import goongjs from '@goongmaps/goong-js';
// import 'goong-js/dist/goong-js.css';

const MapComponent = () => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        goongjs.accessToken = 'yn7zQK2me9A32r6ZVGl5BuBYBwjifSF3dqBbo9Wp';

        const initializeMap = () => {
            const mapInstance = new goongjs.Map({
                container: 'map',
                style: 'https://tiles.goong.io/assets/goong_map_web.json',
                center: [108.2432527, 16.0600528],
                zoom: 17
            });

            mapInstance.on("load", async () => {
                try {
                    const userLocation = await getUserLocation();
                    const allCoordinates = [userLocation];

                    new goongjs.Marker()
                        .setLngLat(userLocation)
                        .setPopup(new goongjs.Popup({ offset: 25 }).setText("User's Location"))
                        .addTo(mapInstance);

                    const randomMarkers = generateRandomMarkers(userLocation, 1000, 20);
                    randomMarkers.forEach(([lng, lat], index) => {
                        new goongjs.Marker({ color: "#FF5733" })
                            .setLngLat([lng, lat])
                            .setPopup(new goongjs.Popup({ offset: 25 }).setText(`Marker ${index + 1}`))
                            .addTo(mapInstance);
                        allCoordinates.push([lng, lat]);
                    });

                    const { center, radius } = calculateBoundingCircle(allCoordinates);
                    const circleGeoJSON = createCircleGeoJSON(center, 0);

                    mapInstance.addSource("bounding-circle", {
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features: [circleGeoJSON],
                        },
                    });

                    mapInstance.addLayer({
                        id: "bounding-circle-layer",
                        type: "fill",
                        source: "bounding-circle",
                        paint: {
                            "fill-color": "#888888",
                            "fill-opacity": 0.4,
                        },
                    });

                    let currentRadius = 0;
                    let increasing = true;

                    const animateCircle = () => {
                        if (increasing) {
                            currentRadius += 5;
                            if (currentRadius >= radius) {
                                increasing = false;
                            }
                        } else {
                            currentRadius -= 5;
                            if (currentRadius <= 0) {
                                increasing = true;
                            }
                        }

                        const updatedCircleGeoJSON = createCircleGeoJSON(center, currentRadius);
                        mapInstance.getSource("bounding-circle").setData({
                            type: "FeatureCollection",
                            features: [updatedCircleGeoJSON],
                        });

                        requestAnimationFrame(animateCircle);
                    };

                    animateCircle();

                    randomMarkers.forEach(([lng, lat]) => {
                        const routeGeoJSON = createRoute(userLocation, [lng, lat]);

                        mapInstance.addSource('route-' + lng + '-' + lat, {
                            type: 'geojson',
                            data: routeGeoJSON
                        });

                        mapInstance.addLayer({
                            id: 'route-' + lng + '-' + lat,
                            type: 'line',
                            source: 'route-' + lng + '-' + lat,
                            layout: {
                                'line-join': 'round',
                                'line-cap': 'round'
                            },
                            paint: {
                                'line-color': '#FF5733',
                                'line-width': 2
                            }
                        });
                    });

                } catch (error) {
                    console.error(error);
                }
            });

            setMap(mapInstance);
        };

        initializeMap();

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);

    const getUserLocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        resolve([longitude, latitude]);
                    },
                    (error) => reject("Không thể lấy vị trí người dùng: " + error.message)
                );
            } else {
                reject("Trình duyệt không hỗ trợ định vị.");
            }
        });
    };

    const generateRandomMarkers = (center, maxDistance, numMarkers) => {
        const [centerLng, centerLat] = center;
        const markers = [];

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

    const calculateBoundingCircle = (coordinates) => {
        const lngSum = coordinates.reduce((sum, [lng]) => sum + lng, 0);
        const latSum = coordinates.reduce((sum, [, lat]) => sum + lat, 0);

        const centerLng = lngSum / coordinates.length;
        const centerLat = latSum / coordinates.length;

        const distances = coordinates.map(
            ([lng, lat]) =>
                Math.sqrt(
                    Math.pow(lng - centerLng, 2) +
                    Math.pow(lat - centerLat, 2)
                )
        );

        const radius = Math.max(...distances) * 111320;
        return { center: [centerLng, centerLat], radius };
    };

    const createCircleGeoJSON = (center, radius) => {
        const [lng, lat] = center;
        const points = 64;
        const coordinates = [];

        for (let i = 0; i < points; i++) {
            const angle = (i * 360) / points;
            const offsetLng =
                radius * Math.cos((angle * Math.PI) / 180) / (111320 * Math.cos((lat * Math.PI) / 180));
            const offsetLat = radius * Math.sin((angle * Math.PI) / 180) / 111320;

            coordinates.push([lng + offsetLng, lat + offsetLat]);
        }

        coordinates.push(coordinates[0]);
        return {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [coordinates],
            },
        };
    };

    const createRoute = (from, to) => {
        return {
            type: "Feature",
            properties: {},
            geometry: {
                type: "LineString",
                coordinates: [from, to]
            }
        };
    };

    return <div id="map" style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;
};

export default MapComponent;