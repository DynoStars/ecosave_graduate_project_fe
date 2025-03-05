import { getSaveProductOfUser } from "@/api";
import { getProductsByIds } from "@/api/scan";
import { ProductScan, UserProfile } from "@/types";
import { formatDateTime } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Remaindertype = {
  currentDate: string;
  user: UserProfile | null;
};

export default function RemainderComponent({ currentDate, user }: Remaindertype) {
  const [products, setProducts] = useState<ProductScan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      getSaveProductOfUser(user.id, currentDate)
        .then((productIds) => (productIds ? getProductsByIds(productIds) : null))
        .then((products) => {
          if (products) setProducts(products);
        })
        .catch((error) => console.error("API Error:", error))
        .finally(() => setLoading(false));
    }
  }, [user, currentDate]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center">Danh sách sản phẩm</h2>
      <p className="text-center text-gray-600 mb-4">Hôm nay là ngày: {currentDate}</p>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">Không có sản phẩm nào.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center w-full border rounded-lg shadow-lg bg-white p-1 transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <Image
                width={100}
                height={100}
                src={product.images[0]}
                alt={product.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold truncate">{product.title}</h3>
                <p className="text-gray-600 text-sm">Ngày hết hạn: {formatDateTime(product.expiryDate)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
