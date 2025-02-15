"use client";
import Image from "next/image";

import Products from "@/components/homeSection/Products";

import { useState } from "react";
import FilterSidebar from "@/components/filer/FilterSidebar";
import { Category, Product } from "@/types";


type ProductListingProps = {
  listProducts: Product[];
  loadingProps : boolean;
  listCategories: Category[];
};

export default function ProductListing({ listProducts, loadingProps, listCategories }: ProductListingProps) {
  const [products, setProducts] = useState<Product[]>(listProducts);
  const [categories] = useState<Category[]>(listCategories);

  const [loading, setLoading] = useState<boolean>(loadingProps);


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
        <FilterSidebar setProducts={setProducts} allProducts={products} categories={categories} setLoading={setLoading} />
        {/* Danh sách sản phẩm */}
        <main className="flex-1 flex-wrap w-full">
          <Products products={products} setProducts={setProducts} loading={loading} setLoading={setLoading} />
        </main>
      </div>
    </div>
  );
}
