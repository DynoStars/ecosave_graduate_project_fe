import { useEffect } from "react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Category, Product, ProductFilters } from "@/types";
import { getProducts } from "@/api";

interface FilterSidebarProps {
  setProducts: (products: Product[]) => void;
  allProducts: Product[];
  categories: Category[];
  setLoading: (loading: boolean) => void;
}

export default function FilterSidebar({
  setProducts,
  allProducts,
  categories,
  setLoading,
}: FilterSidebarProps) {
  const params = useParams();
  const store_id = params.storeId ? parseInt(params.storeId) : undefined;

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([10000, 1000000]);
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [distance, setDistance] = useState<number>(10);

  // Filter application on any change
  useEffect(() => {
    handleFilterProduct();
  }, [selectedCategories, selectedRating, priceRange, expiryDate, distance]);

  async function handleFilterProduct() {
    console.log('hello')
    setLoading(true);
    const filters: ProductFilters = {
      category_id: selectedCategories.length > 0 ? selectedCategories : undefined,
      rating: selectedRating ?? undefined,
      min_price: priceRange[0],
      max_price: priceRange[1],
      expiration_date: expiryDate || undefined,
      store_id: store_id ?? undefined,
    };

    const filteredProducts = await getProducts(filters);
    console.log(filteredProducts)
    setProducts(filteredProducts);
    console.log(allProducts)
    setLoading(false);
  }

  async function handleResetFilter() {
    setSelectedCategories([]);
    setSelectedRating(null);
    setPriceRange([10000, 1000000]);
    setExpiryDate("");
    setDistance(10);
    setProducts(allProducts); // Reset to the initial product list
  }

  return (
    <aside className="w-full lg:w-[250px] space-y-6 border-r pr-4">
      {/* Filter by category */}
      <div>
        <h3 className="font-semibold mb-4">Loại sản phẩm</h3>
        <div className="space-y-2 max-h-96 overflow-auto">
          {categories && categories.length > 0 ? (
            categories.map((type) => (
              <div key={type.id} className="flex items-center space-x-2 cursor-pointer hover:bg-primary">
                <Checkbox
                  id={type.name.toLowerCase()}
                  checked={selectedCategories.includes(type.id)}
                  onCheckedChange={() => {
                    setSelectedCategories((prev) =>
                      prev.includes(type.id)
                        ? prev.filter((c) => c !== type.id)
                        : [...prev, type.id]
                    );
                  }}
                />
                <label htmlFor={type.name.toLowerCase()} className="text-sm cursor-pointer">
                  {type.name}
                </label>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Không có loại sản phẩm nào</p>
          )}
        </div>
      </div>

      {/* Filter by rating */}
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
                onChange={() => {
                  setSelectedRating(rating);
                }}
              />
              <label htmlFor={`rating-${rating}`} className="text-sm flex items-center cursor-pointer">
                {rating} <Star className="w-4 h-4 ml-1 fill-yellow-400" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Filter by price range */}
      <div>
        <h3 className="font-semibold mb-4">Khoảng giá</h3>
        <Slider
          value={priceRange}
          onValueChange={(value) => {
            setPriceRange(value as [number, number]);
          }}
          onValueCommit={() => handleFilterProduct()}
          max={1000000}
          step={10000}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-sm">
          <span>{priceRange[0].toLocaleString()}đ</span>
          <span>{priceRange[1].toLocaleString()}đ</span>
        </div>
      </div>

      {/* Filter by expiry date */}
      <div>
        <h3 className="font-semibold mb-4">Ngày hết hạn</h3>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* Filter by distance */}
      <div>
        <h3 className="font-semibold mb-4">Khoảng cách (km)</h3>
        <Slider
          value={[distance]}
          onValueChange={(value) => setDistance(value[0])}
          onValueCommit={() => handleFilterProduct()}
          max={50}
          step={1}
          className="w-full"
        />
        <div className="text-sm mt-2">{distance} km</div>
      </div>

      {/* Reset button */}
      <button
        onClick={() => handleResetFilter()}
        className="w-full bg-gray-300 text-black py-2 rounded-lg font-semibold mt-2"
      >
        Đặt lại bộ lọc
      </button>
    </aside>
  );
}
