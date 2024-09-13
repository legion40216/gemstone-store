"use client"
import Currency from '@/components/custom-ui/ProductCard/currency'
import IconButton from '@/components/custom-ui/ProductCard/icon-button'
import { Button } from '@/components/ui/button'
import useCart from '@/hooks/useCartStore'
import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function CartItem({
    data
}) {
    const cart = useCart();
    const handleRemove = () => {
        cart.removeItem(data.id)
     }
  return (
<li className="flex py-6 border-b">
  <div>
    <Image 
      src={data.images[0].url} 
      alt="description of image" 
      width={200} 
      height={200} 
      className="object-cover" 
    />
  </div>   

  <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
    <div className="absolute z-10 right-0 top-0">
      <Button
        variant="outline" 
        onClick={handleRemove} 
        className="ml-4">
          <X size={15} />
      </Button>
    </div>
    <div className="relative pr-9 grid grid-cols-2 gap-x-6 sm:gap-x-6 sm:pr-0">
      <div className="flex justify-between">
        <p className="text-lg font-semibold text-black">
          {data.name}
        </p>
      </div>
    </div>
    <div className="mt-1 flex text-sm">
      <p className="text-gray-500">{data.color.name}</p>
      <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">{data.size.name}</p>
    </div>
    <Currency value={data.price} />
  </div>
</li>
  )
}
