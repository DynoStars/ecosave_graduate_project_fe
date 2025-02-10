import { Category, Product } from "@/app/home/Home";
import React, { useState } from "react";

interface ProductCategoriesProps {
  categories: Category[];
  setProducts: (products: Product[]) => void;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({ categories, setProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category.name);
    setProducts([]); // Cập nhật sản phẩm theo danh mục được chọn
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
          {categories.map((category, index) => (
            <div
              key={index}
              className={`flex-shrink-0 flex w-[200px] flex-col items-center p-4 rounded-lg cursor-pointer transition
              ${selectedCategory === category.name ? "bg-green-200 shadow-lg" : "bg-gray-100 hover:shadow-lg"}`}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="text-4xl mb-2 text-gray-700 hidden lg:block">{category.icon}</div>
              <p className="text-gray-700 font-medium text-center">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
