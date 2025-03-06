import React, { Suspense } from "react";
import { getProductDetail } from "@/api";
import { Product } from "@/types";
import Loading from "../../loading";
import ProductDetailPage from "./ProductDetail";
import { generateMetadata as generateMeta } from "@/utils";
import Link from "next/link"; // Import để thêm điều hướng
import Image from "next/image"; // Import để hiển thị hình ảnh minh họa

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props) {
  const storeDetail = await getProductDetail(params.id);
  return generateMeta(
    storeDetail?.name || "Product detail",
    "To product detail information"
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  let product: Product | null = null;
  let loading = true;

  try {
    product = await getProductDetail(params.id);
    loading = false;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center text-orange-500">
        <p className="text-lg font-semibold">
          Lỗi khi lấy dữ liệu. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center text-primary">
        <p className="text-lg font-semibold">
          Không có sản phẩm nào để hiển thị.
        </p>
        <Link href="/products">
          <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
            Quay lại danh sách sản phẩm
          </button>
        </Link>
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <div>
        <ProductDetailPage loadingProps={loading} product={product} />
      </div>
    </Suspense>
  );
}
