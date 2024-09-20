"use client";
import React from 'react';

import useCart from '@/hooks/useCartStore';
import Checkout from './Checkout/_Checkout';

export default function CartClient() {
  const cart = useCart();
  return (
    <Checkout items={cart.items}/>
  );
}