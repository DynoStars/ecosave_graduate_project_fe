import React from "react";
import { Link } from "@mui/material";

import MainLogo from "../logo/MainLogo";
const Footer = () => {
  return (
    <footer className="w-full bg-white text-black py-6">
      <div className="relative p-4 bg-white">
        <hr className="my-4 border-gray-700" />
        <div className="container mx-auto flex flex-col items-center justify-between sm:flex-row">
          <div className="mb-4 sm:mb-0">
            <span className="text-2xl font-bold flex justify-start items-center flex-wrap">
              <MainLogo />
              LayRestaurant
            </span>
          </div>

        </div>
        <hr className="my-4 border-gray-700" />
        <div className="container mx-auto grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <span className="text-md mb-2 block font-medium uppercase">
              Explore
            </span>
            <Link
              href="/"
              className="block mb-2 text-sm hover:text-blue-400 decoration-white"
            >
              Home
            </Link>
            <Link
              href="/rooms"
              className="block mb-2 text-sm hover:text-blue-400 decoration-white"
            >
              Rooms
            </Link>
            <Link
              href="/foods"
              className="block mb-2 text-sm hover:text-blue-400 decoration-white"
            >
              Foods
            </Link>
            <Link
              href="/about"
              className="block mb-2 text-sm hover:text-blue-400 decoration-white"
            >
              About
            </Link>
            <Link
              href="/messages"
              className="block mb-2 text-sm hover:text-blue-400 decoration-white"
            >
              Messages
            </Link>
          </div>
          <div>
            <span className="text-md mb-2 block font-medium uppercase">
              About Us
            </span>
            <Link
              href="/about"
              className="block mb-2 text-sm hover:text-blue-400"
            >
              Our Story
            </Link>
            <Link
              href="/team"
              className="block mb-2 text-sm hover:text-blue-400"
            >
              Team
            </Link>
            <Link
              href="/careers"
              className="block mb-2 text-sm hover:text-blue-400"
            >
              Careers
            </Link>
          </div>
          <div>
            <span className="text-md mb-2 block font-medium uppercase">
              Support
            </span>
            <Link
              href="/support"
              className="block mb-2 text-sm hover:text-blue-400"
            >
              Help Center
            </Link>
            <Link
              href="/contact"
              className="block mb-2 text-sm hover:text-blue-400"
            >
              Contact Us
            </Link>
          </div>
          <div>
            <span className="text-md mb-2 block font-medium uppercase">
              Legal
            </span>
            <Link
              href="/privacy-policy"
              className="block mb-2 text-sm hover:text-blue-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="block mb-2 text-sm hover:text-blue-400"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
