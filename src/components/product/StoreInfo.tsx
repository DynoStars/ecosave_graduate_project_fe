import Image from "next/image";
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Car, Store } from "lucide-react"


interface StoreInfoProps {
  store: {
    store_name: string
    avatar: string
    contact_phone: string
    address: string
    distance: string
  }
}

export function StoreInfo({ store }: StoreInfoProps) { 
  return (
    <div className="border rounded-lg p-4 space-y-10">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center space-x-4 mr-10">
          <div className="w-20 h-20 rounded-full overflow-hidden relative">
            {store.avatar ? (
              <Image
                src={store.avatar}
                alt={store.store_name}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-600 font-medium flex items-center justify-center w-full h-full">
                {store.store_name[0]}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-lg">{store.store_name}</h3>
            <Button variant="outline" size="sm" className="flex items-center hover:bg-gray-100 transition-colors duration-200">
              <Store className="mr-2 hover:text-gray-500 transition-colors duration-200" />
              <span className="hover:text-gray-500">Xem Shop</span>
            </Button>
          </div>
        </div>

        <div className="flex-1 text-sm text-gray-600 ml-10">
          <div className="flex justify-between gap-x-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="truncate text-[16px]">{store.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 shrink-0" />
              <span className="text-[16px]">{store.contact_phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Car className="w-5 h-5 shrink-0" />
              <span className="text-[16px]">{store.distance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
