"use client";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import GoongMap from "./MapPage";
import { MapListingType } from "@/types";
import Link from "next/link";
const MapListing = ({ listStores, userLatitude, userLongitude, loadingProps }: MapListingType) => {
  const [loading, setLoading] = useState<boolean>(loadingProps);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div>
        {listStores.length === 0  && <h2 className="text-green-600 font-bold text-lg">
          10 cửa hàng đang có sản phẩm giảm giá quanh bạn
        </h2>}
        <div className="max-h-[425px] overflow-auto scrollbar-container">
        {loading ? (
            <p className="text-center text-gray-600">Đang tải dữ liệu...</p>
          ) : listStores.length === 0 ? (
            <p className="text-center text-gray-600">Không có cửa hàng nào cả</p>
          ) : (
            listStores.map((listing) => (
              <Link key={listing.id}href={`/store/${listing.id}`}>
                <div  className="rounded-lg p-2 flex gap-2 mb-4 hover:bg-gray-50">
                <Image
                  src={listing.avatar}
                  alt={listing.store_name}
                  width={200}
                  height={100}
                  className="rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{listing.store_name}</h3>
                  <p className="text-sm text-gray-600">{listing.store_type}</p>
                  <p className="text-xs text-gray-500">{listing.opening_hours}</p>
                  <p className="text-xs">{listing.description}</p>
                  <p className="text-xs text-gray-500">
                    📧 {listing.contact_email} | 📞 {listing.contact_phone}
                  </p>
                  <span
                    className={`text-sm font-semibold ${
                      listing.status === "Open" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {listing.status}
                  </span>
                </div>
                <FaHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
              </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="relative">
        <GoongMap loadingProps={loadingProps} listStores={listStores} userLatitude={userLatitude} userLongitude={userLongitude} setLoading={setLoading}  />
      </div>
    </div>
  );
};
export default MapListing;
