import { useState } from "react";
import { FaShieldAlt, FaPiggyBank, FaChartLine } from "react-icons/fa";
import bgIcon from "../../assets/images/auth/bg-circle.png";
import Image from "next/image";

const values = [
  {
    id: 1,
    title: "An toàn",
    description: "Đảm bảo khách hàng mua đúng sản phẩm",
    icon: <FaShieldAlt className="text-2xl text-orange-500" />,
    color: "bg-green-400",
  },
  {
    id: 2,
    title: "Tiết kiệm",
    description: "Giảm chi phí khi mua sắm các loại hàng hóa",
    icon: <FaPiggyBank className="text-2xl text-blue-500" />,
    color: "bg-white",
  },
  {
    id: 3,
    title: "Ý nghĩa",
    description: "Tránh lãng phí thực phẩm ra môi trường",
    icon: <FaChartLine className="text-2xl text-pink-500" />,
    color: "bg-white",
  },
];

export default function ValuesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="py-10 w-full text-center relative">
      <Image
        src={bgIcon.src}
        width={100}
        height={100}
        alt="background login image"
        className="bg-image hidden lg:block absolute"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={50}
      />
      <Image
        src={bgIcon.src}
        width={300}
        height={300}
        alt="background login image"
        className="bg-image right-1 bottom-0 hidden lg:block absolute"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={50}
      />
      <h2 className="text-primary">Giá trị của chúng tôi</h2>
      <h2 className="text-3xl font-bold mt-2">
        Mua sắm tiện lợi, tiêu dùng bền vững
      </h2>

      <div className="flex justify-center gap-6 mt-8 flex-wrap lg:flex-nowrap">
        {values.map((value, index) => (
          <div
          data-aos="fade-up"
            key={value.id}
            className={`p-6 z-20 rounded-xl shadow-strong cursor-pointer w-full lg:w-96 transition-all duration-300 ${
              index === activeIndex ? "bg-primary text-white" : "bg-white"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-md ${
                index === activeIndex ? "bg-white" : "bg-gray-100"
              }`}
            >
              {value.icon}
            </div>
            <h3 className="text-lg font-bold mt-4">{value.title}</h3>
            <p className="text-sm mt-2">{value.description}</p>
            <a
              href="#"
              className={`inline-block mt-4 font-medium ${
                index === activeIndex ? "text-white" : "text-primary-light"
              }`}
            >
              Xem thêm →
            </a>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {values.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === activeIndex
                ? "bg-primary w-6 transition-all"
                : "bg-gray-300"
            }`}
            onClick={() => setActiveIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
