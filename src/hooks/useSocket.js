import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (serverUrl) => {
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socketInstance = io(serverUrl, {
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 2000,
        });

        socketInstance.on("connect", () => {
            console.log("✅ Kết nối WebSocket thành công!");
        });

        socketInstance.on("connect_error", (err) => {
            console.error("❌ Lỗi kết nối WebSocket:", err);
        });

        // Nhận sự kiện tạo sản phẩm mới
        socketInstance.on("product.created", (data) => {
            console.log("🆕 Nhận sự kiện product.created:", data);
            setNotifications((prev) => [...prev, { type: "created", ...data }]);
        });

        // Nhận sự kiện cập nhật sản phẩm
        socketInstance.on("product.updated", (data) => {
            console.log("🔄 Nhận sự kiện product.updated:", data);
            setNotifications((prev) => [...prev, { type: "updated", ...data }]);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.off("product.created");
            socketInstance.off("product.updated");
            socketInstance.disconnect();
        };
    }, [serverUrl]);

    return { socket, notifications };
};

export default useSocket;
