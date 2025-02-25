import { Metadata } from "next";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import LOGO from '../assets/images/logo/LOGO.png';

export const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;


/**
 * Formats a number with commas as thousand separators.
 * @param {number} number The number to format.
 * @returns {string} The formatted number.
 */
export function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Generates metadata for a page.
 * @param {string} pageTitle The title of the page.
 * @param {string} pageDescription The description of the page.
 * @returns {Metadata} The generated metadata.
 */
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
      icon: LOGO.src, // Use the .src property for the URL path
    },
  };
}


/**
 * Returns the headers for API requests.
 * @returns {object} The headers.
 */
export function headerAPI() {
  const token: string | unknown = localStorage.getItem("__token__");
  console.log(token);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return headers;
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} string The string to capitalize.
 * @returns {string} The capitalized string.
 */
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Formats a date.
 * @param {Date | null} date The date to format.
 * @returns {string} The formatted date.
 */
export const formatDate = (date: Date | null) => {
  return date ? date.toLocaleDateString() : "N/A";
};

/**
 * Converts a total context state to a number.
 * @param {object} contextState The context state.
 * @returns {number} The converted number.
 */
export function convertTotalContextStateToNumber(contextState: {
  totalAmount: string | number | null;
}): number {
  const { totalAmount } = contextState;
  // Check if totalAmount is a number and return it, or convert from string
  if (typeof totalAmount === "number") {
    return totalAmount;
  } else if (typeof totalAmount === "string") {
    const parsedNumber = parseFloat(totalAmount);
    if (!isNaN(parsedNumber)) {
      return parsedNumber;
    }
  }
  // Return 0 or handle default case if totalAmount is null or cannot be converted
  return 0;
}

/**
 * Generates a random string.
 * @param {number} length The length of the string.
 * @returns {string} The generated string.
 */
export const generateRandomString = (length = 2) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * Extracts an order number from a string.
 * @param {string} inputString The string to extract from.
 * @returns {string | null} The extracted order number or null if not found.
 */
export const extractOrderNumber = (inputString: string) => {
  // Đoạn chuỗi cố định là "OD", lấy vị trí bắt đầu của "OD"
  const prefix = 'OD';
  const index = inputString.indexOf(prefix);

  // Nếu không tìm thấy "OD", trả về null
  if (index === -1) {
    return null;
  }

  // Trả về phần chuỗi sau "OD"
  return inputString.substring(index + prefix.length);
};

/**
 * Converts a string to a static import.
 * @param {string | undefined} value The string to convert.
 * @returns {StaticImport | string} The converted static import or an empty string if null or undefined.
 */
export function convertToStaticImport(value: string | undefined): StaticImport | string {
  if (value === undefined && value === null) {
    return '';
  }

  // Convert string to unknown first, then to StaticImport
  return (value as unknown) as StaticImport;
}

export const NAME_RETAURANT: string = process.env.NAME_RETAURANT || 'Ecosave';
// export const LOGO: string = process.env.LOGO || iconPath.src;

export const CURRENCY_UNIT: string = process.env.CURRENCY_UNIT || 'vnd';

/**
 * Formats money according to the currency unit.
 * @param {number} money The money to format.
 * @param {string} currency The currency unit.
 * @returns {string} The formatted money.
 */
export const formatMoney = (money: number, currency: string = CURRENCY_UNIT): string => {
  // Làm tròn số tiền để loại bỏ phần thập phân
  const roundedMoney = Math.round(money);

  // Nếu đơn vị tiền không phải VND, nhân số tiền lên 1000
  const adjustedMoney = currency.toLowerCase() !== 'vnd' ? roundedMoney  : roundedMoney;

  // Định dạng số tiền theo chuẩn Việt Nam, không có phần thập phân
  const formattedMoney = new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(adjustedMoney);

  // Thêm đơn vị tiền tệ vào cuối chuỗi kết quả
  return `${formattedMoney} ${currency}`;
};

export const formatCurrency = (amount: string | number) => {
  if (typeof amount === "string") {
    // Chuẩn hóa chuỗi số từ định dạng '2.238,944' thành '2238.944'
    const normalizedAmount = amount.replace(/\./g, "").replace(",", ".");
    const parsedAmount = parseFloat(normalizedAmount);

    if (isNaN(parsedAmount)) return "0đ"; // Trả về "0đ" nếu chuỗi không hợp lệ
    amount = parsedAmount;
  }

  // Chia cho 100 nếu cần thiết (theo logic cũ) và loại bỏ phần thập phân
  const formattedAmount = Math.floor(amount / 100).toLocaleString("vi-VN");

  return `${formattedAmount}đ`;
};



/**
 * Gets the URL for updating a user's image.
 * @param {File} file The file to upload.
 * @returns {Promise<string>} The URL of the uploaded image.
 */
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

  // Lấy giờ và phút theo định dạng 12 giờ (AM/PM)
  const hours = now.getHours() % 12 || 12; // Chuyển 0 giờ thành 12
  const minutes = now.getMinutes().toString().padStart(2, "0"); // Định dạng 2 chữ số
  const ampm = now.getHours() >= 12 ? "PM" : "AM";

  // Lấy ngày, tháng, năm
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = now.getFullYear();

  return `${hours}:${minutes} ${ampm} ${day}/${month}/${year}`;
};
