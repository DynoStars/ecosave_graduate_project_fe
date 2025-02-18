// Header.tsx
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar/NavBar";
import { FaHeart, FaBell, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import menuItemsData from "../../assets/json/menuItems.json"; // Adjust the path based on your project structure
import defaultAvatar from "../../assets/images/users/userAvata1.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // Assuming you have a root state type
import Image from "next/image";
import { MdShoppingCart } from "react-icons/md";
import { fetchUserInfo } from "@/api";
import { setUser } from "@/redux/userSlice";
interface HeaderProps {
  checkLogin: boolean;
}

const Header: React.FC<HeaderProps> = ({ checkLogin }) => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [language, setLanguage] = useState("English");
  const { user } = useSelector((state: RootState) => state.user);
  // Define menuItems as an object
  const [menuItems] = useState<{ [key: string]: string }>(
    menuItemsData.menuItems1
  );
  useEffect(() => {
    const fetchUser = async () => {
      // Kiểm tra nếu thông tin người dùng chưa có trong Redux
      if (!user) {
        const token = localStorage.getItem('access_token');
        if (token) {
          try {
            const userInfo = await fetchUserInfo(token);  // Gọi API để lấy thông tin người dùng
            console.log(userInfo)
            dispatch(setUser(userInfo));  // Cập nhật Redux store với thông tin người dùng
          } catch (error) {
            console.error("Error fetching user info:", error);
          }
        }
      }
    };
    fetchUser();  // Gọi hàm bất đồng bộ bên trong useEffect
  }, [dispatch, user]);
  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Top Header */}
      <div className="hidden lg:flex items-center justify-between bg-primary text-white px-6 text-xsm">
        <p>{user?.address || "99 Tô Hiến Thành - DN"}</p>
        <div className="flex items-center space-x-4">
           Tiếng Việt
        </div>
      </div>
      {/* Desktop Navbar */}
      <Navbar user={user} checkLogin={checkLogin} />
      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between px-2 py-4 shadow-md">
        {/* Menu Icon */}
        <FaBars
          className="text-gray-600 text-xl cursor-pointer"
          onClick={toggleSidebar}
        />
        <h1 className="text-2xl font-bold text-primary">
          Eco<span className="text-gray-800">Save</span>
        </h1>
        <div className="flex items-center space-x-4">
          <Link href="/notifications">
            <p>
              <FaBell className="text-gray-600 relative cursor-pointer hover:text-primary">
                <span className="absolute top-0 right-0 bg-error text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </FaBell>
            </p>
          </Link>
          <Link href="/favorites">
            <p>
              <FaHeart className="text-gray-600 cursor-pointer hover:text-primary" />
            </p>
          </Link>
          <Link href="/cart">
            <p>
              <MdShoppingCart className="text-gray-600 cursor-pointer hover:text-primary" />
            </p>
          </Link>
        </div>
      </div>
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-opacity-50 z-40 transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <span className="text-lg font-bold text-primary-light">Menu</span>
          <button onClick={toggleSidebar}>
            <FaTimes className="text-2xl text-gray-600" />
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-4 text-gray-700">
          {Object.entries(menuItems).map(([key, label]) => (
            <Link key={key} href={`/${key.toLowerCase()}`}>
              <p className="hover:text-primary-light">{label}</p>
            </Link>
          ))}
          <Link href="/account">
            <div className="flex items-center space-x-2 cursor-pointer hover:text-primary-light transition-colors duration-300">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={user?.avatar || defaultAvatar} // Fallback to default if avatar is null
                  width={40} // Set the width to 40px
                  height={40} // Set the height to 40px
                  alt="avatar user"
                  className="object-cover" // Ensures the image covers the circle without distortion
                />
              </div>
              <div>
                <p className="text-gray-800 font-semibold text-lg">
                  {user?.username || "Customer"} {/* Display the user's name */}
                </p>
              </div>
            </div>
          </Link>
        </nav>
      </aside>
    </header>
  );
};
export default Header;
