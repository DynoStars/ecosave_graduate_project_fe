"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import fallbackImage from "../../assets/images/products/product1.png";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Product } from "@/types";
import calculateDistance from "@/utils/calculateDistance";
import useUserLocation from "@/hooks/useUserLocation";

interface ProductsProps {
  products: Product[];
  setProducts?: (products: Product[]) => void;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
}

export default function Products({ products, loading }: ProductsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số sản phẩm mỗi trang
  const userLocation = useUserLocation();

  // Trạng thái lưu danh sách sản phẩm đã yêu thích
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);

  // Toggle trạng thái yêu thích
  const toggleFavorite = (productId: number) => {
    setFavoriteProducts(
      (prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId) // Xóa nếu đã yêu thích
          : [...prev, productId] // Thêm nếu chưa yêu thích
    );
  };

  // Tính toán số trang
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <h4 className="text-2xl font-bold mb-6">Sản Phẩm Bán Chạy </h4>
      </div>
      <div className={`transition-opacity duration-500`}>
        {loading ? (
          <div className="animate-pulse grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <div className="bg-gray-300 w-full h-40 rounded-md"></div>{" "}
                {/* Ảnh sản phẩm */}
                <div className="mt-3 space-y-2">
                  <div className="bg-gray-300 h-4 w-3/4 rounded"></div>{" "}
                  {/* Tiêu đề */}
                  <div className="bg-gray-300 h-4 w-1/2 rounded"></div>{" "}
                  {/* Thông tin phụ */}
                </div>
                <div className="flex justify-between gap-7">
                  <div className="mt-4 bg-gray-300 h-10 w-full rounded"></div>{" "}
                  {/* Nút hoặc giá */}
                  <div className="mt-4 bg-gray-300 h-10 w-full rounded"></div>{" "}
                  {/* Nút hoặc giá */}
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">
            Không có sản phẩm nào
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg shadow-soft bg-white pb-3 z-10 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-strong"
                >
                  {product.discount_percent > 0 && (
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded absolute">
                      Giảm {product.discount_percent}%
                    </span>
                  )}
                  <Link href={`/product/${product.id}`} className="block">
                    <Image
                      src={product.images[0]?.image_url || fallbackImage.src}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="mx-auto w-full object-cover"
                    />
                  </Link>
                  <div className="mt-3 px-4">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500 truncate-description-1-line">
                        {product.category.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate-description-1-line">
                        {userLocation
                          ? `${calculateDistance(
                              [product.store.latitude, product.store.longitude],
                              userLocation
                            )} km`
                          : "Không có thông tin vị trí"}
                      </p>
                    </div>
                    <Link href={`/product/${product.id}`} className="block">
                      <h3 className="text-md font-semibold truncate-description-1-line hover:text-primary">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex justify-between items-center">
                      <p className="text-primary-light font-bold">
                        {product.original_price}
                      </p>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: product.rating }, (_, i) => (
                          <AiFillStar key={i} size={16} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 px-4">
                    <button
                      className={`p-2 border rounded-full transition-all duration-300 ${
                        favoriteProducts.includes(product.id)
                          ? "bg-orange-500 text-white"
                          : "bg-white text-red-500 hover:bg-red-500 hover:text-white"
                      }`}
                      onClick={() => toggleFavorite(product.id)}
                    >
                      {favoriteProducts.includes(product.id) ? (
                        <AiFillHeart size={20} />
                      ) : (
                        <AiOutlineHeart size={20} />
                      )}
                    </button>

                    <button className="p-2 w-[75%] flex justify-center bg-primary rounded-full text-white hover:bg-primary-light">
                      <AiOutlineShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="px-3 py-2 border rounded-l-md bg-gray-200 disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border ${
                    currentPage === index + 1
                      ? "bg-purple-200 font-bold"
                      : "bg-white"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="px-4 py-2 border rounded-r-md bg-gray-200 disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
