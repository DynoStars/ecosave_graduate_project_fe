"use client";
import React from 'react';
import Image from "next/image";
import { formatMoney } from "@/utils";
import { CartItemProps } from '@/types';

export const CartItem: React.FC<CartItemProps> = ({ product, onRemove, onQuantityChange }) => {
  return (
    <div className={`flex items-center py-4 border-b border-gray-100 ${product.isRemoving ? 'opacity-50' : ''}`}>
      <div className="w-24 h-24 mr-4">
        <Image
          src={product.images[0]?.image_url || "/api/placeholder/96/96"}
          alt={product.name}
          width={96}
          height={96}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div className="w-1/3">
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">
            {product.stock_quantity} sản phẩm có sẵn
          </p>
        </div>

        <div className="flex items-center border rounded">
          <button
            onClick={() => onQuantityChange(product.product_id, Math.max(1, product.quantity - 1))}
            className="px-3 py-1 text-teal-600 hover:bg-gray-50 border-r"
            disabled={product.isRemoving}
          >
            -
          </button>
          <span className="px-4 py-1">{product.quantity}</span>
          <button
            onClick={() => onQuantityChange(product.product_id, Math.min(product.stock_quantity, product.quantity + 1))}
            className="px-3 py-1 text-teal-600 hover:bg-gray-50 border-l"
            disabled={product.isRemoving}
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-teal-600 text-2xl font-medium">
            {formatMoney(Number(product.discounted_price), "đ")}
          </span>
          <span className="text-gray-400 line-through text-xl">
            {formatMoney(Number(product.original_price), "đ")}
          </span>
        </div>

        <button
          onClick={() => onRemove(product.product_id)}
          className="text-gray-600 hover:text-red-500 ml-4 mr-5"
          disabled={product.isRemoving}
        >
          {product.isRemoving ? 'Đang xóa...' : 'Xóa'}
        </button>
      </div>
    </div>
  );
};

