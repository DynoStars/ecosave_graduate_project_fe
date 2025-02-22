import { RootState } from "@/redux/store";
import React, { FormEvent, useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CheckoutFormGetInfo: React.FC = () => {
  // State lưu thông tin người dùng
  const [formData, setFormData] = useState({
    phone: "00000000000", // Default value for phone
    name: "Your name", // Default value for name
  });

  // State cho phương thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState<string>("VNpay");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);

  // Cập nhật formData khi thông tin user thay đổi
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.username || "Your name", // Set user data or default value
        phone: user.phone_number || "00000000000", // Set user phone or default value
      });
    }
  }, [user]);

  // Xử lý khi người dùng nhập liệu
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Đã gửi thông tin:", formData);
    console.log("Phương thức thanh toán đã chọn:", paymentMethod);
    setIsEditing(false); // Chuyển sang chế độ xem sau khi lưu
  };

  return (
    <div className="flex justify-center items-center w-full z-10">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Thông Tin Đơn Hàng</h2>

        {/* Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Tên
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Tên của bạn"
            required
            disabled={!isEditing}
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Số Điện Thoại
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Số điện thoại của bạn"
            required
            disabled={!isEditing}
          />
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="paymentMethod"
          >
            Phương Thức Thanh Toán
          </label>
          <select
            name="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentChange}
            className="w-full px-3 py-2 border rounded-lg"
            disabled={!isEditing}
          >
            <option value="VNpay">VNpay</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default CheckoutFormGetInfo;
