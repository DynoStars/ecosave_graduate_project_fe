import React, { Suspense } from "react";
import Home from "./Home";
import { getCategories, getProducts } from "@/api";
import { Category, Product } from "@/types";
import Loading from "../loading";

// Server component để hiển thị danh sách sản phẩm
const ListProducts = async () => {
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
      <Home
        listCategories={categories}
        listProducts={products}
        loadingProps={loading}
      />
    </Suspense>
  );
};

export default ListProducts;
