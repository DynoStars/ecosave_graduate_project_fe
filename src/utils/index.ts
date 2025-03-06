import { Metadata } from "next";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import LOGO from '../assets/images/logo/LOGO.png';
export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
export function generateMetadata(pageTitle: string, pageDescription: string): Metadata {
  const defaultTitle = NAME_RETAURANT;
  return {
    title: {
      default: defaultTitle,
      template: pageTitle ? `%s | ${NAME_RETAURANT}` : defaultTitle,
      absolute: pageTitle ? `${pageTitle} | ${NAME_RETAURANT}` : defaultTitle,
    },
    description: pageDescription,
    icons: {
      icon: LOGO.src,
    },
  };
}
export function headerAPI() {
  const token: string | unknown = localStorage.getItem("__token__");
  console.log(token);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return headers;
}
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const formatDate = (date: Date | null) => {
  return date ? date.toLocaleDateString() : "N/A";
};
export function convertTotalContextStateToNumber(contextState: {
  totalAmount: string | number | null;
}): number {
  const { totalAmount } = contextState;
  if (typeof totalAmount === "number") {
    return totalAmount;
  } else if (typeof totalAmount === "string") {
    const parsedNumber = parseFloat(totalAmount);
    if (!isNaN(parsedNumber)) {
      return parsedNumber;
    }
  }
  return 0;
}
export const generateRandomString = (length = 2) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const extractOrderNumber = (inputString: string) => {
  const prefix = 'OD';
  const index = inputString.indexOf(prefix);
  if (index === -1) {
    return null;
  }
  return inputString.substring(index + prefix.length);
};
export function convertToStaticImport(value: string | undefined): StaticImport | string {
  if (value === undefined && value === null) {
    return '';
  }
  return (value as unknown) as StaticImport;
}
export const NAME_RETAURANT: string = process.env.NAME_RETAURANT || 'Ecosave';
export const CURRENCY_UNIT: string = process.env.CURRENCY_UNIT || 'vnd';
export const formatMoney = (money: number, currency: string = CURRENCY_UNIT): string => {
  const roundedMoney = Math.round(money);
  const formattedMoney = new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(roundedMoney);
  return `${formattedMoney} ${currency}`;
};
export const formatCurrency = (amount: string | number) => {
  if (typeof amount === "string") {
    const normalizedAmount = amount.replace(/\./g, "").replace(",", ".");
    const parsedAmount = parseFloat(normalizedAmount);
    if (isNaN(parsedAmount)) return "0đ";
    amount = parsedAmount;
  }
  const formattedAmount = Math.floor(amount / 100).toLocaleString("vi-VN");
  return `${formattedAmount}đ`;
};
export const getUrlUpdateUserImg = async (file: File) => {
  const CLOUD_NAME = "dugeyusti";
  const PRESET_NAME = "expert_upload";
  const FOLDER_NAME = "BitStorm";
  const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append("upload_preset", PRESET_NAME);
  formData.append("folder", FOLDER_NAME);
  formData.append("file", file);
  const options = {
    method: "POST",
    body: formData,
  };
  try {
    const res = await fetch(api, options);
    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
export const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const day = date.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return `${time} ${day}`;
};
export const getCurrentDateTime = () => {
  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = now.getHours() >= 12 ? "PM" : "AM";
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();
  return `${hours}:${minutes} ${ampm} ${day}/${month}/${year}`;
};