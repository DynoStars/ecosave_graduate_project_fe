import React from "react";
// import Home from "./home/Home";

// import Map from "../components/Map";
import SearchComponent from "../components/Search";

import { generateMetadata } from "@/utils";
// import { fetchFoods } from "./home/page";
// import { Product } from "@/types";
export const metadata = generateMetadata("", "Welcome to LayRestaurant, the best platform for booking food and rooms");

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
      <h1>EcoSave Homepage welcome!</h1>
      {/* <Map /> */}

    </>
  );
}
