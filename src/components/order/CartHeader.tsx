import React from "react";
import Image from "next/image";
import ShoppingBasketImage from "../../assets/images/Full Shopping Basket.png";
import { useTranslation } from "react-i18next";

const CartHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="h-24 bg-green-600 w-full flex items-center justify-center flex-wrap">
      <div className="w-1/4 flex items-center p-2 justify-center">
        <Image
          width={500}
          height={500}
          src={ShoppingBasketImage}
          alt="Order image"
          className="w-16 h-16 rounded-md"
        />
      </div>
      <div className="w-2/4 flex items-center p-2 justify-center text-3xl font-bold text-white">
        {t("baskets.basketTitle")}
      </div>
    </div>
  );
};

export default CartHeader;
