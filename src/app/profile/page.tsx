"use client";
import { useState, useEffect } from "react";
import Header from "@/components/userProfile/header";
import ProfileCard from "@/components/userProfile/profile-card";
import UserInfoSection from "@/components/userProfile/user-info-section";
import { fetchUser } from "@/api";
import { UserProfile } from "@/types";
import Loading from "../loading";

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const data = await fetchUser(); 
        console.log("user profile: ",data)
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

  if (loading) {
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

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Header name={userData.username.split(" ")[0]} />
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <ProfileCard userData={userData} />
          <UserInfoSection userData={userData} />
        </div>
      </div>
    </div>
  );
}
