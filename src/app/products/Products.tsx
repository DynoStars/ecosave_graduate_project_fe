"use client";
import Image from "next/image";
import Product1 from "../../assets/images/products/product1.png";
import Product2 from "../../assets/images/products/product2.png";
import Product3 from "../../assets/images/products/product3.png";
import Product4 from "../../assets/images/products/product4.png";
import Product5 from "../../assets/images/products/product5.png";
import Products from "@/components/homeSection/Products";
import { Product } from "../home/Home";
import { useState } from "react";
import FilterSidebar from "@/components/filer/FilterSidebar";
export default function ProductListing() {

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
  return (
    <div className="container mx-auto py-8 px-14 mw-[80%]">
      {/* Banner */}
      <Image
        src="https://www.lottemart.vn/media/new_landing/cache/GIFT-COSMETIC_NO-CTA_1.jpg.webp"
        alt="Banner"
        width={1200}
        height={300}
        className="w-full rounded-lg object-cover mb-8"
      />

      {/* Bố cục chính */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Sidebar bộ lọc */}
        <FilterSidebar setProducts={setProducts} allProducts={products} />
        {/* Danh sách sản phẩm */}
        <main className="flex-1 flex-wrap w-full">
          <Products products={products} setProducts={setProducts} />
        </main>
      </div>
    </div>
  );
}
