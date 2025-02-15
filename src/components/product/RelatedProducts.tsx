// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { AiFillStar, AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai"
// import fallbackImage from "@/assets/images/products/product1.png"
// import type { Product } from "@/types"

// interface RelatedProductsProps {
//   currentProductId: number
//   products: Product[]
//   category: string
// }

// export default function RelatedProducts({ currentProductId, products, category }: RelatedProductsProps) {
//   const [favoriteProducts, setFavoriteProducts] = useState<number[]>([])

//   const toggleFavorite = (productId: number) => {
//     setFavoriteProducts((prev) =>
//       prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
//     )
//   }

//   const relatedProducts = products
//     .filter((product) => product.category.name === category && product.id !== currentProductId)
//     .slice(0, 4)

//   return (
//     <section className="container mx-auto px-4 mt-12">
//       <h2 className="text-2xl font-bold mb-6">Các sản phẩm tương tự</h2>
//       {relatedProducts.length === 0 ? (
//         <p className="text-center text-gray-500">Không có sản phẩm tương tự</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {relatedProducts.map((product) => (
//             <div
//               key={product.id}
//               className="rounded-lg shadow-soft bg-white pb-3 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-strong"
//             >
//               {product.discount_percent > 0 && (
//                 <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded absolute">
//                   Giảm {product.discount_percent}%
//                 </span>
//               )}
//               <Link href={`/product/${product.id}`} className="block">
//                 <Image
//                   src={product.images[0]?.image_url || fallbackImage.src}
//                   alt={product.name}
//                   width={300}
//                   height={300}
//                   className="mx-auto w-full object-cover"
//                 />
//               </Link>
//               <div className="mt-3 px-4">
//                 <div className="flex justify-between">
//                   <p className="text-sm text-gray-500 truncate">{product.category.name}</p>
//                   <p className="text-sm text-gray-500 truncate">{product.store.store_name}</p>
//                 </div>
//                 <Link href={`/product/${product.id}`} className="block">
//                   <h3 className="text-md font-semibold truncate hover:text-primary">{product.name}</h3>
//                 </Link>
//                 <div className="flex justify-between items-center">
//                   <p className="text-primary-light font-bold">{product.original_price}</p>
//                   <div className="flex text-yellow-400">
//                     {Array.from({ length: product.rating }, (_, i) => (
//                       <AiFillStar key={i} size={16} />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex justify-between mt-4 px-4">
//                 <button
//                   className={`p-2 border rounded-full transition-all duration-300 ${
//                     favoriteProducts.includes(product.id)
//                       ? "bg-orange-500 text-white"
//                       : "bg-white text-red-500 hover:bg-red-500 hover:text-white"
//                   }`}
//                   onClick={() => toggleFavorite(product.id)}
//                 >
//                   {favoriteProducts.includes(product.id) ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
//                 </button>
//                 <button className="p-2 w-[75%] flex justify-center bg-primary rounded-full text-white hover:bg-primary-light">
//                   <AiOutlineShoppingCart size={20} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   )
// }

