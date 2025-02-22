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
import { useUserLocation } from "@/hooks/useUserLocation";
import { formatMoney } from "@/utils";
import { useParams } from "next/navigation";
import { getProducts } from "@/api";
import { FaSearch } from "react-icons/fa";
import ToastNotification from "../toast/ToastNotification";
import { createPortal } from "react-dom";
import { addToCart } from "@/api";
interface ProductsProps {
  products: Product[];
  setProducts?: (products: Product[]) => void;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
}

export default function Products({ products, loading }: ProductsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [listProducts, setListProducts] = useState<Product[]>(products);
  const itemsPerPage = 8; // Number of items per page
  const userLocation = useUserLocation();
  const [searchActive, setSearchActive] = useState<boolean>(false); // State to manage search
  const [searchQuery, setSearchQuery] = useState("");
  // State for favorite products
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(loading);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [toast, setToast] = useState<{ message: string; keyword: "SUCCESS" | "ERROR" | "WARNING" | "INFO" } | null>(null);
  const params = useParams();
  const storeId = params.storeId ? parseInt(params.storeId) : undefined;

  // Calculate total pages based on the number of items
  const totalPages = Math.ceil(listProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = listProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchProduct = async (query: string) => {
    setLoadingProducts(true);
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page when searching

    // If a previous timeout exists, clear it
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout for debounce
    const newTimeout = setTimeout(async () => {
      try {
        const searchProducts = await getProducts({
          name: query.trim(),
          store_id: storeId,
        });
        setListProducts(searchProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingProducts(false);
      }
    }, 500); // Delay of 500ms after the last input

    // Store the timeout id to clear it on subsequent keystrokes
    setDebounceTimeout(newTimeout);
  };

  // Toggle trạng thái yêu thích
  const toggleFavorite = (productId: number) => {
    setFavoriteProducts(
      (prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId) // Xóa nếu đã yêu thích
          : [...prev, productId] // Thêm nếu chưa yêu thích
    );
  };

  const handleAddToCart = async (product: Product) => {
    try {
        await addToCart(product.id, quantity);
        setToast({ message: "Sản phẩm đã được thêm vào giỏ hàng!", keyword: "SUCCESS" });
        setTimeout(() => setToast(null), 3000);
    } catch (error: unknown) {
        let errorMessage = "Đã xảy ra lỗi khi thêm vào giỏ hàng.";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        setToast({ message: errorMessage, keyword: "ERROR" });
        setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <section className="container mx-auto px-4">
      <div className="absolute">
        {toast && createPortal(<ToastNotification message={toast.message} keyword={toast.keyword} />, document.body)}
      </div>
      <div className="flex justify-between items-center py-4">
        <h4 className="text-2xl font-bold">Sản Phẩm Bán Chạy</h4>
        <div className="relative">
          <button
            onClick={() => setSearchActive(!searchActive)}
            className="bg-orange-500 px-4 py-[10px] rounded"
          >
            <FaSearch className="text-white cursor-pointer hover:text-primary-light transition-colors duration-300 text-xl" />
          </button>
          <input
            value={searchQuery} // Bind the value of the input to state
            onChange={(e) => handleSearchProduct(e.target.value)} // Pass input value to the handler
            type="text"
            placeholder="Tìm kiếm..."
            className={`search-input text-secondary-dark ${
              searchActive ? "open" : ""
            }`}
          />
        </div>
      </div>
      <div>
        {loading || loadingProducts ? (
          <div className="animate-pulse grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                  <Link href={`/products/${product.id}`} className="block">
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
                      <p className="flex-1 text-sm max-w-[100px] text-gray-500 truncate-description-1-line">
                        {product.category.name}
                      </p>
                      <div className="flex-1 text-gray-500 flex justify-between items-center">
                        <p className="text-sm truncate-description-1-line">
                          {userLocation
                            ? `${calculateDistance(
                                [
                                  product.store.latitude,
                                  product.store.longitude,
                                ],
                                userLocation
                              )} km`
                            : "Không có thông tin vị trí"}
                        </p>
                        <p className="w-[1px] h-[70%] bg-gray-400"></p>
                        <p className="text-sm max-w-[60px] truncate-description-1-line">
                          {product.store.store_name}
                        </p>
                      </div>
                    </div>
                    <Link href={`/product/${product.id}`} className="block">
                      <h3 className="text-xl font-semibold truncate-description-1-line hover:text-primary">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex justify-between items-center">
                      <p className="text-primary-light font-bold">
                        {formatMoney (Number(product.original_price), 'VND')}
                      </p>
                      <div className="flex justify-center items-center gap-1 ">
                        {product.rating} <AiFillStar className="text-yellow-400" size={16} />
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

                    <button onClick={() => handleAddToCart(product)} className="p-2 w-[75%] flex justify-center bg-primary rounded-full text-white hover:bg-primary-light">
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
