import React, { Suspense } from "react";
import StorePage from "./Store";
import Loading from "@/app/loading";
import { Product, Store } from "@/types";
import { getProducts, getStoreById } from "@/api";

type Props = {
  params: { storeId: string }; // Sửa productId → storeId và để string để đảm bảo Next.js hiểu đúng
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function StoreDetailPage({ params }: Props) {
  const { storeId } = params; // Lấy storeId từ URL

  console.log(storeId)

  let storeDetail: Store | null = null;
  let products : Product[] = [];

  try {

    storeDetail = await getStoreById(Number(storeId)); // Chuyển storeId về number nếu cần
    products = await getProducts({store_id : storeId});
    console.log(storeDetail);
    console.log(products);
  } catch (error) {
    console.error("Failed to fetch store data:", error);
    return (
      <div className="text-center text-orange-500">
        Lỗi khi lấy dữ liệu. Vui lòng thử lại sau.
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex justify-center items-center px-20 py-10">
      {storeDetail ? <StorePage store={storeDetail} products={products} /> : <p>Không tìm thấy cửa hàng.</p>}
      </div>
    </Suspense>
  );
}
