"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Payment from "../../assets/icons/footerIcon/Payment.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Contact Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* <Image  src="/logo.png" alt="EcoSave Logo" className="h-10 w-10" /> */}

              <div>
                <h2 className="text-lg font-semibold text-green-600">
                  EcoSave
                </h2>
                <p className="text-sm text-gray-500">Grocery</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <span className="font-semibold">📍 Địa chỉ:</span> 101B Lê Hữu
                Trác - Đà Nẵng
              </li>
              <li>
                <span className="font-semibold">📞 Gọi:</span> 1233-777
              </li>
              <li>
                <span className="font-semibold">✉ Email:</span>{" "}
                groceyish@contact.com
              </li>
              <li>
                <span className="font-semibold">⏰ Giờ làm việc:</span> 8:00 -
                20:00, Sunday - Thursday
              </li>
            </ul>
          </div>

          {/* Tài khoản */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Tài khoản</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/favorites">Yêu thích</Link>
              </li>
              <li>
                <Link href="/cart">Giỏ hàng</Link>
              </li>
              <li>
                <Link href="/orders">Thông tin đơn hàng</Link>
              </li>
              <li>
                <Link href="/delivery">Chi tiết giao hàng</Link>
              </li>
            </ul>
          </div>

          {/* Liên kết */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Liên kết</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about">Về chúng tôi</Link>
              </li>
              <li>
                <Link href="/contact">Liên hệ</Link>
              </li>
              <li>
                <Link href="/hot-deals">Giá hot</Link>
              </li>
              <li>
                <Link href="/promotions">Khuyến mãi</Link>
              </li>
              <li>
                <Link href="/new-products">Sản phẩm mới</Link>
              </li>
            </ul>
          </div>

          {/* Trợ giúp */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Trợ giúp</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/payment">Thanh toán</Link>
              </li>
              <li>
                <Link href="/refund">Đền bù</Link>
              </li>
              <li>
                <Link href="/shipping">Giao hàng</Link>
              </li>
              <li>
                <Link href="/faq">Q&A</Link>
              </li>
              <li>
                <Link href="/policies">Quy định</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-gray-300 pt-4">
          <div className="flex flex-wrap justify-between items-center">
            {/* Copyright */}
            <p className="text-sm text-gray-500">© 2022, All rights reserved</p>

            {/* Payment Methods */}
            <div className="flex space-x-4">
              <Image
                width={150}
                height={60}
                src={Payment.src}
                alt="Payment method"
                className="h-6"
              />
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
  <Link href="#" className="text-green-600 hover:text-green-800">
    <FacebookIcon fontSize="medium" />
  </Link>
  <Link href="#" className="text-green-600 hover:text-green-800">
    <LinkedInIcon fontSize="medium" />
  </Link>
  <Link href="#" className="text-green-600 hover:text-green-800">
    <InstagramIcon fontSize="medium" />
  </Link>
  <Link href="#" className="text-green-600 hover:text-green-800">
    <TwitterIcon fontSize="medium" />
  </Link>
</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
