"use client";
import React from 'react';
import Image from 'next/image';
import { Expand, ShoppingBag, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import IconButton from './icon-button';
import Currency from './currency';
import { useRouter } from 'next/navigation';
import useModalStore from '@/hooks/useModalStore';
import useCart from '@/hooks/useCartStore';

const ProductCard = ({ item }) => {
  const router = useRouter();
  const { addItem } = useCart();  
  const { openModal } = useModalStore();

  const handleClick = () => {
    router.push(`/products/${item?.id}`);
  };

  const handleExpand = (e) => {
    e.stopPropagation();
    openModal(item);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(item);  // Use the addItem function from useCart
  };

  return (
    <div className="bg-white rounded-xl border p-3 space-y-3 
    hover:shadow-md transition"
    >
      <div className="aspect-square overflow-hidden rounded-xl relative group">
        <Image
          className="aspect-square object-cover h-full w-full transition group-hover:scale-105"
          fill
          src={item?.images?.[0]?.url}
          alt={item?.name}
        />

        <div 
        className="opacity-0 group-hover:opacity-100 transition absolute inset-0 
        bg-black/30 flex items-center justify-center cursor-pointer" 
        onClick={handleClick}
        >
          <div className="flex gap-3">
            <IconButton
              onClick={handleExpand}
              icon={<Expand size={24} className="text-muted-foreground" />}
            />
            <IconButton
              onClick={handleAddToCart}
              icon={<ShoppingBag size={24} className="text-muted-foreground" />}
            />
          </div>
        </div>

        {item?.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-yellow-400 text-yellow-800 hover:bg-current">
            <Star size={12} className="mr-1" /> Featured
          </Badge>
        )}
      </div>

      <div className="flex justify-between gap-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{item?.name}</h3>
          <p className="text-sm text-muted-foreground">
            {item?.category?.name}
          </p>
        </div>

        <div>
          <Currency value={item?.price}/>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;