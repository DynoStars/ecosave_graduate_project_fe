"use client";
import React, { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import LoginWithGoogleButton from "@/components/button/LoginWithGoogleButton";
import Link from "next/link";
import "./register.css";
import bgIcon from "../../../assets/images/auth/bg-circle.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getLatLng, register } from "@/api";
import ToastNotification from "@/components/toast/ToastNotification";
import AddressInput from "@/components/input/AddressInput";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import the eye icons
import { Errors } from "@/types";
const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    address: "",
    latitude: "",
    longitude: "",
    role_id: 2, // Default is customer
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    keyword: "SUCCESS" | "ERROR" | "INFO" | "WARNING";
  }>({
    message: "",
    keyword: "INFO",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.name) newErrors.name = "Họ và tên không được để trống.";
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
    if (formData.password_confirmation !== formData.password) {
      newErrors.password_confirmation = "Mật khẩu xác nhận không khớp.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      setLoading(true);
      const location = await getLatLng(formData.address);
      if (location && location.lat && location.lng) {
        formData.latitude = location.lat;
        formData.longitude = location.lng;
        try {
          const response = await register(formData);
          console.log(response);
          // Check for response validity
          if (response) {
            setToast({ message: "Đăng ký thành công!", keyword: "SUCCESS" });
            setTimeout(() => {
              router.push("/login");
            }, 2000); // Delay before redirecting to login
          } else {
            setToast({
              message: "Đăng ký thất bại! Email đã tồn tại!",
              keyword: "ERROR",
            });
          }
        } catch (error: any) {
          console.error("Error:", error.response?.data || error.message);
          setToast({
            message: "Đăng ký thất bại. Vui lòng thử lại!",
            keyword: "ERROR",
          });
        } finally {
          setLoading(false);
        }
      } else {
        setToast({
          message: "Địa chỉ không hợp lệ. Vui lòng kiểm tra lại.",
          keyword: "ERROR",
        });
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  return (
    <motion.div
      className="flex flex-col md:flex-row w-full min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Section - Image */}
      <motion.div
        className="relative flex-1 left-box"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>
      <div className="flex items-center justify-center flex-1 bg-white">
        {/* Form Box */}
        <motion.div
          className="w-full max-w-md bg-white rounded-lg p-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={bgIcon.src}
            width={300}
            height={300}
            alt="background login image"
            className="bg-image hidden lg:block absolute right-[-300px]"
          />
          <Image
            src={bgIcon.src}
            width={300}
            height={300}
            alt="background login image"
            className="bg-image hidden lg:block absolute left-[-300px] bottom-0"
          />
          <h1 className="text-4xl font-bold text-gray-800">
            Eco<span className="text-primary-light">Save</span>
          </h1>
          <p className="text-center text-sm text-gray-500 mb-4">
            Bằng cách tiếp tục, bạn cho biết rằng bạn đã đọc và đồng ý với{" "}
            <Link href="/terms" className="text-primary">
              Điều khoản sử dụng
            </Link>
          </p>
          {/* Google Login Button */}
          <div className="mb-4">
            <LoginWithGoogleButton />
          </div>
          <p className="text-center text-sm text-gray-500 mb-4">
            Hoặc đăng ký với
          </p>
          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">{errors.name}</span>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Nhập email"
                value={formData.email}
                autoComplete="off"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email}</span>
              )}
            </div>
            <div>
              <AddressInput setFormData={setFormData} />
              {errors.address && (
                <span className="text-red-500 text-xs">{errors.address}</span> // Hiển thị lỗi nếu có
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5 text-gray-600" />
                ) : (
                  <FiEye className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password}</span>
              )}
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirmation"
                placeholder="Xác nhận mật khẩu"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="w-5 h-5 text-gray-600" />
                ) : (
                  <FiEye className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {errors.password_confirmation && (
                <span className="text-red-500 text-xs">
                  {errors.password_confirmation}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </form>
          <div className="text-center text-sm text-gray-500 mt-4">
            Bạn đã có tài khoản?
            <Link href="/login" className="text-primary">
              Đăng nhập
            </Link>
          </div>
        </motion.div>
      </div>
      {/* Toast Notification */}
      {toast.message && (
        <ToastNotification message={toast.message} keyword={toast.keyword} />
      )}
    </motion.div>
  );
};
export default Register;
