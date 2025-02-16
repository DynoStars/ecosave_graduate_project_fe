"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product, Store } from "@/types";
import Products from "@/components/homeSection/Products";
import { FaMapMarkerAlt, FaClock, FaStore } from "react-icons/fa";
import { MdDirectionsWalk } from "react-icons/md";
import ValuesSection from "@/components/homeSection/ValuesSection";
import BenefitsSection from "@/components/homeSection/BenefitsSection";
import calculateDistance from "@/utils/calculateDistance";
import { useUserLocation } from "@/hooks/useUserLocation";
import { motion } from "framer-motion";
import banner01 from "../../../assets/images/banner/banner01.jpg";
import banner02 from "../../../assets/images/banner/banner02.png";
import banner03 from "../../../assets/images/banner/banner03.jpeg";
interface StorePageProps {
  store: Store;
  products: Product[];
}
const StorePage: React.FC<StorePageProps> = ({ store, products }) => {
  const userLocation = useUserLocation();
  const banners = [banner01, banner02, banner03];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);
  const getStoreStatus = () => {
    switch (store.status) {
      case "active":
        return "Hoạt động";
      case "closed":
        return "Đóng cửa";
      default:
        return "Không xác định";
    }
  };
  return (
    <div className="flex flex-col gap-8 mt-10 w-full">
      {/* Store Header */}
      <section className="relative w-full overflow-hidden">
        <div className="w-full h-[350px] relative">
          {banners.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Banner Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className={`absolute transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
            />
          ))}
        </div>
      </section>
      {/* Store Info */}
      <section className="bg-white p-8 rounded-lg grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-center justify-center text-center shadow-lg">
        {/* Store Logo & Contact */}
        <div className="flex flex-col items-center gap-6">
          <Image
            src={store.logo}
            alt="Store Logo"
            width={80}
            height={80}
            className="rounded-full shadow-md"
            onError={(e) => (e.currentTarget.src = "/fallback-logo.png")}
          />
          <div>
            <h2 className="text-2xl font-bold flex items-center justify-center gap-3">
              <FaStore className="text-blue-600" /> {store.store_name}
            </h2>
            {store.contact_phone && (
              <a
                href={`tel:${store.contact_phone}`}
                aria-label="Gọi ngay"
                className="mt-4 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Gọi ngay
              </a>
            )}
          </div>
        </div>
        {/* Store Distance & Address */}
        <div className="flex flex-col items-center gap-4">
          <p className="flex items-center gap-3">
            <MdDirectionsWalk className="text-purple-600 text-xl" />
            {userLocation
              ? `${calculateDistance(
                  [store.latitude, store.longitude],
                  userLocation
                )} km`
              : "Đang xác định khoảng cách"}
          </p>
          <p className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-yellow-600 text-xl" />
            {store.address || "Không có địa chỉ"}
          </p>
        </div>
        {/* Store Hours & Status */}
        <div className="flex flex-col items-center gap-4">
          <p className="flex items-center gap-3">
            <FaClock className="text-orange-600 text-xl" />
            {store.opening_hours
              ? `${store.opening_hours} Giờ hoạt động`
              : "Chưa cập nhật giờ mở cửa"}
          </p>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className={`w-5 h-5 rounded-full shadow-md ${
                store.status === "active" ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <p>{getStoreStatus()}</p>
          </motion.div>
        </div>
      </section>
      {/* Store Description */}
      <section className="bg-gray-50 p-4 md:p-8 text-dark px-8 flex justify-between items-center">
        <div className="max-w-2xl">
          <h4 className="text-xl font-semibold">Giới thiệu cửa hàng</h4>
          <p className="mt-4 text-lg line-clamp-3">{store.soft_description}</p>
        </div>
        <Image src={store.avatar} alt="Store Avatar" width={400} height={300} />
      </section>
      {/* Products Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">
          Sản phẩm của chúng tôi
        </h2>
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
