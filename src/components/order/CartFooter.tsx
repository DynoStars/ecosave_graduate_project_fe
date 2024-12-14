import React, { useEffect, useState } from "react";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CartItem } from "@/types";
import { useCart } from "../context/CartContext";
import { useTranslation } from "react-i18next";

interface CartFooterProps {
  setCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartFooter: React.FC<CartFooterProps> = ({ setCartVisible }) => {
  const { cart } = useCart();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { t } = useTranslation();

  const uniqueCart = cart.reduce<CartItem[]>((acc, current) => {
    const x = acc.find((item) => item.name === current.name);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  useEffect(() => {
    const newTotalPrice = uniqueCart.reduce(
      (sum, item) => sum + Number(item.price),
      0
    );
    setTotalPrice(newTotalPrice);
  }, [uniqueCart]);

  const handleGoToCart = () => {
    setCartVisible(false); // Close the cart when navigating to the cart page
  };

  return (
    <div className="absolute bottom-0 w-full gap-1 flex-col bg-red-500">
      <Link href="/settings/products/order" passHref>
        <button
          onClick={handleGoToCart}
          className="rounded bg-green-600 h-full w-full flex items-center justify-center p-4 hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <span className="flex justify-center items-center bg-white rounded-full p-2 shadow-inner">
            <ArrowForwardIcon className="text-green-600" />
          </span>
          <p className="text-2xl w-full text-white font-semibold">
            {t("baskets.basketButton")}
          </p>
        </button>
      </Link>
    </div>
  );
};

export default CartFooter;
