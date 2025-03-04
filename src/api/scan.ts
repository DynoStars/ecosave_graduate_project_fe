import { ProductScan } from "@/types";
const serverUrl = process.env.REALTIME_SERVER_KEY || "http://localhost:4000/api" ;
import axios from 'axios';
export const fetchProductByBarcode = async (barcode : string | number) => {
    try {
      const response = await fetch(
        `${serverUrl}/api/products/barcode/${barcode}`
      );
      if (!response.ok) throw new Error("Không tìm thấy sản phẩm");
      const { data } = await response.json();
      return data;
    } catch (err) {
      console.log(err)
    }
  };
  export async function getProductsByIds(productIds: string[]): Promise<ProductScan[] | null> {
    const url = `${serverUrl}/products/by-ids`; // API URL
    try {
        const response = await axios.post<{ status: string; code: number; message: string; data: ProductScan[] }>(url, { productIds });
        if (response.data.status === 'success' && response.data.code === 200) {
            console.log('Lấy sản phẩm thành công:', response.data.data);
            return response.data.data; // Trả về danh sách sản phẩm
        } else {
            console.log('Lỗi API:', response.data.message);
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        return null;
    }
}