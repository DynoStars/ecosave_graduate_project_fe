// app/map/ClientLocation.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";
const ClientLocation: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Redirect to the MapPage with coordinates as query parameters
            router.push(`/map?lat=${latitude}&lng=${longitude}`);
          },
          (err) => {
            setError("Không thể lấy vị trí người dùng: " + err.message);
          }
        );
      } else {
        setError("Trình duyệt không hỗ trợ định vị.");
      }
    };
    getUserLocation();
  }, [router]);
  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {!error && <Loading />}
    </div>
  );
};
export default ClientLocation;
