"use client"
// import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";
// import GoogleIcon from "../../../assets/icons/footerIcon/googleIcon.png";
import "./register.css";
import LoginWithGoogleButton from "@/components/button/LoginWithGoogleButton";
// import  LoginWithGoogleButton from "../../../components/button/LoginWithGoogleButton"

interface FormData {
  fullName: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  fullName?: string;
  email?: string;
  address?: string;
  password?: string;
  confirmPassword?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.fullName) newErrors.fullName = "Họ và tên không được để trống.";
    if (!formData.email) {
      newErrors.email = "Email không được để trống.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }
    if (!formData.address) newErrors.address = "Địa chỉ không được để trống.";
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully!", formData);
    }
  };


  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-50">
      {/* Left Section - Image */}
      <div
        className="relative flex-1 left-box">
        <div className="absolute inset-0 bg-opacity-40"></div>
        <div className="absolute top-1/3 left-10 text-white">
          <div className="bg-green-500 px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
            Đảm bảo chất lượng
          </div>
          <h2 className="text-xl font-bold">
            Mang lại trải nghiệm tốt
            <br />
            khi mua sắm
          </h2>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-[60%] rounded-lg p-8">
          <p className="text-sm">Bằng cách tiếp tục, bạn cho biết rằng bạn đã đọc và đồng ý với Điều khoản sử dụng</p>
          <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Bắt đầu với EcoSave
          </h1>
          <div className="w-full">
          <div>
            <LoginWithGoogleButton />
          </div>
          </div>
          <p className="text-center text-gray-500 mb-4 text-sm">Hoặc đăng ký với</p>
          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-light text-sm"
            />
            {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName}</span>}

            <input
              type="email"
              name="email"
              placeholder="Nhập email"
              value={formData.email}
              autoComplete="off"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-light text-sm"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}

            <input
              type="text"
              name="address"
              placeholder="Nhập địa chỉ"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-light text-sm"
            />
            {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}

            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-light text-sm"
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-light text-sm"
            />
            {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword}</span>}

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark text-sm"
            >
              Đăng ký
            </button>
          </form>
          <div className="text-center text-gray-500 mt-4 text-sm">
            Bạn đã có tài khoản?{" "}
            <a href="#" className="text-primary">
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
