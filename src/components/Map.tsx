"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

const HomeMapSecsion = () => {
  const [map, setMap] = useState<any>(null);
  const accessToken = "yn7zQK2me9A32r6ZVGl5BuBYBwjifSF3dqBbo9Wp";
  const defaultLocation: [number, number] = [108.2432527, 16.0600528]; // Centered at Ho Chi Minh City

  useEffect(() => {
    if (typeof window !== "undefined" && window.goongjs) {
      window.goongjs.accessToken = accessToken;

      const newMap = new window.goongjs.Map({
        container: "map",
        style: "https://tiles.goong.io/assets/goong_map_web.json",
        center: defaultLocation,
        zoom: 12,
      });

      setMap(newMap);

      newMap.on("load", () => {
        // Add marker for default location
        new window.goongjs.Marker()
          .setLngLat(defaultLocation)
          .setPopup(new window.goongjs.Popup().setText("Default Location"))
          .addTo(newMap);
      });
    }
  }, []);

  return (
    <div className="w-full">
      <Script
        src="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js"
        onLoad={() => console.log("GoongJS Loaded")}
        strategy="beforeInteractive"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css"
      />
      <Link href="/map">
        <div id="map" style={{ width: "100%", height: "300px" }}></div>
      </Link>
    </div>
  );
};

export default HomeMapSecsion;
