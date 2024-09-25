import React from 'react'
import ProductSkeleton from './product-skeleton'

export default function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(6)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  )
}
