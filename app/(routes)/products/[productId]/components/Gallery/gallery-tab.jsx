"use client"
import Image from 'next/image';
import { cn } from '@/lib/utils'; // Adjust the import path based on where your `cn` function is located

export default function GalleryTab({
  image,
  setMainImage,
  mainImage
}) {
  return (
    <div 
      key={image.id} 
      className={cn(
        'aspect-square relative h-20 w-20 rounded-md overflow-hidden cursor-pointer',
        image.id === mainImage.id && 'ring-2 ring-black'
      )}
      onClick={() => setMainImage(image)}
    >
      <Image
        src={image.url}
        alt="Product thumbnail"
        className="object-cover object-center w-full h-full shadow  border-2 rounded-sm"
        fill
      />
    </div>
  )
}