"use client"

import Image from "next/image"
import { useState } from "react"

interface ProductGalleryProps {
  images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="flex">
      <div className="flex flex-col space-y-4 mr-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`relative aspect-square w-20 border rounded-lg overflow-hidden ${
              selectedImage === idx ? "ring-2 ring-primary" : ""
            }`}
          >
            <Image 
              src={img || "/placeholder.svg"} 
              alt={`Thumbnail ${idx + 1}`} 
              fill 
              className="object-cover" 
            />
          </button>
        ))}
      </div>

      <div className="flex-1 w-[500px] aspect-[3/2] relative border rounded-lg overflow-hidden">
        <Image 
          src={images[selectedImage] || "/placeholder.svg"} 
          alt="Product" 
          fill 
          className="object-contain" 
        />
      </div>
    </div>
  )
}