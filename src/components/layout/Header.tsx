"use client";
import React, { useState } from "react";
import Navbar from "./navbar/NavBar";
import { FaSearch, FaHeart, FaBell, FaBars, FaTimes } from "react-icons/fa";
import SelectInputProps from "../select/SelectInputProps"; // Import SelectInputProps component
import { SelectChangeEvent } from "@mui/material";
import Link from "next/link";
import menuItemsData from '../../assets/json/menuItems.json'; // Adjust the path based on your project structure

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Define menuItems as an object
  const [menuItems] = useState<{ [key: string]: string }>(menuItemsData.menuItems1);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle search input
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Handle language change
  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <header className="shadown">
      {/* Top Header */}
      <div className="hidden lg:flex items-center justify-between bg-primary text-white px-6 py-2 text-sm">
        <p>1418 Riverwood Drive, CA 96052, US</p>
        <div className="flex items-center space-x-4">
          <SelectInputProps
            label="Language"
            options={["English", "Vietnamese"]}
            value={language}
            onChange={handleLanguageChange}
          />
        </div>
      </div>

      {/* Desktop Navbar */}
      <Navbar />

      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-4 bg-white shadow-md">
        {/* Menu Icon */}
        <FaBars
          className="text-gray-600 text-xl cursor-pointer"
          onClick={toggleSidebar}
        />
        <h1 className="text-2xl font-bold text-primary">
          Fast<span className="text-gray-800">kart.</span>
        </h1>
        <div className="flex items-center space-x-4">
          <FaSearch className="text-gray-600" onClick={toggleSearch} />
          <FaBell className="text-gray-600 relative">
            <span className="absolute top-0 right-0 bg-error text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </FaBell>
          <FaHeart className="text-gray-600" />
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="lg:hidden px-4 py-2">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
          />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-0  bg-opacity-50 z-40 transition-opacity ${
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
        </nav>
      </aside>
    </header>
  );
};

export default Header;
