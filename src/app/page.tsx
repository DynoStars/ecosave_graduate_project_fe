import { generateMetadata } from "@/utils";
import React, { Suspense } from "react";
import { getCategories, getProducts } from "@/api";
import { Category, Product } from "@/types";
export const metadata = generateMetadata(
  "",
  "Welcome to LayRestaurant, the best platform for booking food and rooms"
);
import Home from "./home/Home";
import Loading from "./loading";
export default async function HomePage() {
  const page = 1; // Có thể lấy từ URL hoặc props nếu cần
  let products: Product[] | null = null;
  let categories: Category[] | null = null;
  let loading = true;

  try {
    products = await getProducts({page});
    categories = await getCategories();
    loading = false;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return (
      <div className="text-center text-orange-500">
        Lỗi khi lấy dữ liệu. Vui lòng thử lại sau
      </div>
    );
  }


  if (!products || products.length === 0) {
    return (
      <div className="text-center text-primary">
        Không có sản phẩm nào để hiển thị.
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-screen">
        <Home
          listCategories={categories}
          listProducts={products}
          loadingProps={loading}
        />
      </div>
    </Suspense>
  );
}
