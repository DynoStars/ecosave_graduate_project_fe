import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Image from "next/image";

const fadeImages = [
  {
    url: "https://media.istockphoto.com/id/909328686/photo/tasty-meat-rolls-with-sour-cream-and-salad-on-wooden-table.webp?s=170667a&w=0&k=20&c=lnttyrfnaOOjFdXRFF6xP7rn58Yab6raX6lK4qzLsMc=",
  },
  {
    url: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container h-96">
      <Fade>
        {fadeImages.map((fadeImage, index) => (
          <div className="h-96" key={index}>
            <Image
              src={fadeImage.url}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;
