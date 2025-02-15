import { useState, useEffect } from "react";

interface UserLocation {
  latitude: number;
  longitude: number;
}

const useUserLocation = () => {
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

export default useUserLocation;
