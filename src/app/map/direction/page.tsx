"use client";
import React, { useEffect, useState } from "react";
import Direction from "./Direction";
import CarLoading from "@/components/loading/CarLoading";
export default function Page() {
  const [userLocation, setUserLocation] = useState<string | null>(null);
  useEffect(() => {
    // Kiểm tra window để đảm bảo chỉ chạy trên client-side
    if (typeof window !== "undefined") {
      const location = localStorage.getItem("user_location");
      if (location) setUserLocation(location);
    }
  }, []);
  // Kiểm tra nếu chưa có userLocation
  if (!userLocation) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        <CarLoading />
      </div>
    );
  }
  try {
    const [lat, lng] = JSON.parse(userLocation);
    return (
      <>
        <Direction
          origin={`${lat},${lng}`}
          destination="16.080000,108.243000"
        />
      </>
    );
  } catch (error) {
    console.error("Lỗi parse userLocation:", error);
    return <div>Lỗi khi lấy vị trí của bạn.</div>;
  }
}
