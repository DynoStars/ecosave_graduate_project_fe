import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (serverUrl) => {
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socketInstance = io(serverUrl, {
            transports: ["websocket"], // Bật WebSocket thay vì chỉ polling
            reconnection: true, // Cho phép tự động kết nối lại
            reconnectionAttempts: 5, // Số lần thử lại nếu mất kết nối
            reconnectionDelay: 2000, // Khoảng thời gian giữa các lần thử lại
        });

        socketInstance.on("connect", () => {
            console.log("✅ Kết nối WebSocket thành công!");
        });

        socketInstance.on("connect_error", (err) => {
            console.error("❌ Lỗi kết nối WebSocket:", err);
        });

        socketInstance.on("product.created", (data) => {
            console.log("📩 Nhận dữ liệu từ server:", data);
            setNotifications((prev) => [...prev, data]);
        });

        setSocket(socketInstance);

        return () => {
            // Xóa listener khi component unmount để tránh memory leak
            socketInstance.off("product.created");
            socketInstance.disconnect();
        };
    }, [serverUrl]);

    return { socket, notifications };
};

export default useSocket;