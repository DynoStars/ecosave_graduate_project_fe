"use client"

import { Heart, ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

const categories = [
  {
    id: 1,
    name: "Rau & Trái cây",
    image:
      "https://cdn4.iconfinder.com/data/icons/gardening-and-seeding-4/85/fruit_fruits_vegetable_vegetables_organic-1024.png",
  },
  {
    id: 2,
    name: "Đồ uống",
    image:
      "https://static.vecteezy.com/system/resources/previews/017/196/528/original/cup-of-tea-coffee-tea-hot-drink-icon-free-png.png",
  },
  {
    id: 3,
    name: "Thịt & Hải sản",
    image: "https://cdn3.iconfinder.com/data/icons/food-drinks-1-1/128/steak-512.png",
  },
  {
    id: 4,
    name: "Bữa sáng",
    image: "https://cdn3.iconfinder.com/data/icons/food-drinks-1-1/128/steak-512.png",
  },
  {
    id: 5,
    name: "Đồ đông lạnh",
    image: "https://cdn3.iconfinder.com/data/icons/food-drinks-1-1/128/steak-512.png",
  },
  {
    id: 6,
    name: "Sữa",
    image: "https://cdn3.iconfinder.com/data/icons/food-drinks-1-1/128/steak-512.png",
  },
]

const products = [
  {
    id: 1,
    name: "Buscopan Forte Tab 20mg X 10",
    image: "https://hcm.fstorage.vn/images/2024/12/hopomc_hoixuan_30_su-o-%C3%A7n_optimized-20241231073547.png",
    price: 40000,
    discount: "Giảm giá 80%",
    category: "Vitamins",
    distance: "1.9km",
    store: "Winmart",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Buscopan Forte Tab 20mg X 10",
    image: "https://hcm.fstorage.vn/images/2024/12/hopomc_hoixuan_30_su-o-%C3%A7n_optimized-20241231073547.png",
    price: 40000,
    discount: "Giảm giá 80%",
    category: "Vitamins",
    distance: "1.9km",
    store: "Winmart",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Buscopan Forte Tab 20mg X 10",
    image: "https://hcm.fstorage.vn/images/2024/12/hopomc_hoixuan_30_su-o-%C3%A7n_optimized-20241231073547.png",
    price: 40000,
    discount: "Giảm giá 80%",
    category: "Vitamins",
    distance: "1.9km",
    store: "Winmart",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Buscopan Forte Tab 20mg X 10",
    image: "https://hcm.fstorage.vn/images/2024/12/hopomc_hoixuan_30_su-o-%C3%A7n_optimized-20241231073547.png",
    price: 40000,
    discount: "Giảm giá 80%",
    category: "Vitamins",
    distance: "1.9km",
    store: "Winmart",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Buscopan Forte Tab 20mg X 10",
    image: "https://hcm.fstorage.vn/images/2024/12/hopomc_hoixuan_30_su-o-%C3%A7n_optimized-20241231073547.png",
    price: 40000,
    discount: "Giảm giá 80%",
    category: "Vitamins",
    distance: "1.9km",
    store: "Winmart",
    rating: 4.5,
  },
  // ... other products
]

export default function ProductListing() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Image
        src="https://www.lottemart.vn/media/new_landing/cache/GIFT-COSMETIC_NO-CTA_1.jpg.webp"
        alt="Banner"
        width={1200}
        height={300}
        className="w-full rounded-lg object-cover mb-8"
      />

      <h1 className="text-2xl font-bold mb-6">Danh Mục Sản Phẩm</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-primary rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center"
          >
            <div className="w-12 h-12 mb-2">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm text-center">{category.name}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="w-full lg:w-64 space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Loại sản phẩm</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="kid" />
                <label htmlFor="kid" className="text-sm">
                  Kid
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="men" />
                <label htmlFor="men" className="text-sm">
                  Men
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="women" />
                <label htmlFor="women" className="text-sm">
                  Women
                </label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Đánh giá</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                    {rating} <Star className="w-4 h-4 ml-1 fill-yellow-400 text-yellow-400" />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Giá</h3>
            <Slider defaultValue={[0, 100]} max={100} step={1} className="w-full" />
            <div className="flex justify-between mt-2">
              <span className="text-sm">0đ</span>
              <span className="text-sm">1.000.000đ</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 relative">
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {product.discount}
                  </span>
                )}
                <div className="aspect-square relative mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sky-500 text-sm">{product.category}</span>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>
                        {product.distance} | {product.store}
                      </span>
                      <div className="flex items-center ml-2">
                        <span>{product.rating}</span>
                        <Star className="w-4 h-4 ml-1 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="font-semibold">{product.price.toLocaleString()}đ</p>
                  <div className="flex items-center justify-between pt-2">
                    <Button variant="ghost" size="icon" className="hover:text-red-500">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

