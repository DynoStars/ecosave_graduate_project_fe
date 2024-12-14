// Danh sách sản phẩm
import React from "react";
import { Metadata } from "next";
import { API_URL } from "@/utils";
import { Product } from "@/types";
import Home from "./Home";
// Hàm fetch danh sách sản phẩm
export async function fetchFoods(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/foods?page=1`, { cache: "no-store" });
    if (!response.ok) {
      const errorMessage = await response.text(); // Đọc thông báo lỗi từ response
      console.error("Failed to fetch data:", response.status, response.statusText, errorMessage);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data as Product[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
}
// Server component để hiển thị danh sách sản phẩm
export const ListProducts: React.FC = async () => {
  let foods: Product[] | null = null;
  try {
    foods = await fetchFoods();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <div>Error fetching data. Please try again later.</div>;
  }
  if (!foods || foods.length === 0) {
    return <div>No foods available to display.</div>;
  }
  return (
    <>
      <Home listFoods={foods} />
    </>
  );
};
export default ListProducts;
