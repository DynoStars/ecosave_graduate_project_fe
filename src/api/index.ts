import { FormData } from '@/app/(auth)/register/Register';
import { ApiResponse, Category, OrderData, Product, ProductFilters, ProductScan, Store } from '@/types';
import getCookie from '@/utils/helpers/getCookie';
import axios from 'axios';
import { useState } from "react";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const MAP_KEY = process.env.NEXT_PUBLIC_MAP_KEY;
// Fetch the CSRF token
const getCSRF = async () => {
  try {
    const response = await axios.get(`${serverUrl}/csrf-token`); // Correct endpoint for CSRF token
    return response.data.csrf_token; // Return only the CSRF token
  } catch (error) {
    console.error('Error fetching CSRF token:', error); // Log error message or response data
    throw error; // Rethrow the error if you want it to be handled elsewhere
  }
};
// Perform login request
const logIn = async (email: string, password: string, csrfToken: string) => {
  try {
    const response = await axios.post(
      `${serverUrl}/login`,
      {
        email,
        password
      },
      {
        headers: {
          'X-CSRF-TOKEN': csrfToken, // Pass CSRF token as a header
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data; // Assuming the server sends user data upon successful login
  } catch (error) {
    console.error('Error during login:', error); // Log the error
    throw error; // Rethrow the error for handling elsewhere
  }
};
const fetchUserInfo = async (token: string) => {
  try {
    const response = await axios.get(`${serverUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  } catch (error) {
    throw error;
  }
}
async function getLatLng(address: string) {
  try {
    const response = await axios.get("https://rsapi.goong.io/geocode", {
      params: {
        address: address,
        api_key: MAP_KEY,
      },
    });
    const results = response.data.results;
    if (results && results.length > 0) {
      const { lat, lng } = results[0].geometry.location;
      return { lat, lng };
    } else {
      console.error("Không tìm thấy kết quả nào.");
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return null;
  }
}
const getLocationSuggestions = async (query: string) => {
  const url = `https://rsapi.goong.io/Geocode?api_key=${MAP_KEY}&address=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(url);
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching location data", error);
    return [];
  }
};
const register = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `${serverUrl}/register`,
      formData,
      {
        headers: {

          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }
  catch (error) {
    console.error("Lỗi khi đăng ký:", error);
  }
};
async function getProducts(filters: ProductFilters): Promise<Product[]> {
  try {
    const params: any = { ...filters };
    if (filters.category_id && filters.category_id.length > 0) {
      params.category_id = filters.category_id.join(",");
    }
    if (filters.store_id) {
      params.store_id = filters.store_id;
    }
    const response = await axios.get(`${serverUrl}/products`, {
      params,
      headers: { "Cache-Control": "no-store" },
    });
    return response.data.data as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
async function getProductByStoreId(storeId: string | number) {
  try {
    const response = await axios.get(`${serverUrl}/products?store_id=${storeId}`, {
      headers: { "Cache-Control": "no-store" },
    });
    console.log("Fetched products:", response.data.data);
    return response.data.data as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
async function getCategories(): Promise<Category[]> {
  try {
    const response = await axios.get(`${serverUrl}/categories`, {
      headers: { "Cache-Control": "no-store" },
    });
    return response.data.data as Category[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
async function getProductsByCategoryId(categoryId: number | string): Promise<Product[]> {
  try {
    const response = await axios.get(`${serverUrl}/products?category_id=${categoryId}`, {
      headers: { "Cache-Control": "no-store" },
    });
    return response.data.data as Product[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
export const getProductDetail = async (id: string) => {
  try {
    const response = await axios.get(`${serverUrl}/products/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
async function getNearingStores(latitude: number, longitude: number): Promise<Store[]> {
  try {
    const response = await axios.get(`${serverUrl}/stores?latitude=${latitude}&longitude=${longitude}`, {
      headers: { "Cache-Control": "no-store" },
    });
    return response.data.data as Store[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
async function getStoreById(id: number | string): Promise<Store> {
  try {
    const response = await axios.get(`${serverUrl}/stores/${id}`, {
      headers: { "Cache-Control": "no-store" },
    });
    return response.data.data as Store;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error();
  }
}
interface PaymentResponse {
  status: string;
  message: string;
  data: string; // URL thanh toán VNPay
}

export async function makeNewPayment(total: number): Promise<string> {
  const token = localStorage.getItem("access_token");
  console.log(token)
  if (!token) {
    setTimeout(() => {
      window.location.href = "http://localhost:3000/login";
    }, 1000);
    throw new Error("Vui lòng đăng ký hoặc đăng nhập trước khi xem giỏ hàng!");
  }
  try {
    const res = await axios.post<PaymentResponse>(
      `${serverUrl}/payment`,
      { total },
      {
        headers: {
          "Cache-Control": "no-store",
          'Authorization': `Bearer ${token}`
        },
      }
    );

    if (res.data.status !== "success" || !res.data.data) {
      throw new Error("VNPay response is invalid");
    }

    return res.data.data; // Trả về URL thanh toán
  } catch (error) {
    console.error("Payment error:", error);
    throw new Error("Payment processing failed");
  }
}

export const getCart = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {

    window.location.href = "http://localhost:3000/login";
    return null;
  }

  try {
    const response = await axios.get(`${serverUrl}/cart`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response.data;

  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi API:", error.response.data);
      throw new Error(error.response.data?.error || "Không thể lấy dữ liệu giỏ hàng");
    } else if (error.request) {
      console.error("Không thể kết nối đến server:", error.request);
      throw new Error("Không thể kết nối đến máy chủ, vui lòng thử lại.");
    } else {
      console.error("Lỗi không xác định:", error.message);
      throw new Error("Đã xảy ra lỗi không xác định.");
    }
  }
};

export const addToCart = async (productId: number, quantity: number) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    window.location.href = "http://localhost:3000/login";
    return null;
  }

  try {
    const response = await axios.post(`${serverUrl}/cart/add`, {
      product_id: productId,
      quantity: quantity
    }, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response.data;

  } catch (error: any) {
    if (error.response) {
      if (error.response.data?.error === "This product is out of stock.") {
        throw new Error("Hiện tại sản phẩm đang hết hàng, vui lòng xem lại sau.");
      }
      console.error("Lỗi API khi thêm vào giỏ hàng:", error.response.data);
      throw new Error(error.response.data?.error || "Không thể thêm sản phẩm vào giỏ hàng.");
    } else if (error.request) {
      console.error("Không thể kết nối đến server:", error.request);
      throw new Error("Không thể kết nối đến máy chủ, vui lòng thử lại.");
    } else {
      console.error("Lỗi không xác định:", error.message);
      throw new Error("Đã xảy ra lỗi không xác định.");
    }
  }
};

export const getCartDetail = async (storeId: number) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    window.location.href = "http://localhost:3000/login";
    return null;
  }

  try {
    const response = await axios.get(`${serverUrl}/cart/${storeId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response.data;

  } catch (error: any) {
    if (error.response) {
      // Lỗi từ API (ví dụ: 404, 401, 500)
      console.error("Lỗi API:", error.response.data);
      throw new Error(error.response.data?.error || "Lỗi khi tải giỏ hàng");
    } else if (error.request) {
      // Lỗi do không kết nối được với server
      console.error("Không thể kết nối đến server:", error.request);
      throw new Error("Không thể kết nối đến máy chủ, vui lòng thử lại.");
    } else {
      // Lỗi không xác định
      console.error("Lỗi không xác định:", error.message);
      throw new Error("Đã xảy ra lỗi không xác định.");
    }
  }
};

export const updateCartItemQuantity = async (storeId: number, productId: number, quantity: number) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return null;
  }

  try {
    const response = await axios.put(`${serverUrl}/cart/update-quantity`, {
      store_id: storeId,
      product_id: productId,
      quantity: quantity
    }, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi API khi cập nhật item:", error.response.data);
      throw new Error(error.response.data?.error || "Không thể cập nhật giỏ hàng");
    } else if (error.request) {
      console.error("Không thể kết nối đến server:", error.request);
      throw new Error("Không thể kết nối đến máy chủ, vui lòng thử lại.");
    } else {
      console.error("Lỗi không xác định:", error.message);
      throw new Error("Đã xảy ra lỗi không xác định.");
    }
  }
};

export const removeCartItem = async (storeId: number, productId: number) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return null;
  }

  try {
    const response = await axios.delete(`${serverUrl}/cart/remove-item`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      data: {
        store_id: storeId,
        product_id: productId
      }
    });

    return response.data;

  } catch (error: any) {
    if (error.response) {
      console.error("Lỗi API khi xóa item:", error.response.data);
      throw new Error(error.response.data?.error || "Không thể xóa sản phẩm khỏi giỏ hàng");
    } else if (error.request) {
      console.error("Không thể kết nối đến server:", error.request);
      throw new Error("Không thể kết nối đến máy chủ, vui lòng thử lại.");
    } else {
      console.error("Lỗi không xác định:", error.message);
      throw new Error("Đã xảy ra lỗi không xác định.");
    }
  }
};

// Define a type for the order data
export interface OrderData {
  id: number;
  user_id: number;
  store_id: number;
  total_price: number;
  status: "pending" | "completed"; // Enum-like constraint
  order_code: string;
}

export const createNewOrder = async (orderData: OrderData): Promise<number | null> => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return null; // Return null if no token is found
  }

  try {
    const res = await axios.post(
      `${serverUrl}/orders`, // API endpoint
      orderData, // Order data payload
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Order created successfully:", res.data);
    return res.data.data.id; // Return response data
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; // Rethrow for handling in the calling function
  }
};
export const storeSaveProductToReceiptNotification = async (userId: number, code: string, expiryDate?: string) => {
  const token = localStorage.getItem("access_token");

  // Chuyển đổi định dạng ngày
  const formattedExpiryDate = expiryDate ? new Date(expiryDate).toISOString().split("T")[0] : null;

  try {
    const res = await axios.post(
      `${serverUrl}/save-products`,
      {
        user_id: userId,
        code: code,
        expiry_date: formattedExpiryDate, // Định dạng YYYY-MM-DD
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Sản phẩm đã lưu thành công:", res.data);
    return res.data;

  } catch (err) {
    console.error("Lỗi khi lưu sản phẩm:", err);
    return null;
  }
};


export const fetchSaveProducts = async (userId: number, expiryDate: string) => {
  try {
    const token = localStorage.getItem("access_token"); // Nếu API yêu cầu token
    const res = await axios.get(`${serverUrl}/save-products`, {
      params: { user_id: userId, expiry_date: expiryDate },
      headers: {
        Authorization: `Bearer ${token}`, // Thêm nếu cần authentication
        "Content-Type": "application/json",
      },
    });

    // Trích xuất danh sách code từ API response
    const productCodes = res.data.map((product: { code: string }) => product.code);
    return productCodes;

  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm đã lưu:", error);
    return [];
  }
};
export async function getSaveProductOfUser(userId: number, expiryDate: string): Promise<string[] | null> {
  const url = `${serverUrl}/save-products`; // API URL
  const token = localStorage.getItem("access_token");

  try {
    const response = await axios.get<{ success: boolean; productIds: string[] }>(url, {
      params: { user_id: userId, expiry_date: expiryDate },
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      console.log('Product IDs:', response.data.productIds);
      return response.data.productIds; // Trả về mảng productIds
    } else {
      console.warn('API returned false success status');
      return null;
    }
  } catch (error) {
    console.error('Error fetching product IDs:', error);
    return null;
  }
}
export const checkProductExists = async (userId: number, code: string) => {
  const token = localStorage.getItem("access_token"); // Lấy token từ localStorage

  try {
    const res = await axios.post(
      `${serverUrl}/check-product-exists`,
      {
        user_id: userId,
        code: code,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào headers
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.exists; // Trả về true nếu sản phẩm đã tồn tại, ngược lại false
  } catch (error) {
    console.error("Lỗi khi kiểm tra sản phẩm:", error);
    return false; // Mặc định trả về false nếu có lỗi
  }
};

export const fetchUser = async () => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await fetch( `${serverUrl}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json(); 
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return null;
  }
};

export const getUserOrders = async () => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await fetch( `${serverUrl}/order-history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json(); 
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return null;
  }
};

export { getProductByStoreId, getStoreById, getNearingStores, getCSRF, logIn, fetchUserInfo, register, getLatLng, getLocationSuggestions, getProducts, getCategories, getProductsByCategoryId };
