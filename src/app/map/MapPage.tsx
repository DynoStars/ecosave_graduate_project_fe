"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { GoongMapProps } from "@/types";

export const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371e3; // Bán kính Trái Đất (mét)
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon1 - lon2) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Khoảng cách tính bằng mét
};

const GoongMap = ({
  listStores,
  userLatitude,
  userLongitude,
  loadingProps,
}: GoongMapProps) => {
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number]>([
    userLongitude,
    userLatitude,
  ]);
  const accessToken = "yn7zQK2me9A32r6ZVGl5BuBYBwjifSF3dqBbo9Wp";

  useEffect(() => {
    if (typeof window !== "undefined" && window.goongjs) {
      window.goongjs.accessToken = accessToken;
      const newMap = new window.goongjs.Map({
        container: "map",
        style: "https://tiles.goong.io/assets/goong_map_web.json",
        center: userLocation,
        zoom: 16,
      });
      setMap(newMap);

      const radiusInMeters = 4000; // Bán kính quét 4km (4000m)

      newMap.on("load", () => {
        markers.forEach((marker) => marker.remove());
        setMarkers([]);

        const userMarker = new window.goongjs.Marker()
          .setLngLat(userLocation)
          .setPopup(new window.goongjs.Popup().setText("Vị trí của bạn"))
          .addTo(newMap);
        setMarkers((prev) => [...prev, userMarker]);

        const storesInRange = listStores.filter((store) => {
          const distance = getDistance(
            userLocation[1],
            userLocation[0],
            store.latitude,
            store.longitude
          );
          return distance <= radiusInMeters;
        });

        storesInRange.forEach((store) => {
          const distance = getDistance(
            userLocation[1],
            userLocation[0],
            store.latitude,
            store.longitude
          );

          const popupContent = `
            <div class="popup-content max-w-[200px] cursor-pointer">
              <a href="/store/${store.id}">
                <img src="${store.avatar}" alt="${store.store_name}"
                  class="w-full h-24 object-cover rounded-md hover:opacity-90 transition-opacity duration-300" />
              </a>
              <h3 class="text-sm font-semibold mt-2">${store.store_name}</h3>
              <p class="text-xs text-gray-500">${Math.round(
                distance
              )}m từ vị trí của bạn</p>
            </div>
          `;

          const marker = new window.goongjs.Marker({ color: "#FF5733" })
            .setLngLat([store.longitude, store.latitude])
            .addTo(newMap);

          setMarkers((prev) => [...prev, marker]);

          const popup = new window.goongjs.Popup({
            offset: 25,
            closeButton: false,
          })
            .setHTML(popupContent)
            .setMaxWidth("200px");

          marker.getElement().addEventListener("mouseenter", () => {
            marker.setPopup(popup).togglePopup();
          });

          marker.getElement().addEventListener("mouseleave", () => {
            setTimeout(() => {
              if (document.querySelector(".popup-content:hover")) return;
              marker.getPopup().remove();
            }, 200);
          });
        });
        let increasing = true;
        let radarRadius = 400;
        let radarOpacity = 0.8;
        newMap.addLayer({
          id: "radar-scan",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: userLocation,
              },
            },
          },
          paint: {
            "circle-radius": radarRadius,
            "circle-color": "rgba(0, 150, 255, 0.5)",
            "circle-opacity": radarOpacity,
          },
        });
        // Tạo hiệu ứng quét
        setInterval(() => {
          if (increasing) {
            radarRadius += 10;
            radarOpacity -= 0.05;
            if (radarRadius >= 300) increasing = false;
          } else {
            radarRadius = 100;
            radarOpacity = 0.8;
            increasing = true;
          }
          newMap.setPaintProperty("radar-scan", "circle-radius", radarRadius);
          newMap.setPaintProperty("radar-scan", "circle-opacity", radarOpacity);
        }, 100);
      });

      return () => {
        newMap.remove();
        markers.forEach((marker) => marker.remove());
      };
    }
  }, [userLocation, listStores]);

  return (
    <div className="w-full">
      {loadingProps && (
        <p className="text-center text-gray-600">Đang tải bản đồ...</p>
      )}
      <Script
        src="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js"
        onLoad={() => console.log("GoongJS Loaded")}
        strategy="beforeInteractive"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css"
      />
      <div id="map" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default GoongMap;
