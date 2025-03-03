"use client";
import React from 'react';
import Image from "next/image";
import { formatCurrency } from "@/utils";
import { CartItemProps } from '@/types';

export const CartItem: React.FC<CartItemProps> = ({ product, onRemove, onQuantityChange }) => {
  return (
    <div className={`flex items-center py-3 border-b lg:px-8 px-3 border-gray-200 text-xs md:text-sm lg:text-base ${product.isRemoving ? 'opacity-50' : ''}`}>
      {/* Hình ảnh sản phẩm */}
      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex-shrink-0">
        <Image
          src={product.images[0]?.image_url || "/api/placeholder/96/96"}
          alt={product.name}
          width={96}
          height={96}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex-1 flex flex-wrap items-center justify-between ml-3">
        <div className="w-1/3 pr-2">
          <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
          <p className="text-gray-500">{product.stock_quantity} SP có sẵn</p>
        </div>

        {/* Chỉnh số lượng */}
        <div className="flex items-center border rounded">
          <button
            onClick={() => onQuantityChange(product.product_id, Math.max(1, product.quantity - 1))}
            className="px-2 py-1 text-teal-600 hover:bg-gray-50 border-r disabled:opacity-50"
            disabled={product.isRemoving}
          >
            -
          </button>
          <span className="px-3 py-1">{product.quantity}</span>
          <button
            onClick={() => onQuantityChange(product.product_id, Math.min(product.stock_quantity, product.quantity + 1))}
            className="px-2 py-1 text-teal-600 hover:bg-gray-50 border-l disabled:opacity-50"
            disabled={product.isRemoving}
          >
            +
          </button>
        </div>

        {/* Giá sản phẩm */}
        <div className="flex flex-col items-end">
          <span className="text-teal-600 font-medium">
            {formatCurrency(product.discounted_price)}
          </span>
          <span className="text-gray-400 line-through hidden md:inline">
            {formatCurrency(product.original_price)}
          </span>
        </div>

        {/* Nút xóa */}
        <button
          onClick={() => onRemove(product.product_id)}
          className="text-gray-600 hover:text-red-500 lg:pl-4"
          disabled={product.isRemoving}
        >
          {product.isRemoving ? 'Đang xóa...' : 'Xóa'}
        </button>
      </div>
    </div>
  );
};
