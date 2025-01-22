import { useState, useRef } from "react";
import { FaSearch, FaHeart, FaBell } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import "./NavBar.css";
import Link from "next/link";
import menuItemsData from "../../../assets/json/menuItems.json";

const Navbar: React.FC = () => {
  // Lấy dữ liệu từ JSON
  const [menuItems] = useState<{ [key: string]: string }>(
    menuItemsData.menuItems1
  );
  const [menuIcons] = useState<{ [key: string]: string }>(
    menuItemsData.menuItems2
  );

  const [active, setActive] = useState<number>(0);
  const [searchActive, setSearchActive] = useState<boolean>(false); // State để quản lý tìm kiếm
  const menuRefs = useRef<(HTMLLIElement | null)[]>([]); // Lưu vị trí từng mục menu

  // Map icon tương ứng với key từ menuItems2
  const icons: { [key: string]: JSX.Element } = {
    Notification: <FaBell />,
    Wishlist: <FaHeart />,
    Cart: <MdShoppingCart />,
    // Profile: <IoPersonCircle />,
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
      className={`shadown hidden lg:flex items-center justify-between w-full px-6 py-4 bg-white shadow-md ${
        searchActive ? "higher" : ""
      }`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-bold text-primary">
          Fast<span className="text-gray-800">kart.</span>
        </h1>
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
                // Increased font size
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
        {/* Tìm kiếm */}
        <div className="relative">
          <button
            onClick={() => setSearchActive(!searchActive)}
            className="bg-orange-500 p-4 rounded"
          >
            {/* Increased button padding */}
            <FaSearch className="text-white cursor-pointer hover:text-primary-light transition-colors duration-300 text-xl" />
          </button>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className={`search-input text-secondary-dark ${
              searchActive ? "open" : ""
            }`}
          />
        </div>

        {/* Menu Icons từ menuItems2 */}
        {Object.keys(menuIcons).map((key) => (
          <Link href={links[key]} key={key}>
            <div className="text-gray-600 cursor-pointer hover:text-primary-light transition-colors duration-300 text-xl">
              {icons[key]}
            </div>
          </Link>
        ))}

        {/* Tài khoản */}
        <Link href={links.Profile}>
          <div className="flex items-center space-x-2 cursor-pointer hover:text-primary-light transition-colors duration-300">
            <IoPersonCircle className="text-gray-600 text-3xl" />
            <div>
              <p className="text-gray-600 text-sm">Hello,</p>
              <p className="text-gray-800 font-semibold text-lg">
                {menuIcons.Profile}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
