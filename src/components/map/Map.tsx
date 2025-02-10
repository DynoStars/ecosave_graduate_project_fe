import { useEffect } from "react";

const MapComponent = () => {
  useEffect(() => {
    // Access token for Goong Maps
    goongjs.accessToken = "yn7zQK2me9A32r6ZVGl5BuBYBwjifSF3dqBbo9Wp";

    // Initialize the map
    const map = new goongjs.Map({
      container: "map",
      style: "https://tiles.goong.io/assets/goong_map_web.json",
      center: [108.2432527, 16.0600528],
      zoom: 17,
    });

    // Function to get the user's location
    const getUserLocation = () => {
      return new Promise<[number, number]>((resolve, reject) => {
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

    // Function to generate random markers around a center point
    const generateRandomMarkers = (center: [number, number], maxDistance: number, numMarkers: number) => {
      const [centerLng, centerLat] = center;
      const markers: [number, number][] = [];

      for (let i = 0; i < numMarkers; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * maxDistance;

        const deltaLat = (distance / 111320) * Math.sin(angle);
        const deltaLng =
          (distance / (111320 * Math.cos((centerLat * Math.PI) / 180))) * Math.cos(angle);

        const markerLat = centerLat + deltaLat;
        const markerLng = centerLng + deltaLng;

        markers.push([markerLng, markerLat]);
      }

      return markers;
    };

    // Function to calculate bounding circle
    const calculateBoundingCircle = (coordinates: [number, number][]) => {
      const lngSum = coordinates.reduce((sum, [lng]) => sum + lng, 0);
      const latSum = coordinates.reduce((sum, [, lat]) => sum + lat, 0);

      const centerLng = lngSum / coordinates.length;
      const centerLat = latSum / coordinates.length;

      const distances = coordinates.map(
        ([lng, lat]) =>
          Math.sqrt(
            Math.pow(lng - centerLng, 2) + Math.pow(lat - centerLat, 2)
          )
      );

      const radius = Math.max(...distances) * 111320; // Convert degrees to meters
      return { center: [centerLng, centerLat], radius };
    };

    // Load the map and add markers
    map.on("load", async () => {
      try {
        const userLocation = await getUserLocation();
        const allCoordinates = [userLocation];

        // Add a marker at the user's location
        new goongjs.Marker()
          .setLngLat(userLocation)
          .setPopup(new goongjs.Popup({ offset: 25 }).setText("User's Location"))
          .addTo(map);

        // Generate random markers around the user's location
        const randomMarkers = generateRandomMarkers(userLocation, 1000, 20);
        randomMarkers.forEach(([lng, lat], index) => {
          new goongjs.Marker({ color: "#FF5733" })
            .setLngLat([lng, lat])
            .setPopup(
              new goongjs.Popup({ offset: 25 }).setText(`Marker ${index + 1}`)
            )
            .addTo(map);
          allCoordinates.push([lng, lat]);
        });

        // Calculate the bounding circle
        const { center, radius } = calculateBoundingCircle(allCoordinates);

        // Create a GeoJSON source for the circle
        const createCircleGeoJSON = (center: [number, number], radius: number) => {
          const [lng, lat] = center;
          const points = 64;
          const coordinates: [number, number][] = [];

          for (let i = 0; i < points; i++) {
            const angle = (i * 360) / points;
            const offsetLng =
              radius *
              Math.cos((angle * Math.PI) / 180) /
              (111320 * Math.cos((lat * Math.PI) / 180));
            const offsetLat = (radius * Math.sin((angle * Math.PI) / 180)) / 111320;

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

        const circleGeoJSON = createCircleGeoJSON(center, 0); // Initial radius is 0

        // Add GeoJSON source for the bounding circle
        map.addSource("bounding-circle", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [circleGeoJSON], // GeoJSON data for the circle
          },
        });

        // Add a layer to render the circle on the map
        map.addLayer({
          id: "bounding-circle-layer",
          type: "fill",
          source: "bounding-circle",
          paint: {
            "fill-color": "#888888",
            "fill-opacity": 0.4,
          },
        });

        // Variables for the animation
        let currentRadius = 0;
        let increasing = true; // Flag to control the direction of radius change

        // Function to animate the circle
        const animateCircle = () => {
          if (increasing) {
            currentRadius += 5; // Increase the radius
            if (currentRadius >= radius) {
              increasing = false; // Start decreasing when max radius is reached
            }
          } else {
            currentRadius -= 5; // Decrease the radius
            if (currentRadius <= 0) {
              increasing = true; // Start increasing when min radius is reached
            }
          }

          const updatedCircleGeoJSON = createCircleGeoJSON(center, currentRadius);

          // Update the GeoJSON data for the circle
          map.getSource("bounding-circle").setData({
            type: "FeatureCollection",
            features: [updatedCircleGeoJSON],
          });

          // Repeat the animation
          requestAnimationFrame(animateCircle);
        };

        // Start the animation
        animateCircle();

        // Function to create a route from the user's location to a marker
        const createRoute = (from: [number, number], to: [number, number]) => {
          return {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [from, to],
            },
          };
        };

        // Add route lines from the user's location to each random marker
        randomMarkers.forEach(([lng, lat]) => {
          const routeGeoJSON = createRoute(userLocation, [lng, lat]);

          map.addSource("route-" + lng + "-" + lat, {
            type: "geojson",
            data: routeGeoJSON,
          });

          map.addLayer({
            id: "route-" + lng + "-" + lat,
            type: "line",
            source: "route-" + lng + "-" + lat,
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#FF5733",
              "line-width": 2,
            },
          });
        });
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  return <div id="map" style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }} />;
};

export default MapComponent;
