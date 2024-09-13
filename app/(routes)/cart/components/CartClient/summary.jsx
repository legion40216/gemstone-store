"use client"
import Currency from '@/components/custom-ui/ProductCard/currency';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/useCartStore';
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function Summary() {
    const [searchParams] = useSearchParams();
    const removeAll = useCart((state) => state.removeAll);

    const items = useCart((state) => state.items);
    
    const totalPrice = items.reduce((total, item) => {
      return total + Number(item.price);
    }, 0);

  return (
      <div
        className="
          rounded-lg 
          bg-gray-50 
          px-4 
          py-6 
          sm:px-6 
          lg:col-span-5 
          lg:px-8
        "
      >
        <h2 className="text-lg font-medium text-gray-900">
          Order Summary
        </h2>
        <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-280 pt-4">
            <div className="text-base font-medium text-gray-900">
            Order total
            </div>
            <Currency value={totalPrice} />
        </div>
        <Button className="w-full mt-6">
            Confirm
        </Button>
        </div>
        </div>
  )
}
