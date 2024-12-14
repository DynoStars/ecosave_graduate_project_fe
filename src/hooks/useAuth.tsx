// hooks/useAuthCheck.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const useAuthCheck = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);
};

export default useAuthCheck;
