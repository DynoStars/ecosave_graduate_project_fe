// isLogin.ts
export const isLogin = (): boolean => {
    if (typeof window !== "undefined") {
      // This is the client side
      const isLogin = document.cookie.includes("isLogin=true"); // Access cookies in the client
      return isLogin;
    }

    // If on the server side, use next/headers
    if (typeof cookies !== "undefined") {
      const isLogin = cookies().get("isLogin")?.value;
      return isLogin ? true : false;
    }

    return false;
  };
