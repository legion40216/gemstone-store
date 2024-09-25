"use client"
import React from 'react'
import ProductItem from './product-Item'

export default function ProductList({
    title,
    items
}) {
  return (
    <div className="space-y-5">
        <div>
             <h3 className="font-bold text-xl">
                {title}
             </h3>
        </div>
        <ProductItem 
        items={items}
        />
    </div>
  )
}