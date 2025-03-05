import Image from "next/image";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import founderGiaBao from "../../assets/images/products/product1.png";
import founderBichQuyen from "../../assets/images/products/product2.png";
import founderThiHi from "../../assets/images/products/product3.png";
import founderThuyNgan from "../../assets/images/products/product4.png";

const founders = [
  {
    id: 1,
    name: "Phạm Gia Bảo",
    role: "Full-Stack Developer",
    description:
      "Cựu đồng sáng lập của DynoStars. Nhân viên ban đầu tại Spotify và EcoSave.",
    image: founderGiaBao,
  },
  {
    id: 2,
    name: "Lê Thị Bích Quyên",
    role: "Director, Business Analytics and Planning",
    description: "Dẫn dắt các nhóm kỹ thuật tại Figma, Pitch và Protocol Labs.",
    image: founderBichQuyen,
  },
  {
    id: 3,
    name: "Phạm Thị Hỉ",
    role: "Career Educator",
    description: "PM cho tuyển tính, trường Lambda và trên boong.",
    image: founderThiHi,
  },
  {
    id: 4,
    name: "Hồ Thị Ngân",
    role: "Co-op & Internships Program & Operations Manager",
    description: "Cựu nhà phát triển giao diện người dùng cho Linear.",
    image: founderThuyNgan,
  },
];

const SocialIcons = () => (
  <div className="flex justify-center gap-4 mt-4">
    <a
      href="#"
      className="text-blue-500 hover:text-blue-600 transition duration-300"
    >
      <FaTwitter size={18} />
    </a>
    <a
      href="#"
      className="text-blue-800 hover:text-blue-900 transition duration-300"
    >
      <FaLinkedin size={18} />
    </a>
  </div>
);

export default function FoundersSection() {
  return (
    <section className="py-16 text-center">
      <h4 className="text-primary font-medium text-sm">Đại gia đình sáng lập</h4>
      <h2 className="text-3xl font-bold mt-2">Gặp gỡ các nhà sáng lập</h2>
      <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
        Chúng tôi là một đội ngũ sáng tạo và đam mê, luôn nỗ lực mang đến những
        giải pháp tối ưu và sáng tạo nhất, kết hợp sự chuyên nghiệp và tinh thần
        hợp tác để đạt được những thành công bền vững.
      </p>

      <div className="grid md:grid-cols-4 gap-6 mt-10 px-4">
        {founders.map(({ id, name, role, description, image }) => (
          <div
            key={id}
            className="bg-white p-6 rounded-xl border border-primary text-center transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <div className="w-20 h-20 mx-auto relative">
              <Image
                src={image}
                alt={name}
                width={80}
                height={80}
                className="rounded-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={50}
              />
            </div>
            <h3 className="text-lg font-bold mt-4">{name}</h3>
            <p className="text-sm text-primary font-medium">{role}</p>
            <p className="text-gray-600 text-sm mt-2">{description}</p>
            <SocialIcons />
          </div>
        ))}
      </div>
    </section>
  );
}
