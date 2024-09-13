"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag } from "lucide-react";
import useCart from '@/hooks/useCartStore';
import Image from 'next/image';
import Currency from '@/components/custom-ui/ProductCard/currency';
import CartItem from './cart-item';
import { useRouter } from 'next/navigation';


const Cart = () => {
  const cart = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = () =>{
    router.push('/cart')
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="outline" size="icon" className="relative" onClick={() => setIsOpen(!isOpen)}>
        <ShoppingBag className="h-6 w-6" />
        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
          {cart.items.length}
        </span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-[9999]">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
          </div>
          <ScrollArea className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {cart.items.length > 0 ? (
              cart.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))
            ) : (
              <div className="p-4 text-center">
                <ShoppingBag className="h-16 w-6 text-gray-400 mx-auto" />
                <h2 className="mt-4 text-lg font-semibold">Your cart is empty</h2>
                <p className="mt-2 text-sm text-gray-500">Add some items to your cart to get started.</p>
              </div>
            )}
          </ScrollArea>
          {cart.items.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between items-center text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <Currency value={cart.items.reduce((total, item) => total + Number(item.price), 0)} />
              </div>
              <Button 
              className="w-full"
              onClick={handleClick}
              >
                Checkout
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;