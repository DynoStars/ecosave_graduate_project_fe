"use client"

import { UserLocation } from "@/types";
import { useState, useEffect } from "react";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLocation = localStorage.getItem("user_location");
      if (storedLocation) {
        setUserLocation(JSON.parse(storedLocation));
        console.log("Store Coordinates:", userLocation);
        console.log("User Location:", storedLocation);
      }
    }
  }, []);

  return userLocation;
};


