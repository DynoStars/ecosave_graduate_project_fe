"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Image2 from "../../assets/images/auth/registerImage.png";
import Image1 from "../../assets/images/auth/loginImage.png";
import IconComputer from "../../assets/icons/computerIcon.png";
import IconProgess from "../../assets/icons/Progress circle.png";
import IconStore from "../../assets/icons/IconStore.png";
import bgIcon from "../../assets/images/auth/bg-circle.png";
import IconSafe from "../../assets/icons/IconSafe.png";
import IconSaveMoney from "../../assets/icons/Briefcase.png";
import IconIdea from "../../assets/icons/idea.png";
import ProductCategories from "@/components/homeSection/ProductCategories";

import Product1 from '../../assets/images/products/product1.png';
import Product2 from '../../assets/images/products/product2.png';
import Product3 from '../../assets/images/products/product3.png';
import Product4 from '../../assets/images/products/product4.png';
import Product5 from '../../assets/images/products/product5.png';
import {
  FaCarrot,
  FaCoffee,
  FaDrumstickBite,
  FaBreadSlice,
  FaSnowflake,
  FaList,
} from "react-icons/fa";
import Products from "@/components/homeSection/Products";
import PromoBanner from "@/components/banner/PromoBanner";
import ValuesSection from "@/components/homeSection/ValuesSection";
import FoundersSection from "@/components/homeSection/FoundersSection";
import BenefitsSection from "@/components/homeSection/BenefitsSection";
import GoongMap from "../map/MapPage";

export type Category = {
  name: string;
  icon: JSX.Element;
};

export interface Product {
  id: number;
  name: string;
  original_price: string;
  image: string;
  category: string;
  rating: number;
  discount: number;
}

export default function Home() {

  const [categories, setCategories] = useState<Category[]>([
    { name: "Tất cả", icon: <FaList /> }, // Biểu tượng có thể thay đổi tùy thích
    { name: "Rau & Trái cây", icon: <FaCarrot /> },
    { name: "Đồ uống", icon: <FaCoffee /> },
    { name: "Thịt & Hải sản", icon: <FaDrumstickBite /> },
    { name: "Bữa sáng", icon: <FaBreadSlice /> },
    { name: "Đồ đông lạnh", icon: <FaSnowflake /> },
    { name: "Rau & Trái cây", icon: <FaCarrot /> },
    { name: "Đồ uống", icon: <FaCoffee /> },
    { name: "Thịt & Hải sản", icon: <FaDrumstickBite /> },
    { name: "Bữa sáng", icon: <FaBreadSlice /> },
]);


  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Buscopan Forte Tab 20mg X 10', original_price: '40.000 vnd', image: Product1.src, category: 'Vitamins', rating: 4.5, discount: 60 },
    { id: 2, name: 'Panadol Extra', original_price: '35.000 vnd', image: Product2.src, category: 'Pain Relief', rating: 4.7, discount: 50 },
    { id: 3, name: 'Cough Syrup', original_price: '30.000 vnd', image: Product3.src, category: 'Cold & Flu', rating: 4.3, discount: 40 },
    { id: 4, name: 'Vitamin C 500mg', original_price: '50.000 vnd', image: Product4.src, category: 'Vitamins', rating: 4.8, discount: 20 },
    { id: 5, name: 'Zinc Supplement', original_price: '45.000 vnd', image: Product5.src, category: 'Supplements', rating: 4.6, discount: 30 },
    { id: 6, name: 'Buscopan Forte Tab 20mg X 10', original_price: '40.000 vnd', image: Product1.src, category: 'Vitamins', rating: 4.5, discount: 60 },
    { id: 7, name: 'Panadol Extra', original_price: '35.000 vnd', image: Product2.src, category: 'Pain Relief', rating: 4.7, discount: 50 },
    { id: 8, name: 'Cough Syrup', original_price: '30.000 vnd', image: Product3.src, category: 'Cold & Flu', rating: 4.3, discount: 40 },
    { id: 9, name: 'Vitamin C 500mg', original_price: '50.000 vnd', image: Product4.src, category: 'Vitamins', rating: 4.8, discount: 20 },
    { id: 10, name: 'Zinc Supplement', original_price: '45.000 vnd', image: Product5.src, category: 'Supplements', rating: 4.6, discount: 30 },

  ]);

  const images = [Image1.src, Image1.src, Image2.src, Image2.src]; // Danh sách ảnh
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 2) % images.length);
    }, 3000); // Chuyển đổi ảnh mỗi 3 giây

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="lg:px-20 px-10 h-full w-full overflow-hidden">

      <section className="relative px-4 flex flex-col md:flex-row items-center justify-between h-[600px]">
        {/* Background Icons */}
        <Image
          src={bgIcon.src}
          width={300}
          height={300}
          alt="background login image"
          className="bg-image hidden absolute -left-40 lg:block"
        />
        <Image
          src={bgIcon.src}
          width={300}
          height={300}
          alt="background login image"
          className="bg-image hidden absolute -right-40 bottom-4 lg:block"
        />

        {/* Nội dung bên trái */}
        <div className="max-w-xl">
          <h1 className="text-6xl font-bold leading-tight text-gray-900">
            Thu Thập <span className="text-primary">Giảm Giá Tốt</span> Gần Địa
            Điểm Của Bạn
          </h1>
          <p className="mt-4 text-gray-600">
            Khám phá và thu thập những ưu đãi tuyệt vời ngay gần bạn để tiết
            kiệm hơn mỗi ngày!
          </p>
          <div className="mt-6 flex space-x-4">
            <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light">
              Đến sản phẩm
            </button>
            <button className="px-6 py-3 bg-teal-50 font-semibold rounded-lg hover:bg-teal-100">
              Khám phá các cửa hàng gần bạn
            </button>
          </div>
          <div className="flex p-3 my-4 space-x-6">
            <div className="flex justify-center items-center gap-2">
              <Image
                src={IconSafe.src}
                width={30}
                height={30}
                alt="icon safe"
              />
              <p>An Toàn</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Image
                src={IconSaveMoney.src}
                width={30}
                height={30}
                alt="icon save money"
              />
              <p>An Toàn</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Image
                src={IconIdea.src}
                width={30}
                height={30}
                alt="icon idea"
              />
              <p>An Toàn</p>
            </div>
          </div>
        </div>

        {/* Ảnh Slider */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex h-full items-center justify-center w-full space-x-4"
          >
            <Image
              src={images[index]}
              alt="Slider image 1"
              width={500}
              height={1000}
              className="w-72 h-[80%] object-cover rounded-lg shadow-md"
            />
            <Image
              src={images[(index + 1) % images.length]}
              alt="Slider image 2"
              width={500}
              height={1000}
              className="w-72 h-[80%] object-cover rounded-lg shadow-md"
            />
          </motion.div>

          {/* Box số liệu */}
          <div className="absolute top-20 left-0 space-x-3 bg-white flex items-center shadow-lg p-4 rounded-lg border border-primary">
            <Image
              src={IconComputer.src}
              alt="icon computer for top banner"
              width={50}
              height={50}
            />
            <div>
              <p className="text-lg font-bold">2K+</p>
              <span className="text-gray-500 text-sm">Khách hàng hài lòng</span>
            </div>
          </div>
          <div className="absolute top-20 right-10 flex flex-col items-center space-y-2 border border-primary bg-white shadow-lg p-4 rounded-lg">
            <Image
              src={IconProgess.src}
              alt="icon computer for top banner"
              width={50}
              height={50}
            />
            <p className="text-lg font-bold">5K+</p>
            <span className="text-gray-500 text-sm">Sản phẩm</span>
          </div>
          <div className="absolute bottom-20 right-32 space-x-3 bg-white flex items-center shadow-lg p-4 rounded-lg border border-primary">
            <Image
              src={IconStore.src}
              alt="icon computer for top banner"
              width={50}
              height={50}
            />
            <div>
              <span className="text-gray-500 text-sm">Cửa hàng</span>
              <p className="text-lg font-bold">250+</p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative flex-col md:flex-row items-center justify-between h-auto px-4 hidden lg:block">
        <PromoBanner />
      </section>
      <section className="relative flex flex-col md:flex-row items-center justify-between h-auto">
        <ProductCategories categories={categories} setProducts={setProducts} />
      </section>
      <section className="relative flex flex-col md:flex-row items-center justify-between h-auto">
        <Products products={products} setProducts={setProducts} />
      </section>

      <section className="relative flex flex-col md:flex-row items-center justify-between h-auto">
        <ValuesSection />
      </section>
      <section className="relative flex flex-col md:flex-row items-center justify-between h-auto bg-red-300">
        <GoongMap />
      </section>
      <section >
        <FoundersSection />
      </section>
      <section className="relative flex flex-col md:flex-row items-center gap-5 h-auto justify-center">
        <BenefitsSection />
      </section>
    </div>
  );
}
