import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (serverUrl) => {
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socketInstance = io(serverUrl);

        socketInstance.on("connect", () => {
            console.log("Kết nối WebSocket thành công!");
        });

        socketInstance.on("product.created", (data) => {
            console.log("Nhận dữ liệu từ server:", data);
            setNotifications((prev) => [...prev, data]);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [serverUrl]);

    return { socket, notifications };
};

export default useSocket;
