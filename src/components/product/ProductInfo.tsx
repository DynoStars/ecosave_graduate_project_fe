"use client";

import type { PaymentItem, Product } from "@/types";
import { formatMoney } from "@/utils";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { useState } from "react";
import ToastNotification from "../toast/ToastNotification";
import { createPortal } from "react-dom";
import { addToCart } from "@/api";
import { useDispatch } from "react-redux";
import { addPaymentItem } from "@/redux/paymentSlice";
import { useRouter } from "next/navigation";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const router = useRouter();
  const [toast, setToast] = useState<{
    message: string;
    keyword: "SUCCESS" | "ERROR" | "WARNING" | "INFO";
  } | null>(null);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  const calculateDaysUntilExpiration = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return Math.ceil(
      (expiration.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
  };

  const daysUntilExpiration = calculateDaysUntilExpiration(
    product.expiration_date
  );

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
      setToast({
        message: "Sản phẩm đã được thêm vào giỏ hàng!",
        keyword: "SUCCESS",
      });
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

  const handlyPayOneProduct = () => {
    console.log('adddedddddd')
    const paymentItem: PaymentItem = {
      id: product.id,
      name: product.name,
      price: product.discounted_price,
      quantity,
      picture: product.images[0].image_url,
    };

    dispatch(addPaymentItem(paymentItem));
    setToast({ message: "Sản phẩm đã được thêm vào thanh toán!", keyword: "SUCCESS" });
    setTimeout(() => setToast(null), 3000);
    router.push('/login')

  };

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="relative">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-medium">{product.name}</h1>
          <span className="bg-red-50 text-error text-sm px-2 py-0.5 rounded">
            -{product.discount_percent}%
          </span>
        </div>
        <div className="absolute">
          {toast &&
            createPortal(
              <ToastNotification
                message={toast.message}
                keyword={toast.keyword}
              />,
              document.body
            )}
        </div>
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <div className="text-lg font-medium">{product.rating}</div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(Number(product.rating))
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
        <span className="text-gray-500">23 Đánh giá</span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-primary text-2xl sm:text-3xl font-bold">
          {formatMoney(Number(product.discounted_price), "VND")}
        </span>
        <span className="text-gray-500 line-through text-xl sm:text-2xl">
          {formatMoney(Number(product.original_price), "VND")}
        </span>
        <span className="text-primary">({product.discount_percent}% off)</span>
      </div>

      <div className="text-gray-600 flex items-center gap-4 flex-wrap">
        <span>Hạn sử dụng:</span>
        <span className="font-medium">
          {formatDate(product.expiration_date)}
        </span>
        <span className="bg-blue-100 text-blue-600 font-medium px-3 py-1 rounded-full">
          Hết hạn sau: {daysUntilExpiration} ngày
        </span>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-gray-600">Số lượng</span>
        <div className="flex items-center border rounded">
          <button
            className="px-3 py-1 border-r hover:bg-gray-50"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <span className="px-4 py-1">{quantity}</span>
          <button
            className="px-3 py-1 border-l hover:bg-gray-50"
            onClick={() =>
              setQuantity(Math.min(product.stock_quantity, quantity + 1))
            }
          >
            +
          </button>
        </div>
        {product.stock_quantity > 0 ? (
          <span className="text-gray-500 text-sm">
            {product.stock_quantity} sản phẩm có sẵn
          </span>
        ) : (
          <span className="text-red-500 text-sm">
            Hiện tại sản phẩm đang hết hàng.
          </span>
        )}
      </div>

      <div className="flex gap-4 mt-6 flex-wrap">
        <button
          onClick={() => setIsWishlist(!isWishlist)}
          className="h-12 w-12 border rounded flex items-center justify-center hover:bg-gray-50"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlist ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center h-12 border rounded hover:bg-gray-50 w-32"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button
          onClick={handlyPayOneProduct}
          className="h-12 w-full sm:w-96 bg-primary active:bg-red-400 hover:bg-primary/90 text-white font-semibold rounded"
        >
          Mua ngay
        </button>
      </div>
    </div>
  );
}
