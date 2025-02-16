"use client";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import GoongMap from "./MapPage";
import { MapListingType } from "@/types";
import Link from "next/link";
import notFoundImage from '../../assets/icons/LOGO-notfound.png';
const MapListing = ({ listStores, userLatitude, userLongitude, loadingProps }: MapListingType) => {
  const [loading, setLoading] = useState<boolean>(loadingProps);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div>
        {listStores.length === 0 && (
          <h2 className="text-green-600 font-bold text-lg text-center">
            {listStores.length} cửa hàng đang có sản phẩm giảm giá quanh bạn
          </h2>
        )}
        <div className="max-h-[425px] overflow-auto scrollbar-container">
          {loading ? (
            <p className="text-center text-gray-600 animate-pulse">Đang tải dữ liệu...</p>
          ) : listStores.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <Image
                src={notFoundImage.src}
                alt="Không có cửa hàng"
                width={200}
                height={200}
                className="mb-6"
              />
              <p className="text-gray-600 text-lg">Không có cửa hàng nào cả</p>
              <p className="text-gray-500">Hãy quay lại sau để xem các ưu đãi mới nhất!</p>
            </div>
          ) : (
            listStores.map((listing) => (
              <Link key={listing.id} href={`/store/${listing.id}`}>
                <div className="rounded-lg p-4 flex gap-4 mb-4 hover:bg-gray-100 transition duration-300">
                  <Image
                    src={listing.avatar}
                    alt={listing.store_name}
                    width={200}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{listing.store_name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{listing.store_type}</p>
                    <p className="text-xs text-gray-500 mb-1">{listing.opening_hours}</p>
                    <p className="text-xs mb-1">{listing.description}</p>
                    <p className="text-xs text-gray-500 mb-2">
                      📧 {listing.contact_email} | 📞 {listing.contact_phone}
                    </p>
                  </div>
                  <FaHeart className="text-gray-400 hover:text-red-500 cursor-pointer transition duration-300" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="relative">
        <GoongMap
          loadingProps={loadingProps}
          listStores={listStores}
          userLatitude={userLatitude}
          userLongitude={userLongitude}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};
export default MapListing;
