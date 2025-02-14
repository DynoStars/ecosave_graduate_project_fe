import { ProductGallery } from "@/components/product/ProductGallery"
import { ProductInfo } from "@/components/product/ProductInfo"
import { StoreInfo } from "@/components/product/StoreInfo"
import { ProductDescription } from "@/components/product/ProductDescription"
import { Reviews } from "@/components/product/Reviews"
// import { RelatedProducts } from "@/components/product/RelatedProducts"
import { Breadcrumb } from "@/components/product/BreadCrumb"
import Loading from "@/components/loading/Loading"

// // Mock data
// const productData = {
//   id: 1,
//   name: "Sữa TH True Milk 110ml - Gói 4",
//   description:
//     "Sữa tươi tiệt trùng TH true Milk là đường hóa 110ml. Sữa TH True Milk là đường hóa 110ml là sự lựa chọn hoàn hảo cho bé yêu, là nguồn bổn sung dinh dưỡng dồi dào cho bé.",
//   original_price: "58000",
//   discount_percent: 15,
//   discounted_price: "49500",
//   expiration_date: "2025-09-06",
//   stock_quantity: 95,
//   rating: "4.5",
//   images: [
//     "https://www.lottemart.vn/media/catalog/product/cache/0x0/8/9/8936197490756-1.jpg.webp",  
//     "https://www.lottemart.vn/media/catalog/product/cache/75x75/8/9/8936197490756-1.jpg.webp",  
//     "https://www.lottemart.vn/media/catalog/product/cache/75x75/8/9/8936197490756-1.jpg.webp",  
//     "https://www.lottemart.vn/media/catalog/product/cache/75x75/8/9/8936197490756-1.jpg.webp"
//   ], 
//   details: {
//     origin: "Việt Nam",
//     ingredients:
//       "Sữa hoàn toàn tự nhiên từ trang trại TH True Milk, đường tinh luyện (5.8 %), chất ổn định (447 a,407), Không sử dụng chất bảo quản và các chất không tự nhiên.",
//     usage: "Dùng trực tiếp. Ngon hơn khi uống lạnh",
//     storage: "Bảo quản nơi khô ráo, thoáng mát. Sau khi mở nắp bảo quản ở 4 - 10 độ C và sử dụng hết trong 24 ngày.",
//     expirationDate: "2025-09-06", 
//   },
//   store: {
//     id: 11,
//     store_name: "Winmart Đà Nẵng",
//     avatar: "data:image/png;base64,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",
//     contact_phone: "+47333771692",
//     description: "Cửa hàng tiện lợi Winmart tại Đà Nẵng",
//     address: "92 Mù Tạt Lùn, Sơn Trà, Đà Nẵng",
//     distance: "142 km"
//   },
// }

// const reviewsData = [
//   {
//     name: "Bích Duyên",
//     rating: 5,
//     date: "2024-02-07 10:12",
//     comment:
//       "Mình mua máy lần đã ổn lắm được nhiều món ăn khác nhau nữa hợp với giá tiền không cần phải bàn về chất lượng cho những là mọi người tận mua nha ung ơi là ung shop đó",
//   },
//   {
//     name: "Gia Bảo",
//     rating: 4,
//     date: "2024-02-07 10:12",
//     comment:
//       "Mình mua máy lần đã ổn lắm được nhiều món ăn khác nhau nữa hợp với giá tiền không cần phải bàn về chất lượng cho những là mọi người tận mua nha ung ơi là ung shop đó",
//   },
//   {
//     name: "Tú H",
//     rating: 5,
//     date: "2024-02-07 10:12",
//     comment:
//       "Mình mua máy lần đã ổn lắm được nhiều món ăn khác nhau nữa hợp với giá tiền không cần phải bàn về chất lượng cho những là mọi người tận mua nha ung ơi là ung shop đó",
//   },
// ]

// export default function ProductDetailPage() {
//   return (
//     <main className="container px-[100px] mx-auto px-4 py-4">
//       <Breadcrumb
//         items={[
//           { label: "Trang chủ", href: "/" },
//           { label: productData.name, href: "#" },
//         ]}
//       />

//       <div className="grid lg:grid-cols-[1fr,2fr] gap-8"> 
//         <ProductGallery images={productData.images} />
//         <ProductInfo product={productData} />
//       </div>

//       <div className="mt-8">
//         <StoreInfo store={productData.store} />
//       </div>

//       <ProductDescription description={productData.description} details={productData.details} />

//       <Reviews reviews={reviewsData} />

//       {/* <RelatedProducts products={relatedProductsData} /> */}
//     </main>
//   )
// }

export default function ProductDetailPage({ loadingProps, product }: { loadingProps: boolean, product: Product }) {
    if (loadingProps) return <Loading />;
  
    return (
      <main className="container px-[100px] mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: product.name, href: "#" },
          ]}
        />
  
        <div className="grid lg:grid-cols-[1fr,2fr] gap-8">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>
  
        <div className="mt-8">
          <StoreInfo store={product.store} />
        </div>
  
        <ProductDescription description={product.description} details={product.details} />
  
        <Reviews reviews={product.reviews} />
      </main>
    );
  }
  