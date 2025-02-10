import { FaTags, FaRedo, FaTruck } from "react-icons/fa";
import { motion } from "framer-motion";
const benefits = [
  {
    id: 1,
    title: "Giá tốt nhất & Ưu đãi",
    description: "Đừng bỏ lỡ những ưu đãi và mức giá tuyệt vời mỗi ngày",
    icon: <FaTags className="text-primary text-3xl" />,
  },
  {
    id: 2,
    title: "Hoàn tiền",
    description: "Nếu sản phẩm của bạn bị hư hỏng, chúng tôi đồng ý hoàn tiền",
    icon: <FaRedo className="text-primary text-3xl" />,
  },
  {
    id: 3,
    title: "Giao hàng miễn phí",
    description: "Mua đơn hàng trên 50$ và nhận giao hàng miễn phí toàn quốc",
    icon: <FaTruck className="text-primary text-3xl" />,
  },
];

export default function BenefitsSection() {
  return (
    <section className="flex justify-center gap-10 py-10 flex-wrap w-full">
      {benefits.map((benefit) => (
        <motion.div
          key={benefit.id}
          className="flex items-center w-full lg:w-96 gap-4 p-4 rounded-lg bg-gray-50 cursor-pointer transition-all"
          whileHover={{
            scale: 1.02,
            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="w-12 h-12 flex justify-center items-center transition-all duration-300">
            {benefit.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{benefit.title}</h3>
            <p className="text-gray-500 text-sm">{benefit.description}</p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
