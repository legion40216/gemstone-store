"use client"
import Image from 'next/image';
import { useState } from 'react'
import GalleryTab from './gallery-tab';

export default function Gallery({
  images,
}) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className = {"grid grid-cols-1 gap-2  h-full"}>
    <div className = "relative aspect-square w-full  overflow-hidden rounded-lg mb-4">
      <Image
        src={mainImage.url}
        alt="Main product image"
        className=" object-contain"
        fill
        // sizes="(min-width: 1536px) 738px, (min-width: 1280px) 610px, (min-width: 1024px) 482px, (min-width: 768px) 354px, 100vw"
        priority
      />
    </div>
    <div className="flex gap-3 flex-wrap">
      {images.map((image, index) => (
        <GalleryTab
          key={index} 
          image={image}
          setMainImage={setMainImage}
          mainImage={mainImage}
        />
      ))}
    </div>
  </div>
  )
}