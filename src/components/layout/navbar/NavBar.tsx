"use client";
import { useState, useRef } from "react";
import { FaHeart, FaBell } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import "./NavBar.css";
import Link from "next/link";
import menuItemsData from "../../../assets/json/menuItems.json";
import { UserProfile } from "@/types";
import Image from "next/image";
import defaultAvatar from "../../../assets/images/users/userAvata1.png";
import LOGO from "../../../assets/images/logo/LOGO.png";
export interface NavbarProps {
  user: UserProfile | null; // Allow user to be null
  checkLogin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ user, checkLogin }) => {
  // Lấy dữ liệu từ JSON
  const [menuItems] = useState<{ [key: string]: string }>(
    menuItemsData.menuItems1
  );
  const [menuIcons] = useState<{ [key: string]: string }>(
    menuItemsData.menuItems2
  );


  const [active, setActive] = useState<number>(0);
  const menuRefs = useRef<(HTMLLIElement | null)[]>([]); // Lưu vị trí từng mục menu

  // Map icon tương ứng với key từ menuItems2
  const icons: { [kes: string]: JSX.Element } = {
    Notification: <FaBell />,
    Wishlist: <FaHeart />,
    Cart: <MdShoppingCart />,
  };

  // Map các đường dẫn tương ứng
  const links: { [key: string]: string } = {
    Notification: "/notifications",
    Wishlist: "/favorites",
    Cart: "/cart",
    Profile: "/account",
  };

  return (
    <nav
      className={` hidden lg:flex items-center justify-between w-full px-6 py-2 shadow-md`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-4 justify-normal">
        <h1 className="text-3xl font-bold text-primary">
          Eco<span className="text-gray-800">Save</span>
        </h1>
        <Image
          src={LOGO.src}
          alt="Logo"
          width={50}
          height={50}
          className="object-contain"
        />
      </div>

      {/* Menu items */}
      <div className="flex-grow flex justify-center relative">
        <ul className="flex space-x-8 text-gray-600 relative">
          {Object.entries(menuItems).map(([key, label], index) => (
            <li
              key={key}
              ref={(el) => {
                menuRefs.current[index] = el;
              }}
              onClick={() => setActive(index)}
              className={`cursor-pointer transition-colors duration-300 text-lg ${
                active === index ? "text-primary" : "hover:text-primary-light"
              }`}
            >
              <Link href={`/${key.toLowerCase()}`} passHref>
                <p>{label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-6">
        {user &&
          Object.keys(menuIcons).map((key) => (
            <Link href={links[key]} key={key}>
              <div className="text-gray-600 cursor-pointer hover:text-primary-light transition-colors duration-300 text-xl">
                {icons[key]}
              </div>
            </Link>
          ))}

        {/* Tài khoản hoặc Buttons nếu không có user */}
        {user ? (
          <Link href={links.Profile}>
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
                <p className="text-gray-600 text-sm">Hello</p>
                <p className="text-gray-800 font-semibold text-lg">
                  {user?.username || "Guest"} {/* Fallback username */}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex space-x-4">
            <Link href="/login">
              <button className="bg-orange-500 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-orange-600">
                Đăng nhập
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-primary text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-primary-dark">
                Đăng ký
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
