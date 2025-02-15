"use client";

import React from "react";
import Image from "next/image";
import { Product, Store } from "@/types";
import Products from "@/components/homeSection/Products";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaStore,
} from "react-icons/fa";
import { MdDirectionsWalk } from "react-icons/md";
import ValuesSection from "@/components/homeSection/ValuesSection";
import BenefitsSection from "@/components/homeSection/BenefitsSection";
import calculateDistance from "@/utils/calculateDistance";
import useUserLocation from "@/hooks/useUserLocation";

interface StorePageProps {
  store: Store;
  products: Product[];
}

const StorePage: React.FC<StorePageProps> = ({ store, products }) => {
  const userLocation = useUserLocation();

  return (
    <div className="flex flex-col">
      <section className="mx-auto flex flex-col gap-8 w-full">
        <div className="w-full flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-green-600 text-3xl md:text-4xl font-bold">
              {store.store_name}
            </h1>
            <p className="text-xl md:text-2xl font-semibold mt-4">
              {store.soft_description}
            </p>
            <p className="mt-4 text-gray-600 text-sm md:text-base">
              {store.description}
            </p>
            <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-full">
              5 ⭐
            </button>
          </div>

          <div className="flex-1">
            <Image
              src={store.avatar}
              alt="Store Image"
              width={600}
              height={400}
              className="rounded-2xl object-cover w-full h-auto"
            />
          </div>
        </div>

        <div className="col-span-2 bg-blue-100 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Image
              className="bg-primary text-white rounded-full"
              src={store.logo}
              alt="Store Image"
              width={50}
              height={50}
            />

            <div>
              <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                <FaStore className="text-blue-600" />
                {store.store_name}
              </h2>
              <p className="flex items-center gap-2 text-sm md:text-base">
                <FaPhoneAlt className="text-green-600" />
                {store.contact_phone || "Không có số điện thoại"}
              </p>
              <p className="flex items-center gap-2 text-sm md:text-base">
                <FaEnvelope className="text-red-600" />
                {store.contact_email || "Không có email"}
              </p>
            </div>
          </div>

          <p className="flex items-center gap-2 text-sm md:text-base">
            <MdDirectionsWalk className="text-purple-600" />
            {userLocation
              ? `${calculateDistance([store.latitude, store.longitude], userLocation)} km`
              : "Không có thông tin vị trí"}
          </p>
          <p className="flex items-center gap-2 text-sm md:text-base">
            <FaMapMarkerAlt className="text-yellow-600" />
            {store.address || "Không có địa chỉ"}
          </p>
          <p className="flex items-center gap-2 text-sm md:text-base">
            <FaClock className="text-orange-600" />
            {store.opening_hours
              ? `${store.opening_hours} Giờ hoạt động`
              : "Chưa cập nhật giờ mở cửa"}
          </p>

          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full ${
                store.status === "active"
                  ? "bg-green-500"
                  : store.status === "closed"
                  ? "bg-red-500"
                  : "bg-gray-400"
              }`}
            />
            <p>{store.status === "active" ? "Hoạt động" : "Đóng cửa"}</p>
          </div>
        </div>
      </section>

      <section className="mt-4 relative min-h-80 flex flex-col md:flex-row items-start justify-between h-auto">
        <Products products={products} />
      </section>

      <section className="relative flex flex-col md:flex-row items-center justify-between h-auto">
        <ValuesSection />
      </section>

      <section className="relative flex flex-col md:flex-row items-center gap-5 h-auto justify-center">
        <BenefitsSection />
      </section>
    </div>
  );
};

export default StorePage;
