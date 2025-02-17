 const calculateDistance = (userCoords, storeCoords) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const [lat1, lon1] = userCoords;
  const [lat2, lon2] = storeCoords;

  const R = 6371; // Bán kính Trái Đất (km)
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(0); // Trả về khoảng cách (km) với 2 chữ số thập phân
};

export default calculateDistance;