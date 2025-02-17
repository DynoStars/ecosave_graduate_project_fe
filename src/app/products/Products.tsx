"use client";
import Image from "next/image";
import Products from "@/components/homeSection/Products";
import { useEffect, useState } from "react";
import FilterSidebar from "@/components/filer/FilterSidebar";
import { Category, Product } from "@/types";
import banner01 from "../../assets/images/banner/banner01.jpg";
import banner02 from "../../assets/images/banner/banner02.png";
import banner03 from "../../assets/images/banner/banner03.jpeg";
type ProductListingProps = {
  listProducts: Product[];
  loadingProps: boolean;
  listCategories: Category[];
};
export default function ProductListing({
  listProducts,
  loadingProps,
  listCategories,
}: ProductListingProps) {
  const [products, setProducts] = useState<Product[]>(listProducts);
  const [categories] = useState<Category[]>(listCategories);
  const [loading, setLoading] = useState<boolean>(loadingProps);
  const banners = [banner01, banner02, banner03];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);
  
  return (
    <div className="container mx-auto py-8 mw-[100%]">
      <div className="w-full h-[350px] relative">
        {banners.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Banner Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className={`rounded absolute transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
          />
        ))}
      </div>
      {/* Bố cục chính */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Sidebar bộ lọc */}
        <FilterSidebar
          setProducts={setProducts}
          allProducts={products}
          categories={categories}
          setLoading={setLoading}
        />
        {/* Danh sách sản phẩm */}
        <main className="flex-1 flex-wrap w-full">
          <Products
            products={products}
            setProducts={setProducts}
            loading={loading}
            setLoading={setLoading}
          />
        </main>
      </div>
    </div>
  );
}
