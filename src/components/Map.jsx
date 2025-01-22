"use client";
import goongjs from '@goongmaps/goong-js';
import { useEffect, useState } from 'react';
import { calculateDistance } from '../utils/calculateDistance'; // Import hàm calculateDistance

const GoongMap = () => {
  const [routeData, setRouteData] = useState(null); // Lưu trữ dữ liệu đường đi
  const [userLocation, setUserLocation] = useState(null); // Lưu trữ vị trí người dùng

  // Hàm lấy dữ liệu đường đi
  const getRoute = async (point1, point2) => {
    try {
      const routeResponse = await fetch(
        `https://rsapi.goong.io/routing?origin=${point1[1]},${point1[0]}&destination=${point2[1]},${point2[0]}&vehicle=car&api_key=zc7ndOPS03EZMDCuusfECSceww6aPEpcQFjougXv`
      );

      if (!routeResponse.ok) {
        throw new Error(`API trả về lỗi với mã trạng thái: ${routeResponse.status}`);
      }

      const routeData = await routeResponse.json();
      console.log(routeData);  // In dữ liệu trả về để kiểm tra

      if (routeData && routeData.routes && routeData.routes.length > 0) {
        setRouteData(routeData);
      } else {
        console.error("Không tìm thấy tuyến đường.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API Goong Directions:", error.message);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Lấy vị trí người dùng
      const getUserLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation([longitude, latitude]); // Lưu vị trí người dùng vào state
            },
            (error) => {
              console.error("Không thể lấy vị trí người dùng:", error);
            }
          );
        } else {
          console.error("Trình duyệt không hỗ trợ lấy vị trí.");
        }
      };

      getUserLocation(); // Gọi hàm lấy vị trí người dùng
    }
  }, []); // Chỉ gọi một lần khi component mount

  useEffect(() => {
    if (userLocation) {
      goongjs.accessToken = 'KYtVeY4vFFh6CikELetXppZhfK1OzEK6BrNand4u';

      const map = new goongjs.Map({
        container: 'map',
        style: 'https://tiles.goong.io/assets/goong_map_web.json',
        center: userLocation, // Vị trí người dùng làm tâm bản đồ
        zoom: 12, // Đặt zoom cho bản đồ
      });

      const point1 = userLocation; // Vị trí người dùng
      const point2 = [105.84300, 21.03000]; // Vị trí cửa hàng (thay đổi theo nhu cầu)

      // Tính toán khoảng cách giữa hai điểm
      const distance = calculateDistance(point1[1], point1[0], point2[1], point2[0]);
      console.log(`Khoảng cách giữa người dùng và cửa hàng là: ${distance.toFixed(2)} km`);

      // Gọi hàm để lấy dữ liệu đường đi
      getRoute(point1, point2);

      // Thêm marker cho các điểm
      map.on('load', () => {
        if (routeData && routeData.routes && routeData.routes.length > 0) {
          // Thêm nguồn geoJSON cho đường đi
          map.addSource('route', {
            type: 'geojson',
            data: routeData.routes[0].geometry, // Lấy dữ liệu đường đi từ routes[0]
          });

          // Tạo layer để vẽ đường đi
          map.addLayer({
            id: 'route-layer',
            type: 'line',
            source: 'route',
            paint: {
              'line-color': '#FF0000',  // Màu đường đi
              'line-width': 5,          // Độ dày của đường đi
            },
          });
        } else {
          console.error("Không có dữ liệu đường đi.");
        }

        // Thêm marker cho các điểm
        new goongjs.Marker()
          .setLngLat(point1)
          .addTo(map);
        new goongjs.Marker()
          .setLngLat(point2)
          .addTo(map);
      });
    }
  }, [userLocation, routeData]); // Cập nhật map khi userLocation và routeData thay đổi

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default GoongMap;
