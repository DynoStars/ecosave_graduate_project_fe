import React, { Suspense } from "react";
import Home from "./Home";
import { getCategories, getProducts } from "@/api";
import { Category, Product } from "@/types";
import Loading from "../loading";

const HomePage = async () => {
  try {
    const page = 1;
    const [products, categories]: [Product[], Category[]] = await Promise.all([
      getProducts({ page }),
      getCategories(),
    ]);

    return (
      <Suspense fallback={<Loading />}>
        <Home listCategories={categories} listProducts={products} loadingProps={false} />
      </Suspense>
    );
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <div className="text-center text-orange-500">Lỗi khi lấy dữ liệu. Vui lòng thử lại sau.</div>;
  }
};

export default HomePage;
