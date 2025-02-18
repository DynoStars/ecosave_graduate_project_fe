"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import loginImage from "../../../assets/images/auth/loginImage.png";
import Image from "next/image";
import bgIcon from "../../../assets/images/auth/bg-circle.png";
import "./login.css";
import { LoginProps } from "@/types";
import { logIn } from "@/api";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { signIn } from "next-auth/react";
import { loginErrors } from "../../../errorsCustome/loginErrors";
const Login = ({ csrf }: LoginProps) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [csrfToken] = useState<string>(csrf);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const isFormValid = !emailError && !passwordError && email && password;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email));
    setPasswordError(password.length < 6);

    if (isFormValid) {
      setLoading(true);
      setErrorMessage(null); // Reset previous errors
      try {
        const data = await logIn(email, password, csrfToken);
        const { access_token, refresh_token, user } = data;
        if (data) {
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          dispatch(setUser(user));
          // Set auth token in cookies
          document.cookie = `authToken=${access_token}; path=/; secure`;
          document.cookie = `isLogin=${true}; path=/; secure`;

          router.push("/"); // Redirect to homepage
        } else {
          // Thêm thông báo khi data không hợp lệ
          setErrorMessage("Dữ liệu không hợp lệ, vui lòng thử lại.");
        }
      } catch (error: any) {
        const errorCode: keyof typeof loginErrors.errors =
          error?.response?.status || 500; // Explicitly type errorCode
        const errorDetail =
          loginErrors.errors[errorCode] || loginErrors.errors["500"]; // Safely index into loginErrors
        setErrorMessage(`${errorDetail.customMessage}`); // Hiển thị thông báo lỗi từ customMessage
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signIn("google", { redirect: true });
      console.log("Sign in result:", result); // In ra toàn bộ đối tượng
      if (result) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };
  

  return (
    <div className="h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden relative">
      <Image
        src={bgIcon.src}
        width={300}
        height={300}
        alt="background login image"
        className="bg-image hidden lg:block"
      />
      <motion.div
        className="w-full lg:w-1/2 p-8 lg:p-16 flex justify-center relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:w-[70%] w-full">
          <div className="w-full flex flex-col justify-center text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Eco<span className="text-primary-light">Save</span>
            </h1>
            <h2 className="mt-4 text-2xl font-medium">Chào mừng bạn</h2>
            <p className="text-gray-600">Đăng nhập vào tài khoản</p>
          </div>
          <button
            onClick={handleSignInWithGoogle}
            className="mt-6 w-full flex items-center justify-center gap-2 py-3 border bg-white border-primary-light rounded-md hover:bg-gray-100"
          >
            <FaGoogle /> Tiếp tục với Google
          </button>
          <div className="mt-4 text-center text-gray-500">
            Hoặc tiếp tục với
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          <form className="mt-4 space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-red-500 text-sm">Email chưa chính xác</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  className={`mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? "Ẩn" : "Hiện"}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm">Mật khẩu chưa chính xác</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2" /> Ghi nhớ tài khoản
              </label>
              <Link
                href="/forgot-password"
                className="text-primary-light hover:underline"
              >
                Quên mật khẩu
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-light focus:ring-4 focus:bg-primary-light"
              disabled={!isFormValid || loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="text-primary-light hover:underline"
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </motion.div>
      <motion.div
        className="hidden lg:block w-full lg:w-1/2 h-full relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={loginImage.src}
          alt="Shopping Cart"
          className="w-full h-full object-cover"
          width={500}
          height={300}
        />
        <div className="absolute bottom-10 left-10 right-10 bg-white/80 p-4 rounded-lg shadow-lg">
          <h3 className="flex items-center gap-2 text-primary-light font-medium">
            <span>👍</span> Nhận được giảm giá tốt
          </h3>
          <p className="mt-2 text-gray-700">
            Ngày nay, chúng tôi tạo ra các giải pháp sáng tạo nhằm giải quyết
            những thách thức mà người tiêu dùng gặp phải trong cả cuộc sống và
            sự kiện hàng ngày của họ.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default Login;
