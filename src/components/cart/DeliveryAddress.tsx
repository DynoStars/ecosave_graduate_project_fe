import React from 'react';
import type { DeliveryAddressProps } from '@/types';
import { MapPin } from 'lucide-react';
import calculateDistance from '@/utils/calculateDistance';
import { useUserLocation } from '@/hooks/useUserLocation';

export const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ 
  storeAddress, 
  userAddress, 
  storeLatitude,
  storeLongitude,
  onChangeAddress 
}) => {
  const userLocation = useUserLocation();
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-medium mb-1">Địa chỉ cửa hàng</h2>
          <p className="text-gray-600">{storeAddress}</p>
          <p className="text-gray-400 text-sm">Khoảng cách tới nhà bạn: 
            {userLocation
              ? ` ${calculateDistance(
                  [
                    storeLatitude,
                    storeLongitude,
                  ],
                  userLocation
                )} km`
              : "Không có thông tin vị trí"}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-1 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            Địa chỉ của bạn
          </h2>
          <p className="text-gray-600">{userAddress}</p>
          <button 
            onClick={onChangeAddress}
            className="text-teal-500 text-sm hover:text-teal-600"
          >
            Thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};
