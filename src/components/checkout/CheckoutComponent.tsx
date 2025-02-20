"use client";
import React, { useState } from "react";
import { formatMoney } from "@/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BannerAds from '../../assets/images/banner/banner_ads_1.png';
import { makeNewPayment } from "@/api";
import CheckoutFormGetInfo from "./CheckoutFormGetInfo";
import OrderCard from "./OrderCard";
import { PaymentItem } from "@/types";


const CheckoutComponent = ({ products }: { products: PaymentItem[] }) => {
  const router = useRouter();


  const [selectedItems, setSelectedItems] = useState(products);


  const totalPrice = selectedItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);


  const handleRemoveItem = (id: string) => {
    setSelectedItems((prevItems) => prevItems.filter(item => item.id.toString() !== id));
  };


  const handleBuyClick = async () => {
    try {
      const response = await makeNewPayment(totalPrice * 1000);
      console.log(totalPrice)
      if (response) {
        // Handle the response if successful
        console.log("Payment successful:", response);
        router.push(response.data);
      }
    } catch (error) {
      console.error("Error during payment:", error);
      // Optionally, show an error message to the user
    }
  };
  return (
    <div className="bg-white rounded-lg space-y-6 w-full mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left column for Order Items */}
        <div className="w-full md:w-5/12">
          <CheckoutFormGetInfo />
          <Image src={BannerAds.src} alt="Quảng cáo cửa hàngtreen EEcoSave" width={1000} height={200} />
        </div>
        {/* Right column for Checkout Form */}
        <div className="w-full md:w-7/12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Các sản phẩm của Bạn</h2>
          <div className="scrollbar-container gap-3 flex flex-col h-[350px] overflow-auto">
            {selectedItems.map((item) => (
              <OrderCard
                key={item.id}
                id={item.id.toString()}
                picture={item.picture}
                name={item.name}
                price={item.price.toString()}
                quantity={item.quantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>


          {/* Price Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <div className="flex justify-between text-gray-700">
              <p className="font-semibold">Tạm Tính:</p>
              <p className="font-semibold">{formatMoney(totalPrice)}</p>
            </div>
            <div className="flex justify-between text-gray-800 font-bold">
              <p>Tổng Thanh Toán ({products.length} Sản phẩm)</p>
              <p className="text-lg text-red-500">
                {products.length > 0 && totalPrice ? formatMoney(totalPrice) : 0}
              </p>
            </div>
          </div>


          {/* Checkout Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleBuyClick}
              className={`px-6 py-2 text-white rounded-lg ${
                products.length > 0
                  ? "bg-primary hover:bg-primary-light active:bg-primary"
                  : "bg-gray-300"
              }`}
            >
              Mua Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CheckoutComponent;