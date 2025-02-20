"use client";

import CheckoutComponent from "@/components/checkout/CheckoutComponent";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

export default function Checkout() {
  const items = useSelector((state: RootState) => state.payment.items);
  return (
    <div className="min-h-screen px-10 lg:px-20 py-10">
      <div className="w-full mx-auto">
        <div className="bg-red-500 rounded-lg">
          <CheckoutComponent products={items} />
        </div>
      </div>
    </div>
  );
}
