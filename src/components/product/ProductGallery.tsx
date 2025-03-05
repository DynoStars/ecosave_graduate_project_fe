"use client";
import Image from "next/image";
import { useState } from "react";
import backupImage from "../../assets/images/products/product3.png";
import { ProductGalleryProps } from "@/types";
export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  if (!images || images.length === 0) {
    return (
      <div className="flex">
        <div className="flex flex-col space-y-4 mr-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <button
              key={idx}
              className="relative aspect-square w-20 border rounded-lg overflow-hidden"
            >
              <Image
                src={backupImage}
                alt={`No Image ${idx + 1}`}
                width={80}
                height={80}
                className="object-cover"
              />
            </button>
          ))}
        </div>
        <div className="flex-1 w-[500px] aspect-[3/2] relative border rounded-lg overflow-hidden">
          <Image
            src={backupImage.src}
            alt="No Image Available"
            fill
            className="object-contain"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex">
      <div className="flex flex-col space-y-4 mr-4">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setSelectedImage(idx)}
            className={`relative aspect-square w-20 border rounded-lg overflow-hidden ${
              selectedImage === idx ? "ring-2 ring-orange-500" : ""
            }`}
          >
            <Image
              src={img.image_url || "/placeholder.svg"}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
      <div className="flex-1 w-[500px] aspect-[3/2] relative border rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage]?.image_url || "/placeholder.svg"}
          alt="Product"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
