"use client"

import { UserLocation } from "@/types";
import { useState, useEffect } from "react";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLocation = localStorage.getItem("user_location");
      console.log(userLocation)
      if (userLocation) {
        setUserLocation(JSON.parse(userLocation));
        console.log("User Location:", userLocation);
      }
    }
  }, []);

  return userLocation;
};


