"use client";
import React, { Suspense } from 'react';
import CartItem from './cart-item';
import useCart from '@/hooks/useCartStore';
import Summary from './summary';

export default function CartClient() {
  const cart = useCart();
  
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold lg:text-black">Shopping Cart</h1>
      <div className="grid mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
        <div className="lg:col-span-7">
          {cart.items.length === 0 && <p className="text-neutral-500">No items added to cart</p>}
          <ul>
            {cart.items.map((item) => (
              <CartItem
                key={item.id} 
                data={item} 
              />
            ))}
          </ul>
        </div>

        {/* Wrapping Summary with Suspense */}
        <Suspense fallback={<div>Loading...</div>}>
          <Summary />
        </Suspense>
      </div>
    </div>
  );
}
