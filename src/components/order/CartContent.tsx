import React from "react";
import OrderCard from "../cart/OrderCard";
import { useCart } from "../context/CartContext";
import { CartItem } from "@/types";

const CartContent: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  console.log(cart);
  const uniqueCart = cart.reduce<CartItem[]>((acc, current) => {
    const x = acc.find((item) => item.name === current.name);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  return (
    <div className={`p-4  pb-16 scrollbar-container overflow-scroll mb-4 bg-white overflow-x-hidden h-full flex flex-col justify-start items-center`}>
      {uniqueCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        uniqueCart.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            picture={product.picture}
            name={product.name}
            price={product.price}
            onRemove={removeFromCart}
            quantity={product.quantity}
          />
        ))
      )}
    </div>
  );
};

export default CartContent;
