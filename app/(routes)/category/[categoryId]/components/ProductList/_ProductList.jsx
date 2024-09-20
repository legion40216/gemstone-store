"use client";
import React from 'react';
import ProductItem from './product-Item';
import { useProducts } from '@/app/actions/use-products';
import ProductSkeleton from './product-skeleton';

export default function ProductList({ categoryId, colorId, sizeId }) {
  const { products, isLoading } = useProducts({
    categoryId,
    colorId,
    sizeId,
  });

  // Show skeletons if loading or if there are no products yet
  if (isLoading || !products) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <ProductItem items={products} /> {/* Use initialData if products are not available */}
    </div>
  );
}