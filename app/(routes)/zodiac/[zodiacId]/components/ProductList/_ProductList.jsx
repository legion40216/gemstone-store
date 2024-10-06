'use client'
import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import ProductItem from './product-Item'
import ProductListSkeleton from '../ProductListSkeleton/_ProductListSkeleton'
import { useProducts } from '@/app/actions/use-products'


export default function ProductList({ initialData }) {
  const params = useParams()
  const searchParams = useSearchParams();

  const zodiacId = params.zodiacId;
  const colorId = searchParams.get('colorId');
  const sizeId = searchParams.get('sizeId');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  // Use the useProducts hook to fetch data
  const { products, isLoading, isError } = useProducts({
    zodiacId,
    colorId,
    sizeId,
    maxPrice,
    minPrice,
    initialData,  // Pass initialData for the initial render
  });

  if (isLoading) {
    return <ProductListSkeleton />
  }

  if (isError) {
    return <div>Error loading products.</div>
  }

  return (
    <div className="space-y-5">
      <ProductItem 
        items={products}  // Render product items, fetched or from initialData
      />
    </div>
  )
}
