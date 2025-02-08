import React from "react";
import { FaCarrot, FaCoffee, FaDrumstickBite, FaBreadSlice, FaSnowflake } from "react-icons/fa";

const categories = [
  { name: "Rau & Trái cây", icon: <FaCarrot /> },
  { name: "Đồ uống", icon: <FaCoffee /> },
  { name: "Thịt & Hải sản", icon: <FaDrumstickBite /> },
  { name: "Thịt & Hải sản", icon: <FaDrumstickBite /> },
  { name: "Thịt & Hải sản", icon: <FaDrumstickBite /> },
  { name: "Thịt & Hải sản", icon: <FaDrumstickBite /> },
  { name: "Thịt & Hải sản", icon: <FaDrumstickBite /> },
  { name: "Thịt & Hải sản", icon: <FaDrumstickBite /> },
  { name: "Thịt & Hải sản", icon: <FaDrumstickBite /> },
  { name: "Bữa sáng", icon: <FaBreadSlice /> },
  { name: "Đồ đông lạnh", icon: <FaSnowflake /> },
];

const ProductCategories: React.FC = () => {
  return (
    <div className="w-full px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <h2 className="text-2xl font-bold">Danh Mục Sản Phẩm</h2>
        <span className="text-gray-500 mt-2 sm:mt-0">Danh mục hàng đầu của tuần</span>
      </div>

      <div className="mt-6 overflow-x-auto max-h-80">
        <div className="flex gap-4 overflow-x-auto scrollbar-container py-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex w-[200px] flex-col items-center p-4 bg-gray-100 rounded-lg hover:shadow-lg cursor-pointer transition"
            >
              <div className="text-4xl mb-2 text-gray-700">{category.icon}</div>
              <p className="text-gray-700 font-medium text-center">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
