"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ModalGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col sm:flex-row gap-3">
    {/* Main Image Container */}
    <div className="relative w-full aspect-square overflow-hidden rounded-lg">
      <Image
        src={mainImage.url}
        alt="Main product image"
        className="object-contain"
        fill
        sizes="(max-width: 640px) 100vw, 75vw"
        priority
      />
    </div>

    {/* Thumbnail Images */}
    <div className="flex flex-row sm:flex-col gap-3">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={cn(
            "relative flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-md overflow-hidden cursor-pointer border border-gray-300",
            image.id === mainImage.id && "ring-2 ring-black"
          )}
          onClick={() => setMainImage(image)}
        >
          <Image
            src={image.url}
            alt={`Product thumbnail ${index + 1}`}
            className="object-cover object-center"
            fill
            sizes="(max-width: 640px) 64px, 80px"
          />
        </div>
      ))}
    </div>
  </div>
  );
};

export default ModalGallery;