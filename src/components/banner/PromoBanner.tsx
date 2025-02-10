import Image from "next/image";

import PromoBannerImage from '../../assets/images/banner/bg-secsion3.png';

const PromoBanner = () => {
  return (
    <div className="relative w-full rounded-lg overflow-hidden">
      {/* Background Image */}
      <Image
        src={PromoBannerImage.src} // Thay bằng đường dẫn ảnh đúng
        alt="Promo Banner"
        width={1200}
        height={200}
        className="w-full h-auto object-cover"
      />
      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/30">
        <h2 className="text-lg font-semibold text-center">
          Nhận hoàn tiền <span className="text-yellow-300"> 10.000vnd</span>!Đơn hàng tối thiểu
          <span className="text-yellow-300"> 30.000vnd</span>
        </h2>
        <button className="mt-2 px-4 py-2 bg-white text-green-600 font-bold rounded-md border-dashed border-2 border-green-500">
          Mã sử dụng: GROCERY1920
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
