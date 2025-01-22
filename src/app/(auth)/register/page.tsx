// "use client";
// import React, { useEffect, useState } from "react";
// import { Form, Input, Button, Typography, message } from "antd";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { AppDispatch } from "@/redux/store";
// import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
// import { useTranslation } from "react-i18next";
// import Link from "next/link";
// import { fetchCsrfToken, register } from "@/api";
// import Image from "next/image";
// import { signIn } from "next-auth/react";
// import LoginImage from "../../../assets/images/LoginImage.png";
// import GGIcon from "../../../assets/images/icons/GGIcon.png";

// const RegisterPage: React.FC = () => {
//   const { t } = useTranslation();
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();
//   const [csrfToken, setCsrfToken] = useState<string>("");

//   useEffect(() => {
//     fetchToken();
//   }, []);

//   const fetchToken = async () => {
//     try {
//       const token = await fetchCsrfToken();
//       setCsrfToken(token);
//     } catch (error) {
//       console.error("Error fetching CSRF token:", error);
//     }
//   };

//   const onFinish = async (values: any) => {
//     setLoading(true);
//     try {
//       await register(values, csrfToken);
//       message.success("Register successfully!");
//       router.push("/login");
//     } catch (error: any) {
//       console.error("Registration failed:", error);
//       const status = error.response?.status;
//       const errorMessages: { [key: number]: string } = {
//         401: t("login.errorMessage.incorrectCredentials"),
//         400: t("login.errorMessage.badRequest"),
//         403: t("login.errorMessage.forbidden"),
//         404: t("login.errorMessage.notFound"),
//       };
//       const errorMessage =
//         errorMessages[status] ||
//         (status >= 500
//           ? t("login.errorMessage.serverError")
//           : error.response?.data?.message ||
//             error.message ||
//             t("login.errorMessage.default"));
//       message.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignInWithGoogle = async () => {
//     setLoading(true);
//     try {
//       const result = await signIn("google", { redirect: false });
//       if (result?.ok) {
//         router.push("/login");
//       }
//     } catch (error) {
//       console.error("Error during sign in:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-screen">
//       <div className="p-6 flex justify-center w-full h-[95vh] items-center flex-row-reverse mt-2 flex-wrap-reverse gap-10">
//         <div className="hidden sm:flex w-1/2 items-center justify-center">
//           <Image
//             width={500}
//             height={500}
//             src={LoginImage}
//             alt="Register Image"
//             loading="lazy"
//           />
//         </div>
//         <div className="sm:w-1/3 w-full h-full flex flex-col justify-center gap-7 p-8">
//           <div className="w-full p-3">
//             <h1 className="text-black text-3xl font-bold">WELCOME !</h1>
//             {loading && <span>{t("login.loadingMessage")}</span>}
//             <div className="mt-2">
//               <span className="text-black">
//                 {t("login.alreadyHaveAccount")}
//               </span>{" "}
//               <Link href="/login" className="text-blue-500 hover:text-blue-700">
//                 Login
//               </Link>
//             </div>
//           </div>
//           <Form name="register" onFinish={onFinish} layout="vertical">
//             <Form.Item
//               label={t("login.email")}
//               name="email"
//               rules={[
//                 { required: true, message: t("login.emailRequired") },
//                 { type: "email", message: t("login.emailInvalid") },
//               ]}
//             >
//               <Input
//                 placeholder="Email address"
//                 className="rounded-full bg-gray-200 p-3"
//               />
//             </Form.Item>
//             <Form.Item
//               label={t("login.password")}
//               name="password"
//               rules={[
//                 { required: true, message: t("login.passwordRequired") },
//                 { min: 8, message: t("login.passwordMinLength") },
//               ]}
//             >
//               <Input.Password
//                 placeholder="Password (at least 8 characters)"
//                 iconRender={(visible) =>
//                   visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
//                 }
//                 className="rounded-full bg-gray-200 p-3"
//               />
//             </Form.Item>
//             <Form.Item
//               label={t("login.confirmPassword")}
//               name="password_confirmation"
//               dependencies={["password"]}
//               hasFeedback
//               rules={[
//                 {
//                   required: true,
//                   message: t("login.confirmPasswordRequired"),
//                 },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue("password") === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(
//                       new Error(t("login.passwordMismatch"))
//                     );
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password
//                 placeholder="Confirm password"
//                 className="rounded-full bg-gray-200 p-3"
//               />
//             </Form.Item>
//             <Form.Item name="role_id" initialValue={2} hidden>
//               <Input type="hidden" />
//             </Form.Item>
//             <Form.Item>
//               <Button
//                 loading={loading}
//                 type="primary"
//                 htmlType="submit"
//                 className="rounded-full bg-blue-500 text-xl w-full p-6"
//               >
//                 {t("login.register")}
//               </Button>
//             </Form.Item>
//           </Form>
//           <div className="w-full -mt-10 flex flex-col gap-3">
//             <p className="text-center text-black ">Or continue with</p>
//             <div className=" w-full flex justify-center items-center gap-10 h-[80%]">
//               <Button className="w-96 h-full" onClick={handleSignInWithGoogle}>
//                 <Image src={GGIcon} alt="Google Icon" width={24} height={24} />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

import React from 'react'
import Register from './Register'

export default function page() {
  return (
    <div>
      <Register />
    </div>
  )
}

