import Currency from '@/components/custom-ui/ProductCard/currency';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/useCartStore';
import { X } from 'lucide-react';
import React from 'react'

export default function CartItem(
    {
        item
    }
) {
    const cart = useCart();
    const handleRemove = () => {
       cart.removeItem(item.id)
    }
  return (
    <div className="flex py-4 border-b">
    <div className="h-28 w-28 rounded-md overflow-hidden relative">
    <img src={item.images[0].url} alt="description of image" />
    </div>
    <div className="ml-4 flex flex-1 flex-col">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <h3>{item.name}</h3>
        <Currency value={item.price} />
      </div>
      <p className="mt-1 text-sm text-gray-500">{item.color.name}, {item.size.name}</p>
    </div>
    <Button variant="ghost" onClick={handleRemove} className="ml-4">
      <X size={15} />
    </Button>
  </div>
  )
}
