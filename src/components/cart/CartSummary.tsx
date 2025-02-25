import React, { memo } from 'react';
import { CartSummaryProps } from "@/types";
import { formatMoney } from "@/utils";

export const CartSummary: React.FC<CartSummaryProps> = memo(({ total, savings, handlePayment }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-6">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="font-medium text-lg">Thành tiền:</span>
            <span className="font-medium text-2xl text-red-500">
              {formatMoney(total, "đ")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-[17px]">Bạn tiết kiệm được:</span>
            <span className="font-semibold text-xl">
              {formatMoney(savings, "đ")}
            </span>
          </div>
        </div>
        <div>
          <button onClick={handlePayment} className="w-full mx-auto bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition-colors">
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
});

CartSummary.displayName = 'CartSummary';