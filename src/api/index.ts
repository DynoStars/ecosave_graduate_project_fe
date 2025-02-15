import { FormData } from '@/app/(auth)/register/Register';
import { Category, Product, ProductFilters, Store } from '@/types';
import axios from 'axios';
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
    // Tạo object mới để gửi request
    const params : any = { ...filters };

    // 🔹 Chuyển đổi category_id (mảng số) thành chuỗi trước khi gửi API
    if (filters.category_id && filters.category_id.length > 0) {
      params.category_id = filters.category_id.join(","); // Chuyển thành "1,2,3"
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

// getProducts({ category_id: [1, 3, 5], page: 1 }).then((products) =>
//   console.log(products)
// );


// // 🔹 Lấy danh sách sản phẩm với phân trang và lọc theo danh mục
// getProducts({ page: 1, category_id: 3 }).then((products) =>
//   console.log(products)
// );

// // 🔹 Tìm kiếm sản phẩm theo tên và khoảng giá
// getProducts({ name: "Bánh", min_price: 50000, max_price: 200000 }).then(
//   (products) => console.log(products)
// );

// // 🔹 Lọc theo đánh giá
// getProducts({ rating: 4 }).then((products) => console.log(products));



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

async function getProductsByCategoryId(categoryId : number | string): Promise<Product[]> {
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
async function getNearingStores (latitude : number, longitude : number) : Promise<Store[]> {
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


export { getNearingStores, getCSRF, logIn, fetchUserInfo, register, getLatLng, getLocationSuggestions, getProducts, getCategories, getProductsByCategoryId };
