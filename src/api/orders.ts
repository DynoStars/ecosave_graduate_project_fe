import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://127.0.0.1:8000/api';


export interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
}

export const createOrderItems = async (orderId: number, items: OrderItem[]): Promise<boolean> => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    alert("Vui lòng đăng nhập để lưu sản phẩm!");
    return false;
  }

  try {
    const res = await axios.post(
      `${serverUrl}/order-items`,
      {
        order_id: orderId,
        items: items
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Order items saved successfully:", res.data.data);
    return true; // Trả về `true` khi thành công
  } catch (error) {
    console.error("Error saving order items:", error);
    return false;
  }
};
