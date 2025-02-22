// "use client";

// import { useParams } from "next/navigation";
// import { getCartDetail } from "@/api";
// import React, { useEffect, useState } from "react";
// import type { Product } from "@/types";
// import { DeliveryAddress } from "@/components/cart/DeliveryAddress";
// import { CartItem } from "@/components/cart/CartItem";
// import { CartSummary } from "@/components/cart/CartSummary";

// const CartPage: React.FC = () => {
//   const [cartItems, setCartItems] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const params = useParams();

//   console.log("Params:", params); // Kiểm tra giá trị params

//   // Sửa lỗi key trong params
//   const storeId = params.storeId && !isNaN(parseInt(params.storeId)) 
//   ? parseInt(params.storeId) 
//   : null;

// console.log("Store ID:", storeId); // Kiểm tra giá trị storeId

//   useEffect(() => {
//     if (!storeId) {
//       setError("Store ID không hợp lệ.");
//       setLoading(false);
//       return;
//     }

//     const fetchCart = async () => {
//       try {
//         setLoading(true);
//         const cartData = await getCartDetail(storeId);

//         console.log("Cart Data Detail:", cartData); // Kiểm tra dữ liệu trả về

//         if (cartData?.data?.store?.items?.length > 0) {
//           setCartItems(cartData.data.items);
//         } else {
//           setCartItems([]);
//           setError("Giỏ hàng trống.");
//         }
//       } catch (err: any) {
//         setError(err.message || "Không thể tải giỏ hàng.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, [storeId]);

//   const handleRemoveItem = (id: number): void => {
//     console.log("Removing item:", id);
//   };

//   if (loading) {
//     return <p className="text-center mt-4">Đang tải giỏ hàng...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-xl font-medium mb-6">Chi tiết giỏ hàng</h1>

//       {Array.isArray(cartItems) && cartItems.length > 0 ?  (
//         <>
//           <DeliveryAddress
//             storeAddress={cartItems[0]?.store?.address || ""}
//             userAddress="Trường Cao Đẳng Lương Thực - Thực Phẩm"
//             onChangeAddress={() => console.log("Change address")}
//           />

//           <div className="bg-white rounded-lg shadow">
//             {cartItems.map((item) => (
//               <CartItem key={item.id} product={item} onRemove={handleRemoveItem} />
//             ))}
//           </div>

//           <CartSummary
//             subtotal={cartItems.reduce((sum, item) => sum + Number(item.discounted_price), 0)}
//             savings={cartItems.reduce(
//               (sum, item) => sum + (Number(item.original_price) - Number(item.discounted_price)),
//               0
//             )}
//           />
//         </>
//       ) : (
//         <p className="text-center text-gray-500">Giỏ hàng của bạn đang trống.</p>
//       )}
//     </div>
//   );
// };

// export default CartPage;
"use client";

import { useParams } from "next/navigation";
import { getCartDetail } from "@/api";
import React, { useEffect, useState } from "react";
import type { Product } from "@/types";
import { DeliveryAddress } from "@/components/cart/DeliveryAddress";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartData, setCartData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  const storeId = params.storeId && !isNaN(parseInt(params.storeId)) 
    ? parseInt(params.storeId) 
    : null;

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, stock_quantity: newQuantity } : item
      )
    );
  };

  useEffect(() => {
    if (!storeId) {
      setError("Store ID không hợp lệ.");
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        setLoading(true);
        const cartData = await getCartDetail(storeId);
        console.log("Cart Data Detail:", cartData);
        console.log("user address ",cartData?.data?.user?.address)
        const items = cartData?.data?.store?.items;
        console.log("items: ",items);
        if (Array.isArray(items)) {
          setCartData(cartData)
          setCartItems(items);
        } else {
          setCartItems([]);
          setError("Giỏ hàng trống.");
        }
      } catch (err: any) {
        setError(err.message || "Không thể tải giỏ hàng.");
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [storeId]);

  const handleRemoveItem = (id: number): void => {
    console.log("Removing item:", id);
  };

  if (loading) {
    return <p className="text-center mt-4">Đang tải giỏ hàng...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-medium mb-6">Chi tiết giỏ hàng</h1>

      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        <>
          <DeliveryAddress
            storeAddress={cartData?.data?.store?.store_address || ""}
            userAddress={cartData?.data?.user?.address || ""}
            onChangeAddress={() => console.log("Change address")}
          />

          <div className="bg-white rounded-lg shadow">
            {cartItems.map((item) => (
              <CartItem key={item.id} product={item} onRemove={handleRemoveItem} />
            ))}
          </div>

          <CartSummary
            total={cartItems.reduce((sum, item) => sum + Number(item.subtotal), 0)}
            savings={cartItems.reduce(
              (sum, item) => sum + (Number(item.original_price) * item.quantity - Number(item.subtotal)),
              0
            )}
          />
        </>
      ) : (
        <p className="text-center text-gray-500">Giỏ hàng của bạn đang trống.</p>
      )}
    </div>
  );
};

export default CartPage;
