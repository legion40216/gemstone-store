'use client'
import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import ProductItem from './product-Item'
import ProductListSkeleton from '../ProductListSkeleton/_ProductListSkeleton'
import { useProducts } from '@/app/actions/use-products'


export default function ProductList({ initialData }) {
  const params = useParams()
  const searchParams = useSearchParams();

  const categoryId = params.categoryId;
  const colorId = searchParams.get('colorId');
  const sizeId = searchParams.get('sizeId');

  // Use the useProducts hook to fetch data
  const { products, isLoading, isError } = useProducts({
    categoryId,
    colorId,
    sizeId,
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
