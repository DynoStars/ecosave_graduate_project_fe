import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { increment, setCount } from "@/redux/notificationSlice";
import useSocket from "@/hooks/useSocket";

const realTimeServerURL = process.env.REALTIME_SERVER_KEY;

export default function useNotifications() {
  const dispatch = useDispatch();
  const { notifications: newNotifications } = useSocket(realTimeServerURL);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Lấy thông báo từ localStorage khi trang load
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      const parsedNotifications = JSON.parse(storedNotifications);
      setNotifications(parsedNotifications);
      dispatch(setCount(parsedNotifications.length)); // Cập nhật số lượng vào Redux
    }
  }, []);

  useEffect(() => {
    if (newNotifications.length > 0) {
      setNotifications((prev) => {
        const uniqueNotifications = newNotifications.filter(
          (n) => !prev.some((p) => p.data.product.id === n.data.product.id)
        );

        if (uniqueNotifications.length > 0) {
          const updated = [...uniqueNotifications, ...prev];
          localStorage.setItem("notifications", JSON.stringify(updated));
          dispatch(increment());
          return updated;
        }

        return prev;
      });
    }
  }, [newNotifications]);

  return notifications;
}
