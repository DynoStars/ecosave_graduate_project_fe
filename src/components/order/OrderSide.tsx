"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import CartButton from "./CartButton";
import CartHeader from "./CartHeader";
import CartFooter from "./CartFooter";
import CartContent from "./CartContent";

const OrderSide: React.FC = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const { theme } = useTheme();
  const cartRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
      setCartVisible(!cartVisible);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      cartRef.current &&
      !cartRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setCartVisible(false);
    }
  };

  useEffect(() => {
    if (cartVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartVisible]);

  return (
    <div>
      <CartButton onClick={handleClick} buttonRef={buttonRef} />
      <div
        ref={cartRef}
        className={`cart-container ${cartVisible ? "visible" : ""} z-50 box-shadow-2 fixed top-20 right-0 bottom-0 h-86 w-full sm:w-2/5 overflow-y-auto flex flex-col`}
        style={{ maxHeight: "calc(100vh - 4rem)", overflowY: "auto" }}
      >
        <CartHeader />
        <CartContent />
        <CartFooter setCartVisible={setCartVisible} />
      </div>
    </div>
  );
};

export default OrderSide;
