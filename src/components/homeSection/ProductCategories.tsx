import { getProducts, getProductsByCategoryId } from "@/api";
import { Category, Product } from "@/types";
import React, { useState } from "react";

interface ProductCategoriesProps {
  categories: Category[];
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({
  categories,
  setProducts,
  setLoading,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryClick = async (category: Category) => {
    setLoading(true); // Bắt đầu tải dữ liệu
    setSelectedCategory(category.id);
    console.log(category.id)
    try {
      const filterProductsByCategory = await getProductsByCategoryId(category.id);
      console.log(filterProductsByCategory)
      setProducts([...filterProductsByCategory]);

    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
    setLoading(false); // Dữ liệu đã tải xong
  };

  const handleGetAllCategories = async () => {
    const page = 1;
    setLoading(true); // Bắt đầu tải dữ liệu
    setSelectedCategory(null);
    try {
      const products = await getProducts({page});
      setProducts(products);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
    setLoading(false); // Dữ liệu đã tải xong
  };

  return (
    <div className="w-full px-4 py-3">
      <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <h2 className="text-2xl font-bold">Danh Mục Sản Phẩm</h2>
        <span className="text-gray-500 mt-2 sm:mt-0 cursor-pointer">
          Danh mục hàng đầu của tuần
        </span>
      </div>

      <div className="mt-1 overflow-x-auto max-h-80">
        <div className="flex gap-4 overflow-x-auto scrollbar-container py-4">
          {/* Nút "All" để lấy tất cả sản phẩm */}
          <div
            className={`flex-shrink-0 flex w-[200px] flex-col items-center p-4 rounded-lg cursor-pointer transition
            ${selectedCategory === null ? "bg-green-200 shadow-lg" : "bg-gray-100 hover:shadow-lg"}`}
            onClick={handleGetAllCategories}
          >
            <p className="text-gray-700 font-medium text-center">Tất cả</p>
          </div>

          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex-shrink-0 flex w-[200px] flex-col items-center p-4 rounded-lg cursor-pointer transition
              ${selectedCategory === category.id ? "bg-green-200 shadow-lg" : "bg-gray-100 hover:shadow-lg"}`}
              onClick={() => handleCategoryClick(category)}
            >
              <p className="text-gray-700 font-medium text-center">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
