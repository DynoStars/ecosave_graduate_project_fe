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
