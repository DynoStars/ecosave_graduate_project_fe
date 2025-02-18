"use client";

import { formatCurrency } from "@/utils";
import { FileText } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const OrderReceipt = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"success" | "failure">("success");
  const [urlParams, setUrlParams] = useState<any>({});

  useEffect(() => {
    // Lấy tất cả các tham số từ URL
    const params = new URLSearchParams(window.location.search);

    // Chuyển đổi tất cả tham số thành một object
    const paramsObject: { [key: string]: string | null } = {};
    params.forEach((value, key) => {
      paramsObject[key] = value;
    });

    // Cập nhật state với các tham số URL
    setUrlParams(paramsObject);

    // Kiểm tra mã phản hồi để xác định trạng thái thanh toán
    const responseCode = paramsObject["vnp_ResponseCode"];
    if (responseCode === "00") {
      setPaymentStatus("success");
    } else {
      setPaymentStatus("failure");
    }
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex justify-center items-center min-h-[600px]">
      {/* Thông báo thanh toán */}
      <div className={`bg-white p-8 rounded-xl relative text-center border border-gray-300 ${paymentStatus === 'failure' ? 'bg-red-100' : 'bg-green-100'}`}>
        <button
          onClick={toggleModal}
          className="absolute right-2 top-2 flex items-center justify-center space-x-2 p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          <FileText className="w-5 h-5" />
        </button>
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 flex items-center justify-center rounded-full ${paymentStatus === 'failure' ? 'bg-red-200' : 'bg-green-100'}`}>
            {paymentStatus === 'failure' ? (
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            )}
          </div>
        </div>
        <h1 className={`text-2xl font-bold ${paymentStatus === 'failure' ? 'text-red-600' : 'text-green-600'} mb-2`}>
          {paymentStatus === 'failure' ? 'Thanh toán thất bại' : 'Thanh toán thành công'}
        </h1>
        <p className="text-gray-600 mb-6">
          {paymentStatus === 'failure'
            ? 'Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại.'
            : 'Đơn hàng của quý khách đã thanh toán thành công. Vui lòng đến cửa hàng sớm nhất trong vòng 24h để nhận sản phẩm'}
        </p>

        <div className="flex justify-center space-x-4">
          <Link href="/products">
            <button className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-600 rounded-lg">
              Tiếp tục mua sắm
            </button>
          </Link>
          <Link href="/#">
            <button className="px-6 py-2 bg-primary text-white hover:bg-primary-light rounded-lg">
              Xem đường đi đến cửa hàng
            </button>
          </Link>
        </div>
      </div>

      {/* Modal hóa đơn */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-300 w-full max-w-md relative">
            <header className="text-center mb-6">
              <h1 className="text-3xl font-extrabold tracking-wide">
                Eco<span className="text-primary">Save</span>
              </h1>
              <h2 className="text-xl font-semibold mt-2">HÓA ĐƠN LẤY HÀNG</h2>
            </header>

            <section className="mb-6">
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Tên khách hàng:</span> Lê Thị
                  Bích Quyên
                </p>
                <p>
                  <span className="font-semibold">ID thẻ khách hàng:</span>{" "}
                  01822929
                </p>
                <p>
                  <span className="font-semibold">Tên cửa hàng:</span> Winmart
                  Đà Nẵng
                </p>
                <p>
                  <span className="font-semibold">Địa chỉ lấy hàng:</span> 101B
                  Lê Hữu Trác, Đà Nẵng
                </p>
                <p>
                  <span className="font-semibold">Ngày mua:</span> 9:21 PM
                  16/02/2025
                </p>
              </div>
            </section>

            <table className="w-full mb-6 border-t border-b border-gray-300">
              <thead>
                <tr className="text-left text-sm font-semibold border-b border-gray-300">
                  <th className="py-2">Mặt hàng</th>
                  <th className="py-2 text-right">Đơn giá</th>
                  <th className="py-2 text-right">Số lượng</th>
                  <th className="py-2 text-right">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  {
                    name: "Sữa TH True milk",
                    price: "5.000đ",
                    quantity: 2,
                    total: "10.000đ",
                  },
                  {
                    name: "50g thịt heo",
                    price: "16.000đ",
                    quantity: 1,
                    total: "16.000đ",
                  },
                  {
                    name: "Pate đông lạnh",
                    price: "25.000đ",
                    quantity: 2,
                    total: "50.000đ",
                  },
                  {
                    name: "Mít sấy Đà Lạt",
                    price: "15.000đ",
                    quantity: 1,
                    total: "15.000đ",
                  },
                ].map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-dashed border-gray-200"
                  >
                    <td className="py-2">{item.name}</td>
                    <td className="py-2 text-right">{item.price}</td>
                    <td className="py-2 text-right">{item.quantity}</td>
                    <td className="py-2 text-right">{formatCurrency(urlParams["vnp_Amount"])}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right mb-6 text-sm space-y-2">
              <p>
                <span className="font-semibold">TỔNG TIỀN T.TOÁN:</span> {formatCurrency(urlParams["vnp_Amount"])}
              </p>
              <p>
                <span className="font-semibold">TIỀN KHÁCH TRẢ:</span> {formatCurrency(urlParams["vnp_Amount"])}
              </p>
              <p className="text-xs text-gray-500">
                Điểm tích lũy (10.000đ = 1 điểm): 8.9
              </p>
            </div>

            <footer className="text-center text-xs text-gray-500 mb-6">
              www.ecosave.space
            </footer>

            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderReceipt;
