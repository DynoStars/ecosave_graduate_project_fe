// userTypes.ts
export type UserLogin  = {
  id: number;
  name: string;
  email: string;
};

export type LoginProps = {
  csrf: string; // Khai báo kiểu dữ liệu của csrf là string
};

export interface UserProfile {
  id: number; // ID của người dùng
  username: string; // Tên người dùng
  email: string; // Email
  email_verified_at: string; // Thời gian email được xác minh
  is_active: number; // Trạng thái kích hoạt (1: active, 0: inactive)
  avatar: string; // URL ảnh đại diện
  address: string; // Địa chỉ
  role: number; // Quyền hoặc vai trò của người dùng
  phone_number: string; // Số điện thoại
  latitude: string; // Vĩ độ (tọa độ)
  longitude: string; // Kinh độ (tọa độ)
  created_at: string; // Thời gian tạo tài khoản
  updated_at: string; // Thời gian cập nhật tài khoản
}

export type Store = {
  id: number;
  store_name: string;
  avatar: string;
  logo: string;
  store_type: string;
  opening_hours: string | null;
  status: string;
  contact_email: string | null;
  contact_phone: string | null;
  latitude: number;
  longitude: number;
  soft_description: string ;
  address : string ;
  description: string | null;
  user_id: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  products: Product[];
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  image_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  original_price: string;
  discount_percent: number;
  product_type: string;
  discounted_price: string;
  expiration_date: string;
  stock_quantity: number;
  store_id: number;
  category_id: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  store: Store;
  rating: number;
  category: Category;
  images: ProductImage[];
  reviews : Review[];
}

export interface ProductFilters {
  page?: number;
  name?: string;
  store_name?: string;
  category_id?: number[]; // Mảng số
  category_name?: string;
  expiration_date?: string;
  min_price?: number;
  max_price?: number;
  rating?: number;
  store_id ?: string | number;
}

export type MapListingType = {
  listStores: Store[];
  userLatitude: number;
  userLongitude: number;
  loadingProps: boolean;
  setLoading?: (loading: boolean) => void;
};

export type GoongMapProps = MapListingType & {
  setLoading?: (loading: boolean) => void;
};

export type Review = {
  id: number;
  user_id: number;
  product_id: number;
  rating: number; // Giá trị đánh giá (ví dụ: 1-5 sao)
  review_content: string; // Nội dung đánh giá
  image_url: string | null; // URL hình ảnh (nếu có)
  created_at: string; // Thời gian tạo
  updated_at: string; // Thời gian cập nhật
  user: UserProfile; // Thông tin người dùng đánh giá
};

export interface CartItemProps {
  product: Product;
  onRemove: (id: number) => void;
  onQuantityChange: (productId: number, newQuantity: number) => void; 
}

export interface DeliveryAddressProps {
  storeAddress: string;
  userAddress: string;
  onChangeAddress: () => void;
}

export interface CartSummaryProps {
  total: number;
  savings: number;
}
