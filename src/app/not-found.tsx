import { generateMetadata } from "@/utils";
import Link from "next/link";
import React from "react";

// Đảm bảo metadata được tạo đúng cách
export const metadata = generateMetadata("Rất tiếc!", "N");

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center h-screen overflow-hidden">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Rất tiếc! Trang không tồn tại
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Chúng tôi gặp lỗi ngoài ý muốn. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.
      </p>
      <Link
        href="/"
        className="px-6 py-3 text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
}
