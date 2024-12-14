"use client";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import { useTheme } from "next-themes";
import BannerTopImage from "../../assets/images/TopBanner.png";
import HeartIcon from "../../assets/images/HeartIcon.png";
import FirstBgIcon from "../../assets/images/icons/Orange.png";
import SecondBgIcon from "../../assets/images/icons/Mint.png";
import GridBg from "../../assets/images/icons/BgGrid.png";
import HomePageCartRestaurant from "@/components/cart/HomePageCartRestaurant";
import FirstFoodImage from "../../assets/images/FirtFood.png";
import SecondFoodImage from "../../assets/images/SecondFood.png";
import ThirthFoodImage from "../../assets/images/ThirthFood.png";
import ForFoodImage from "../../assets/images/ForthFood.png";
import Settings from "@/components/pages/Settings";
import CartShop from "@/components/cart/CartShop";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useEffect, useRef } from "react";

import { Product } from "@/types";
import { useTranslation } from "react-i18next";

// ];
interface SettingsProps {
  listFoods: Product[]; // This prop is an array of Product
}
const Home: React.FC<SettingsProps> = ({ listFoods }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const CardRestaurant = [
    {
      imageUrl: FirstFoodImage,
      discount: "-40%",
      title: t("restaurants.chefBurgersLondon"),
      restaurant: t("restaurants.restaurantLabel"),
    },
    {
      imageUrl: SecondFoodImage,
      discount: "-20%",
      title: t("restaurants.grandAiCafeLondon"),
      restaurant: t("restaurants.restaurantLabel"),
    },
    {
      imageUrl: ThirthFoodImage,
      discount: "-17%",
      title: t("restaurants.butterbrotCafeLondon"),
      restaurant: t("restaurants.restaurantLabel"),
    },
    {
      imageUrl: ForFoodImage,
      discount: "-17%",
      title: t("restaurants.butterbrotCafeLondon"),
      restaurant: t("restaurants.restaurantLabel"),
    },
  ];
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (scrollRef.current) {
        const maxScrollLeft =
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        if (scrollRef.current.scrollLeft >= maxScrollLeft) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 410, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:container md:mx-auto w-full">
      <div className="flex-1 p-4 sm:p-8 w-full">
        <div className="bg-white w-full sm:h-[80vh] h-auto flex flex-row gap-3 p-5 justify-between items-center flex-wrap sm:flex-nowrap">
          <div className="relative flex flex-col justify-center items-center sm:items-start w-full sm:w-[50%]  space-y-4 sm:pl-10 ">
            <Image
              width={100}
              height={100}
              src={FirstBgIcon}
              alt="Top Icon"
              className="absolute top-0 right-0"
            />
            <Image
              width={100}
              height={100}
              src={SecondBgIcon}
              alt="Top Icon"
              className="absolute bottom-0 left-0"
            />
            <div className="flex items-center space-x-2 " data-aos="fade-right">
              <Image
                width={24}
                height={24}
                src={HeartIcon}
                alt="Top Icon"
                className="bg-pink-400 p-2 rounded-full"
              />
              <p className="text-sm text-gray-500">{t("home.peopleTrustUs")}</p>
            </div>
            <h1
              data-aos="fade-right"
              className="text-5xl text-center sm:text-start  sm:text-7xl font-bold text-gray-800"
            >
              {t("home.weAreSerious")}{" "}
              <span className="text-red-500">Serious</span>{" "}
              {t("home.foodDelivery")}
            </h1>
            <p
              data-aos="fade-right"
              className="text-lg text-center sm:text-start sm:text-xl text-gray-600"
            >
              {t("home.bestCooks")}
            </p>
          </div>
          <div
            className="w-full relative flex items-center justify-center sm:w-1/2"
            data-aos="fade-left"
          >
            <Image
              width={300}
              height={300}
              src={GridBg}
              alt="Top Icon"
              className="absolute top-0 right-0"
            />
            <Image
              width={600}
              height={500}
              src={BannerTopImage}
              alt="Top banner"
              className="object-contain"
            />
          </div>
        </div>
        <div
          className={`${theme} flex items-center justify-between p-4 w-full sm:text-2xl`}
        >
          <div
            className="flex items-center space-x-2 sm:text-2xl"
            data-aos="fade-up"
          >
            <span
              className="sm:text-2xl font-bold text-black"
              data-aos="fade-up"
            >
              {t("home.exclusiveDeals")}
            </span>
          </div>
          <div className="flex items-center space-x-4" data-aos="fade-up">
            <button
              data-aos="fade-up"
              className="text-orange-600 border border-orange-600 px-4 py-1 rounded-full flex items-center"
            >
              <ArrowRightAltIcon />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className={`${theme} sm:gap-3 gap-5 flex items-center justify-between p-3  w-auto overflow-x-auto scrollbar-hide scroll-smooth overflow-hidden`}
        >
          {CardRestaurant.map((cart, index) => (
            <HomePageCartRestaurant
              key={index}
              imageUrl={cart.imageUrl}
              discount={cart.discount}
              title={cart.title}
              restaurant={cart.restaurant}
            />
          ))}
        </div>
        <div
          className={`${theme} sm:gap-3 gap-5 flex items-center justify-between w-full flex-wrap`}
        >
          <Settings listFoods={listFoods} />
        </div>
        <div
          className={`${theme} flex items-center justify-between  py-12 p-4 w-full flex-wrap`}
        >
          <div className="flex items-center">
            <span className="text-2xl font-bold text-black ">
              {t("home.popularRestaurants")}
            </span>
          </div>
        </div>
        <div
          className={`${theme} sm:gap-3 gap-5 flex items-center justify-between p-3  w-auto overflow-x-auto scrollbar-hide scroll-smooth overflow-hidden`}
        >
          {CardRestaurant.map((cart, index) => (
            <HomePageCartRestaurant
              key={index}
              imageUrl={cart.imageUrl}
              discount={cart.discount}
              title={cart.title}
              restaurant={cart.restaurant}
            />
          ))}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </main>
  );
};
export default Home;
