// app/page.tsx or app/login/page.tsx (depending on your route structure)

import React from 'react';
import LoginPage from './LoginPage'; // Assuming this is the login page component
import { getCSRF } from '@/api'; // Function to fetch CSRF token from your API

// Server Component to fetch the CSRF token
export default async function Page() {
  try {
    // Fetch the CSRF token on the server side
    const csrfToken = await getCSRF();
    console.log(csrfToken)

    // Return the LoginPage component with the fetched CSRF token
    return (
      <div>
        <LoginPage csrf={csrfToken} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return (
      <div>
        <p>Error loading CSRF token</p>
      </div>
    );
  }
}

// "use client";
// import React, { useEffect, useState } from "react";
// import { Form, Input, Button, Typography, message } from "antd";
// import { fetchCsrfToken, signInWeb } from "@/api";
// import { setStorage } from "@/utils";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { AppDispatch } from "@/redux/store";
// import { setToken } from "@/redux/authSlice";
// import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
// import { useTranslation } from "react-i18next";
// import Link from "next/link";
// import Image from "next/image";
// import LoginImage from "../../../assets/images/LoginImage.png";
// import GGIcon from "../../../assets/images/icons/GGIcon.png";
// import { signIn, useSession } from "next-auth/react";
// const LoginPage: React.FC = () => {
//   const { t } = useTranslation();
//   const [csrfToken, setCsrfToken] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();
//   const { data: session } = useSession();
//   useEffect(() => {
//     if (session && session.accessToken) {
//       // Clear any existing session before redirecting
//       dispatch(setToken(session.accessToken)); // saving the access token in Redux
//       setStorage("__token__", session.accessToken);
//       sessionStorage.removeItem("accessToken");
//       sessionStorage.clear();
//       router.push("/");
//     }
//   }, [session, dispatch, router]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = await fetchCsrfToken();
//         setCsrfToken(token);
//       } catch (error) {
//         console.error("Error fetching CSRF token:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const onFinish = async (values: { email: string; password: string }) => {
//     setLoading(true);
//     try {
//       const data = await signInWeb(values, csrfToken);
//       const { access_token, expires_in, user } = data;
//       const { status } = user;
//       if (status !== 0) {
//         dispatch(setToken(access_token)); // saving the access token in Redux
//         setStorage("__token__", access_token);
//         setStorage("expires_in", expires_in);
//         message.success(t("login.successMessage"));
//         document.cookie = `authToken=${access_token}; path=/; secure; httpOnly`;
//         router.push("/");
//       } else {
//         message.error(t("login.blockedMessage"));
//       }
//     } catch (error: any) {
//       console.error("Registration failed:", error);
//       const status = error.response?.status;
//       const errorMessages: { [key: number]: string } = {
//         401: t("login.errorMessage.incorrectCredentials"),
//         400: t("login.errorMessage.badRequest"),
//         403: t("login.errorMessage.forbidden"),
//         404: t("login.errorMessage.notFound"),
//       };

//       let errorMessage =
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

//   // const [signInResult, setSignInResult] = useState(null);

//   const handleSignInWithGoogle = async () => {
//     setLoading(true);
//     try {
//       const result = await signIn("google", { redirect: true });
//       console.log("Sign in result:", result); // In ra toàn bộ đối tượng
//       if (result) {
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error during sign in:", error);
//     }
//   };

//   return (
//     <div className=" w-screen">
//       <div className="p-6 flex justify-center w-full h-[95vh] items-center flex-row-reverse mt-2 flex-wrap-reverse gap-10">
//         <div className="hidden sm:flex w-1/2 items-center justify-center">
//           <Image
//             width={500}
//             height={500}
//             src={LoginImage}
//             alt="Register Image"
//           />
//         </div>
//         <div className="sm:w-1/3 w-full h-full flex flex-col justify-center gap-7 p-8">
//           <div className=" w-full p-3">
//             <h1 className="text-black text-3xl font-bold">WELCOME BACK!</h1>
//             <div className="mt-2">
//               <span className="text-black">{t("login.noAccount")}</span>{" "}
//               <Link
//                 href="/register"
//                 className="text-blue-500 hover:text-blue-700"
//               >
//                 {t("login.register")}
//               </Link>
//             </div>
//           </div>
//           <div>
//             <Form name="login" onFinish={onFinish} layout="vertical">
//               <Form.Item
//                 label={t("login.email")}
//                 name="email"
//                 className="mb-6"
//                 rules={[{ required: true, message: t("login.emailRequired") }]}
//               >
//                 <Input
//                   placeholder="deniel123@gmail.com"
//                   type="email"
//                   className="rounded-full bg-gray-200  p-3"
//                 />
//               </Form.Item>
//               <Form.Item
//                 label={t("login.password")}
//                 name="password"
//                 className="mb-6"
//                 rules={[
//                   { required: true, message: t("login.passwordRequired") },
//                 ]}
//               >
//                 <Input.Password
//                   iconRender={(visible) =>
//                     visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
//                   }
//                   placeholder="abcd123%4"
//                   visibilityToggle
//                   className="rounded-full bg-gray-200  p-3"
//                 />
//               </Form.Item>
//               <Form.Item>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   loading={loading}
//                   block
//                   className="rounded-full bg-blue-500 text-xl p-6"
//                 >
//                   {t("login.loginButton")}
//                 </Button>
//               </Form.Item>
//             </Form>
//           </div>

//           <div className="w-full -mt-10 flex flex-col gap-3">
//             <p className="text-center text-black ">Or continue with</p>
//             <div className=" w-full flex justify-center items-center gap-10 h-[80%]">
//               <Button onClick={handleSignInWithGoogle} className="w-96 h-full">
//                 <Image src={GGIcon} alt="Google Icon" width={30} height={30} />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
