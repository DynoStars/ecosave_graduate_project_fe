"use client";

import React from 'react'




export default function Home() {
  return (
    <div>


<section className="relative flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-white">
      {/* Nội dung bên trái */}
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold leading-tight text-gray-900">
          Thu Thập <span className="text-green-500">Giảm Giá Tốt</span> Gần Địa Điểm Của Bạn
        </h1>
        <p className="mt-4 text-gray-600">
          Khám phá và thu thập những ưu đãi tuyệt vời ngay gần bạn để tiết kiệm hơn mỗi ngày!
        </p>
        <div className="mt-6 flex space-x-4">
          <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600">
            Đến sản phẩm
          </button>
          <button className="px-6 py-3 bg-teal-400 text-white font-semibold rounded-lg shadow-md hover:bg-teal-500">
            Khám phá các cửa hàng gần bạn
          </button>
        </div>
      </div>

      {/* Ảnh bên phải */}
      <div className="relative mt-8 md:mt-0 flex space-x-4">
        <img src="/images/grocery1.jpg" alt="Shopping" className="w-40 h-64 object-cover rounded-lg shadow-md" />
        <img src="/images/grocery2.jpg" alt="Cart" className="w-40 h-64 object-cover rounded-lg shadow-md" />
      </div>

      {/* Thông tin thống kê */}
      <div className="absolute top-10 left-2/3 bg-white shadow-lg p-4 rounded-lg">
        <p className="text-lg font-bold">2K+</p>
        <span className="text-gray-500 text-sm">Khách hàng hài lòng</span>
      </div>
      <div className="absolute bottom-10 left-2/3 bg-white shadow-lg p-4 rounded-lg">
        <p className="text-lg font-bold">5K+</p>
        <span className="text-gray-500 text-sm">Sản phẩm</span>
      </div>
      <div className="absolute bottom-0 right-1/3 bg-white shadow-lg p-4 rounded-lg">
        <p className="text-lg font-bold">250+</p>
        <span className="text-gray-500 text-sm">Cửa hàng</span>
      </div>
    </section>
    </div>
  )
}
