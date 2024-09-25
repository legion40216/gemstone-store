"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Plus, Minus } from 'lucide-react';
import useCart from '@/hooks/useCartStore';
import { toast } from 'sonner';
import { getCountryName } from '@/lib/getCountries';

export default function ProductDetails({ data }) {
  const { items, addItem, getItemCount } = useCart();
  const [count, setCount] = useState(1);
  const [availableQuantity, setAvailableQuantity] = useState(0);

  useEffect(() => {
    const itemCount = getItemCount(data.id);
    setAvailableQuantity(data.quantity - itemCount);
    setCount(itemCount > 0 ? itemCount : 1);
  }, [data, items, getItemCount]);


  const handleAddToCart = () => {
    if (availableQuantity !== 0) {
      addItem(data, count);
    } else {
      toast.error(`Only ${data.quantity} items available.`);
    }
  };

  const incrementCount = () => {
    if (count < data.quantity) {
      setCount(count + 1);
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="space-y-10">
      {/* Product Name and Price */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p className="text-2xl font-semibold mt-2">${data.price}</p>
      </div>

      {/* Color and Size */}
      <div className="space-y-5">
        <div className="flex gap-4 items-center">
          <h3 className="text-sm font-medium">Color:</h3>
          <div
            className="h-6 w-6 rounded-full"
            style={{ backgroundColor: data.color.value }}
          ></div>
        </div>

        <div className="flex gap-4 items-center">
          <h3 className="text-sm font-medium">Size:</h3>
          <Badge className="text-base" variant="secondary">{data.size.value}</Badge>
        </div>

        <div className="flex gap-3">
          <span className="text-muted-foreground">Location:</span>  
          <span className="flex items-center">
            {getCountryName(data.location)}
          </span>
        </div>
      </div>

      {/* Quantity Selection and Add to Cart */}
      {availableQuantity > 0 && 
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center border rounded-md">
          <Button variant="ghost" size="sm" onClick={decrementCount}>
            <Minus className="w-4 h-4" />
          </Button>
          <span className="px-3">{count}</span>
          <Button variant="ghost" size="sm" onClick={incrementCount}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <Button className="p-2 py-5 rounded-full" variant="outline">
          <Heart className="w-6 h-6" />
        </Button>
      </div>
      }

      <div className="flex">
        <Button
          className="flex-1 py-3 px-4 rounded-full flex items-center justify-center"
          onClick={handleAddToCart}
          disabled={availableQuantity === 0}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </div>

      {/* Stock Status */}
      {availableQuantity === 0 ? (
        <p className="text-red-500">This product is out of stock.</p>
      ) : (
        <p className="text-gray-500">{availableQuantity} items available</p>
      )}

      {/* Product Description */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium">Description</h3>
        <p className="text-sm text-muted-foreground">
          {data.description ||
            `This beautiful ${data.category.name.toLowerCase()} is a perfect addition to your collection.
            Its ${data.color.name.toLowerCase()} color and ${data.size.name.toLowerCase()} size make it
            a versatile piece for any occasion.`}
        </p>
      </div>
    </div>
  );
}