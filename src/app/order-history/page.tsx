import Image from "next/image"

export default function OrderHistory() {
  const orders = [
    {
      id: 1,
      storeName: "Tạp hóa cô Hoa",
      date: "20/12/2024",
      location: "100 Ngô Hành Sơn",
      items: [
        {
          id: 1,
          name: "Sữa chua Yogurt",
          quantity: 2,
          price: 100000,
          image: "/https://www.lottemart.vn/media/catalog/product/cache/0x0/2/1/2180960000000-1.jpg.webp",
        },
        {
          id: 2,
          name: "Sữa chua Yogurt",
          quantity: 2,
          price: 100000,
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
      total: 200000,
      status: "Đã giao hàng",
    },
    {
      id: 2,
      storeName: "Tạp hóa cô Hoa",
      date: "19/12/2024",
      location: "100 Ngô Hành Sơn",
      items: [
        {
          id: 1,
          name: "Sữa chua Yogurt",
          quantity: 1,
          price: 100000,
          image: "/placeholder.svg?height=60&width=60",
        },
        {
          id: 2,
          name: "Bánh mì",
          quantity: 3,
          price: 50000,
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
      total: 250000,
      status: "Đang giao hàng",
    },
  ]

  // Format currency to VND
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VNĐ"
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-bold mb-8 text-center">LỊCH SỬ ĐƠN HÀNG</h1>

      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg shadow-sm overflow-hidden bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Header */}
              <div className="p-6 md:col-span-3 bg-gray-50 border-b">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{order.storeName}</h2>
                    <p className="text-sm text-gray-500">{order.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{order.date}</p>
                    <p className="text-sm text-gray-500">Mã đơn: #{order.id}</p>
                  </div>
                  <div className="w-full md:w-auto">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Đã giao hàng"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="p-6 md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Chi tiết đơn hàng</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">Số lượng: {item.quantity}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(item.price)}</div>
                        <div className="text-sm text-gray-500">{formatCurrency(item.price * item.quantity)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary and Actions */}
              <div className="p-6 bg-gray-50 border-l">
                <h3 className="text-lg font-semibold mb-4">Tổng quan</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span>Tổng tiền hàng:</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>{formatCurrency(0)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Thành tiền:</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full py-2 px-4 bg-emerald-500 text-white rounded-md text-sm font-medium hover:bg-emerald-600 transition-colors">
                    Đánh giá
                  </button>
                  <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                    Xem hóa đơn
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

