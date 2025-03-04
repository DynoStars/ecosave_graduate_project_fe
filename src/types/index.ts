export type UserLogin  = {
  id: number;
  name: string;
  email: string;
};
export type LoginProps = {
  csrf: string;
};
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  email_verified_at: string;
  is_active: number;
  avatar: string;
  address: string;
  role: number;
  phone_number: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
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
  category_id?: number[];
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
  rating: number;
  review_content: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  user: UserProfile;
};
export interface CartItemProps {
  product: CartProduct;
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
  handlePayment : () => void;
}
export interface CartProduct {
  product_id: number;
  name: string;
  quantity: number;
  stock_quantity: number;
  original_price: string;
  discounted_price: string;
  subtotal: number;
  images: ProductImage[];
  isRemoving?: boolean;
  store_id?: string;
  price?: string | number;
  picture?: string;
  storeId ?: number | string;
  orderId ?: number | string;
}
export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  image_order: number;
  created_at: string;
  updated_at: string;
}
export interface PaymentItem {
  id: number;
  name: string;
  price: string | number;
  quantity: number;
  picture: string;
  storeId : number | string;
  orderId ?: number | string;
}
export interface PaymentState {
  items: PaymentItem[];
}
export interface OrderData {
  user_id: number;
  store_id: number;
  total_price: number;
  status: "completed" | "cancelled";
  order_code: string;
}
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}
export type ProductScan = {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  manufacturingDate: string;
  expiryDate: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
};
export interface ScanProductInfoProps {
  barcode: string;
  setProductForAiGenerate: (product: ProductScan) => void;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}