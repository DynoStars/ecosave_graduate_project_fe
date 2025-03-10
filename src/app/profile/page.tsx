"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Header from "@/components/userProfile/header";
import ProfileCard from "@/components/userProfile/profile-card";
import UserInfoSection from "@/components/userProfile/user-info-section";
import { fetchUser, logout } from "@/api";
import { UserProfile } from "@/types";
import Loading from "../loading";
import Link from "next/link";
import { ClipboardList, Package, Heart, LogOut } from "lucide-react";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false); // 🆕 State để xử lý loading khi logout

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const data = await fetchUser();
        console.log("user profile: ", data);
        if (!data) {
          throw new Error("Không thể tải thông tin của bạn");
        }
        setUserData(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Không thể tải dữ liệu người dùng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true); // 🆕 Hiển thị loading khi logout bắt đầu
    await logout(dispatch);
    setLogoutLoading(false); // 🆕 Dừng loading sau khi logout xong
    router.push("/login");
  };

  if (loading || logoutLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-sm max-w-md w-full">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Lỗi</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Header name={userData.username.split(" ")[0]} />
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <ProfileCard userData={userData} />
          <UserInfoSection userData={userData} />

          {/* Additional Link Section - Inside the white card */}
          <div className="p-6 border-t border-gray-100">
            <Link
              href="/order-history"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Xem lịch sử đơn hàng</p>
                <p className="text-sm text-gray-500">Xem lại hóa đơn và chi tiết các đơn hàng của bạn</p>
              </div>
            </Link>
            <Link
              href="/expiry-items-reminder"
              className="flex items-center gap-3 p-4 mt-2 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Xem kho sản phẩm</p>
                <p className="text-sm text-gray-500">Xem lại kho sản phẩm nhắc nhở ngày hết hạn</p>
              </div>
            </Link>
            <Link
              href="/favorite-products"
              className="flex items-center gap-3 p-4 mt-2 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Xem sản phẩm yêu thích</p>
                <p className="text-sm text-gray-500">Nhanh chóng xem lại những sản phẩm yêu thích để tránh hết hàng</p>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="flex items-center gap-3 p-4 mt-2 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors w-full text-left"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <LogOut className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {logoutLoading ? "Đang đăng xuất..." : "Đăng xuất tài khoản"}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
