import React from "react";
// import Home from "./home/Home";

// import Map from "../components/Map";
import { generateMetadata } from "@/utils";
import Image from "next/image";
// import { fetchFoods } from "./home/page";
// import { Product } from "@/types";
export const metadata = generateMetadata(
  "",
  "Welcome to LayRestaurant, the best platform for booking food and rooms"
);
import Banner from "../assets/images/banner/mainBanner1.png";
export default async function HomePage() {
  // let foods: Product[] | null = null;

  // try {
  //   foods = await fetchFoods();
  // } catch (error) {
  //   console.error("Failed to fetch data:", error);
  //   return <div>Error fetching data. Please try again later.</div>;
  // }

  // if (!foods || foods.length === 0) {
  //   return <div>No foods available to display.</div>;
  // }

  return (
    <>
      {/* <Home listFoods={foods} /> */}
      <div className="w-screen">
        <Image src={Banner.src} width={2000} height={1000} alt="banner" />
      </div>
      {/* <Map /> */}
    </>
  );
}
