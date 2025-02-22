import { getStoreById } from '@/api';
import { Store } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface CheckoutStoreInfoProps {
  storeId: number | string;
}

export default function CheckoutStoreInfo({ storeId }: CheckoutStoreInfoProps) {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStoreInfo() {
      try {
        setLoading(true);
        setError(null);
        const response = await getStoreById(storeId);
        setStore(response);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (storeId) {
      fetchStoreInfo();
    }
  }, [storeId]);

  if (loading) return <div>Loading store information...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!store) return <div>Store not found</div>;

  return (
    <div className="p-4 border rounded-lg bg-white flex items-center space-x-4 z-10">
      {/* Hình ảnh cửa hàng */}
      <Image
        src={store.avatar || store.logo}
        alt={store.store_name}
        width={100}
        height={100}
        className="w-24 h-24 object-cover rounded-lg"
      />
      {/* Thông tin cửa hàng */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{store.store_name}</h2>
        <p className="text-gray-700"><strong>Địa chỉ:</strong> {store.address}</p>
        <p className="text-gray-700"><strong>Trạng thái:</strong> {store.status}</p>
        <p className="text-gray-700"><strong>Giờ hoạt động:</strong> {store.opening_hours || "Not available"}</p>
      </div>
    </div>
  );
}
