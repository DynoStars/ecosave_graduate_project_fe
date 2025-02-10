"use client";
import { useState, useEffect, useCallback } from "react";
import { Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Product } from "@/app/home/Home";
import BenefitsSection from "../homeSection/BenefitsSection";

interface FilterSidebarProps {
  setProducts: (products: Product[]) => void;
  allProducts: Product[];
}

export default function FilterSidebar({
  setProducts,
  allProducts,
}: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([10, 100]);
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [distance, setDistance] = useState<number>(10);

  // ⚡ Tối ưu hóa hàm lọc bằng useCallback để tránh re-render không cần thiết
  const applyFilters = useCallback(() => {
    let filteredProducts = allProducts;

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    if (selectedRating !== null) {
      filteredProducts = filteredProducts.filter(
        (p) => Math.round(p.rating) === selectedRating
      );
    }

    filteredProducts = filteredProducts.filter(
      (p) =>
        parseFloat(p.original_price.replace(" vnd", "").replace(",", "")) >=
          priceRange[0] &&
        parseFloat(p.original_price.replace(" vnd", "").replace(",", "")) <=
          priceRange[1]
    );

    if (expiryDate) {
      filteredProducts = filteredProducts.filter(
        (p) => new Date(p.expiry_date) <= new Date(expiryDate)
      );
    }

    if (distance) {
      filteredProducts = filteredProducts.filter((p) => p.distance <= distance);
    }

    setProducts((prevProducts) => {
      const isEqual =
        JSON.stringify(prevProducts) === JSON.stringify(filteredProducts);
      return isEqual ? prevProducts : filteredProducts;
    });
  }, [selectedCategories, selectedRating, priceRange, expiryDate, distance, allProducts, setProducts]);

  // 🚀 Chỉ chạy khi state thay đổi thực sự
  useEffect(() => {
    if (
      selectedCategories.length === 0 &&
      selectedRating === null &&
      priceRange[0] === 10 &&
      priceRange[1] === 100 &&
      expiryDate === "" &&
      distance === 10
    ) {
      // Không có bộ lọc nào được chọn => Hiển thị tất cả sản phẩm
      setProducts(allProducts);
      return;
    }

    applyFilters();
  }, [applyFilters, allProducts]);


  return (
    <aside className="w-full lg:w-[250px] space-y-6 border-r pr-4">
      <div>
        <h3 className="font-semibold mb-4">Loại sản phẩm</h3>
        <div className="space-y-2">
          {["Vitamins", "Pain Relief", "Cold & Flu", "Supplements"].map(
            (type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type.toLowerCase()}
                  checked={selectedCategories.includes(type)}
                  onCheckedChange={() =>
                    setSelectedCategories((prev) =>
                      prev.includes(type)
                        ? prev.filter((c) => c !== type)
                        : [...prev, type]
                    )
                  }
                />
                <label htmlFor={type.toLowerCase()} className="text-sm">
                  {type}
                </label>
              </div>
            )
          )}
        </div>
      </div>

      <div>
        <h3 className="mb-4">Đánh giá</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`rating-${rating}`}
                name="rating"
                checked={selectedRating === rating}
                onChange={() => setSelectedRating(rating)}
              />
              <label
                htmlFor={`rating-${rating}`}
                className="text-sm flex items-center cursor-pointer"
              >
                {rating} <Star className="w-4 h-4 ml-1 fill-yellow-400" />
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Khoảng giá</h3>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          max={1000000}
          step={10000}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-sm">
          <span>{priceRange[0].toLocaleString()}đ</span>
          <span>{priceRange[1].toLocaleString()}đ</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Ngày hết hạn</h3>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div>
        <h3 className="font-semibold mb-4">Khoảng cách (km)</h3>
        <Slider
          value={[distance]}
          onValueChange={(value) => setDistance(value[0])}
          max={50}
          step={1}
          className="w-full"
        />
        <div className="text-sm mt-2">{distance} km</div>
      </div>

      <button
        onClick={() => {
          setSelectedCategories([]);
          setSelectedRating(null);
          setPriceRange([10, 100]);
          setExpiryDate("");
          setDistance(10);
          setProducts(allProducts); // Reset về danh sách ban đầu
        }}
        className="w-full bg-gray-300 text-black py-2 rounded-lg font-semibold mt-2"
      >
        Đặt lại bộ lọc
      </button>
      <BenefitsSection />
    </aside>
  );
}
