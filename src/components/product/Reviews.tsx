import Image from "next/image"; // Import Image từ next/image
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string; // Thêm thuộc tính avatar
}

interface ReviewsProps {
  reviews: Review[];
}

export function Reviews({ reviews }: ReviewsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium mb-6">Đánh Giá Sản Phẩm</h2>
      <div className="space-y-6">
        {reviews.map((review, idx) => (
          <div key={idx} className="flex gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-200 flex items-center justify-center">
              {review.avatar ? ( // Kiểm tra nếu có avatar
                <Image
                  src={review.avatar}
                  alt={review.name}
                  layout="fill" // Để ảnh chiếm toàn bộ diện tích
                  className="object-cover"
                />
              ) : (
                <span className="text-gray-600 font-medium">{review.name[0]}</span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{review.name}</span>
                <div className="flex">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="mt-2 text-gray-600">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Button variant="outline"
            className="w-60 py-3 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white">
            Xem tất cả
        </Button>
      </div>
    </div>
  );
}