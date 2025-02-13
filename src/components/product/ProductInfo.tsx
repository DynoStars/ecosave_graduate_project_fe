"use client"; 
import { Heart, Star, ShoppingCart } from "lucide-react"; 
import { useState, useEffect } from "react";

interface ProductInfoProps {
  product: {
    name: string;
    original_price: string;
    discounted_price: string;
    discount_percent: number;
    rating: string;
    stock_quantity: number;
    expiration_date: string;
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };
  
  // Tính số ngày còn lại
  const calculateDaysUntilExpiration = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const timeDiff = expiration.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const daysUntilExpiration = calculateDaysUntilExpiration(product.expiration_date);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-medium">{product.name}</h1>
        <span className="bg-red-50 text-error text-sm px-2 py-0.5 rounded">-{product.discount_percent}%</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-lg font-medium">{product.rating}</div>
        <div className="flex gap-0.5">
          {Array(5)
            .fill(null)
            .map((_, i) => (
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

      <div className="flex items-center gap-2">
        <span className="text-primary text-[32px] font-bold">
          {Number(product.discounted_price).toLocaleString()}đ
        </span>
        <span className="text-gray-500 line-through text-[32px]">
          {Number(product.original_price).toLocaleString()}đ
        </span>
        <span className="text-primary">({product.discount_percent}% off)</span>
      </div>

      <div className="text-gray-600 flex items-center gap-4">
        <span>Hạn sử dụng: </span>
        <span className="font-medium">{formatDate(product.expiration_date)}</span>
        <span className="ml-4 bg-blue-100 text-blue-600 font-medium px-3 py-1 rounded-full"> {/* Thêm kiểu cho thông tin hết hạn */}
          Hết hạn sau: {daysUntilExpiration} ngày
        </span>
      </div>

      <div className="flex items-center gap-4">
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
            onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
          >
            +
          </button>
        </div>
        <span className="text-gray-500 text-sm">
          {product.stock_quantity} sản phẩm có sẵn
        </span>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setIsWishlist(!isWishlist)}
          className="h-[50px] w-[50px] border rounded flex items-center justify-center hover:bg-gray-50"
        >
          <Heart className={`w-5 h-5 ${isWishlist ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
        <button className="flex items-center justify-center h-[50px] border rounded hover:bg-gray-50 w-[120px]">
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button className="h-[50px] w-[450px] bg-primary hover:bg-primary/90 text-white font-semibold rounded">
          Mua ngay
        </button>
      </div>
    </div>
  );
}