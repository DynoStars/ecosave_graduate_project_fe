export const getUserLocation = (): [number, number] | null => {
    const userLocation = localStorage.getItem("user_location");
    return userLocation ? JSON.parse(userLocation) : null;
};
