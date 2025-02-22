import { CartItemProps } from '@/types';
import React, { useState } from 'react';
import Image from "next/image";
import { formatMoney } from "@/utils";

export const CartItem: React.FC<CartItemProps> = ({ product, onRemove }) => {
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="flex items-center py-4 border-b border-gray-100">
      {/* Product Image */}
      <div className="w-24 h-24 mr-4">
        <Image
          src={product.images[0]?.image_url || "/api/placeholder/96/96"}
          alt={product.name}
          width={96}
          height={96}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Product Info, Quantity and Price in one row */}
      <div className="flex-1 flex items-center justify-between">
        {/* Product Name */}
        <div className="w-1/3">
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">
            {product.stock_quantity} sản phẩm có sẵn
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center border rounded">
          <button
            onClick={() => setQuantity(Math.max(1, product.quantity - 1))}
            className="px-3 py-1 text-teal-600 hover:bg-gray-50 border-r"
          >
            -
          </button>
          <span className="px-4 py-1">{product.quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
            className="px-3 py-1 text-teal-600 hover:bg-gray-50 border-l"
          >
            +
          </button>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-teal-600 text-2xl font-medium">
            {formatMoney(Number(product.discounted_price), "đ")}
          </span>
          <span className="text-gray-400 line-through text-xl">
            {formatMoney(Number(product.original_price), "đ")}
          </span>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => onRemove(product.id)}
          className="text-gray-600 hover:text-red-500 ml-4 mr-5"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

