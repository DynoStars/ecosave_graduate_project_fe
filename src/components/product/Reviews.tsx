"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { formatDateTime } from "@/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { ReviewsProps } from "@/types";

export function Reviews({ reviews }: ReviewsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium mb-6">Đánh Giá Sản Phẩm</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center">
          Hiện tại sản phẩm chưa có đánh giá nào.
        </p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-200 flex items-center justify-center">
                {review.user?.avatar ? (
                  <Image
                    src={review.user.avatar}
                    alt={review.user.username || "Người dùng"}
                    layout="fill"
                    className="object-cover"
                  />
                ) : (
                  <span className="text-gray-600 font-medium">
                    {review.user?.username ? review.user.username[0] : "?"}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {review.user?.username || "Người dùng"}
                  </span>
                  <div className="flex">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDateTime(review.created_at)}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{review.review_content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {reviews.length > 3 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            className="w-60 py-3 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white"
          >
            Xem tất cả
          </Button>
        </div>
      )}
    </div>
  );
}
