"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag} from "lucide-react";
import useCart from '@/hooks/useCartStore';
import Currency from '@/components/custom-ui/ProductCard/currency';
import { useRouter } from 'next/navigation';
import CartItem from './cart-item';

const Cart = () => {
    const { items, getTotalCount, getTotalPrice } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {
        setTotalCount(getTotalCount())
    }, [getTotalCount, items]);

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

    const handleCheckout = () => {
        router.push('/cart');
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <Button 
                variant="outline" 
                size="icon" 
                className="relative"
                onClick={() => setIsOpen(!isOpen)}
            >
                <ShoppingBag className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
                    {totalCount}
                </span>
            </Button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-[9999]">
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">Shopping Cart</h2>
                    </div>
                    <ScrollArea className="max-h-[calc(100vh-200px)] overflow-y-auto">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <CartItem key={item.id} item={item} setIsOpen={setIsOpen}/>
                            ))
                        ) : (
                            <div className="p-4 text-center">
                                <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto" />
                                <h2 className="mt-4 text-lg font-semibold">
                                    Your cart is empty
                                </h2>
                                <p className="mt-2 text-sm text-gray-500">
                                    Add some items to your cart to get started.
                                </p>
                            </div>
                        )}
                    </ScrollArea>
                    
                    {items.length > 0 && (
                        <div className="p-4 border-t">
                            <div className="flex justify-between items-center text-base font-medium text-gray-900 mb-4">
                                <p>Subtotal</p>
                                <Currency value={getTotalPrice()} />
                            </div>
                            <Button 
                                className="w-full"
                                onClick={handleCheckout}
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