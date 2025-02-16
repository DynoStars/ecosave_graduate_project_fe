import React, { Suspense } from "react";
import { getProductDetail } from "@/api";
import { Product } from "@/types";
import Loading from "../../loading";
import ProductDetailPage from "./ProductDetail";
import { generateMetadata as generateMeta } from "@/utils";
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ params }: Props) {
  const storeDetail = await getProductDetail(params.id);
  return generateMeta(storeDetail?.name || "Product detail", "To prroduct detail information");
}
export default async function Page({ params }: { params: { id: string } }) {
  let product: Product | null = null;
  let loading = true;
  try {
    product = await getProductDetail(params.id);
    console.log(product)
    loading = false;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return (
      <div className="text-center text-orange-500">
        Lỗi khi lấy dữ liệu. Vui lòng thử lại sau.
      </div>
    );
  }
  if (!product) {
    return (
      <div className="text-center text-primary">
        Không có sản phẩm nào để hiển thị.
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
