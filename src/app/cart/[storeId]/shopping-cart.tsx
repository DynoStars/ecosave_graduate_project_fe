import Image from "next/image"
import Link from "next/link"
import { MapPin, Package } from "lucide-react"

interface Store {
  store_id: number
  store_name: string
  store_address: string
  total_products_per_store: number
  total_amount: number
  items: { image: string }[]
}

const getFirstImage = (items: { image: string }[]) => {
  return items.length > 0 ? items[0].image : "/placeholder.jpg"
}

const ShoppingCart = ({ stores }: { stores: Store[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.values(stores || {}).map((store) => (
        <div key={store.store_id} className="bg-gray-50 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            {/* Image container */}
            <div className="flex-shrink-0 w-full sm:w-24 h-32 sm:h-24 relative rounded-md overflow-hidden border border-gray-200">
              <Image
                src={getFirstImage(store.items) || "/placeholder.svg"}
                alt={store.store_name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content container */}
            <div className="flex-grow min-w-0">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Store info */}
                <div className="min-w-0 flex-shrink">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">{store.store_name}</h3>
                  <div className="flex items-start gap-1 mt-1 text-gray-600">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" />
                    <p className="text-sm lg:text-base line-clamp-2 break-words">{store.store_address}</p>
                  </div>
                </div>

                {/* Store details */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 sm:ml-auto">
                  <div className="flex items-center text-gray-700 text-sm lg:text-base">
                    <Package className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                    <span className="font-medium">{store.total_products_per_store}</span>
                    <span className="ml-1 whitespace-nowrap">loại sản phẩm</span>
                  </div>
                  <div className="text-gray-700 font-medium text-sm lg:text-base whitespace-nowrap">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(store.total_amount)}
                  </div>
                  <Link
                    href={`/store/${store.store_id}`}
                    className="bg-emerald-50 text-emerald-700 px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-emerald-100 transition-colors flex items-center font-medium text-sm lg:text-base whitespace-nowrap"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShoppingCart