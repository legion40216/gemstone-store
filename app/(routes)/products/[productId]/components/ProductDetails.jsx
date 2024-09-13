"use client"
import { Button } from '@/components/ui/button'
import useCart from '@/hooks/useCartStore';
import { Heart, ShoppingCart } from 'lucide-react'
import React from 'react'

export default function ProductDetails({
    product,
}) {
  const { addItem } = useCart();  

  const handleAddToCart = () => {
    addItem(product); 
  };

  return (
    <div className= "space-y-10">
      <div className= "space-y-3">
        <div>
          <h1 className="text-2xl font-bold">
            {product.name}
            </h1>
          <p className="text-2xl font-semibold mt-2">
            ${product.price}
          </p>
        </div>

        <div className= "space-y-5">
          <div className="flex gap-4 items-center">
            <h3 className="text-sm font-medium">
            Color
            </h3>
            <div className="h-6 w-6 rounded-full" style={{backgroundColor: product.color.value}}></div>
          </div>
          <div className="flex gap-4">
            <h3 className="text-sm mr-3 font-medium">
              Size
            </h3>
            <div>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full 
              text-sm font-medium bg-gray-100 text-gray-800"
              >
                {product.size.value}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className= "flex items-center gap-3">
        <Button 
        className="flex-1 py-3 px-4 rounded-full 
        flex items-center justify-center"
        onClick={handleAddToCart}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
        
        <Button 
        className=" p-3 py-6 rounded-full"
        variant="outline"
        >
          <Heart className="w-6 h-6" />
        </Button>
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium">Description</h3>
        <p className=" text-sm text-muted-foreground">
          This beautiful {product.category.name.toLowerCase()} is a perfect addition to your collection. 
          Its {product.color.name.toLowerCase()} color and {product.size.name.toLowerCase()} size make it 
          a versatile piece for any occasion.
        </p>
      </div>
  </div>
  )
}
