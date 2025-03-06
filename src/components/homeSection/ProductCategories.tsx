import { getProducts, getProductsByCategoryId } from "@/api";
import { Category, Product } from "@/types";
import React, { useState, useCallback, useEffect } from "react";
import ClassNames from "classnames";

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

  const fetchProducts = useCallback(
    async (categoryId: number | null) => {
      setLoading(true);
      setSelectedCategory(categoryId);
      try {
        const products = categoryId
          ? await getProductsByCategoryId(categoryId)
          : await getProducts({ page: 1 });
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    },
    [setProducts, setLoading]
  );

  // Gọi API ban đầu khi component mount
  useEffect(() => {
    fetchProducts(null);
  }, [fetchProducts]);

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
          {[{ id: null, name: "Tất cả" }, ...categories].map(({ id, name }) => (
            <div
              key={id ?? "all"}
              className={ClassNames(
                "flex-shrink-0 flex w-[200px] flex-col items-center p-4 rounded-lg cursor-pointer transition",
                {
                  "bg-green-200 shadow-lg": selectedCategory === id,
                  "bg-gray-100 hover:shadow-lg": selectedCategory !== id,
                }
              )}
              onClick={() => fetchProducts(id)}
            >
              <p className="text-gray-700 font-medium text-center">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
