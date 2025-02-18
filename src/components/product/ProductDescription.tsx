import { Product } from "@/types"
import { formatDateTime } from "@/utils"

interface ProductDescriptionProps {
  description: string
  details: Product
}

export function ProductDescription({ description, details }: ProductDescriptionProps) {
  return (
    <div className="mt-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Description Column */}
        <div>
          <h2 className="text-lg font-medium mb-4 bg-gray-50 p-4">Mô tả</h2>
          <div className="space-y-4 text-gray-600">
            <p>{description}</p>
          </div>
        </div>

        {/* Information Column */}
        <div>
          <h2 className="text-lg font-medium mb-2 bg-gray-50 p-4">Thông tin</h2>
          <div className="space-y-2">
            <div className="grid gap-2">
              <div className="flex items-start gap-8 py-2 border-b">
                <span className="text-gray-600 w-[180px]">Ngày hết hạn</span>
                <span>{formatDateTime(details.expiration_date)}</span>
              </div>
              {/* <div className="flex items-start gap-8 py-2 border-b">
                <span className="text-gray-600 w-[180px]">Xuất xứ</span>
                <span>{formatDateTime(details.created_at)}</span>
              </div> */}
              {/* <div className="flex items-start gap-8 py-2 border-b">
                <span className="text-gray-600 w-[180px]">Thành phần</span>
                <span className="flex-1">{details.ingredients}</span>
              </div> */}
              {/* <div className="flex items-start gap-8 py-2 border-b">
                <span className="text-gray-600 w-[180px]">Hướng dẫn sử dụng</span>
                <span>{details.usage}</span>
              </div> */}
              {/* <div className="flex items-start gap-8 py-2 border-b">
                <span className="text-gray-600 w-[180px]">Bảo quản</span>
                <span className="flex-1">{details.storage}</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

