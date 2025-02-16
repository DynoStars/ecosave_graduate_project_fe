import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { StoreInfo } from "@/components/product/StoreInfo";
import { ProductDescription } from "@/components/product/ProductDescription";
import { Reviews } from "@/components/product/Reviews";
// import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Breadcrumb } from "@/components/product/BreadCrumb";
import Loading from "@/components/loading/Loading";
import { Product } from "@/types";
export default function ProductDetailPage({ loadingProps, product }: { loadingProps: boolean; product: Product }) {
  if (loadingProps) return <Loading />;
  return (
    <main className="container mx-auto px-5 lg:px-32 py-4">
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: product.name, href: "#" },
        ]}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-8">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>
      <div className="mt-8">
        <StoreInfo store={product.store} />
      </div>
      <ProductDescription description={product.description} details={product} />
      <Reviews reviews={product.reviews} />
    </main>
  );
}