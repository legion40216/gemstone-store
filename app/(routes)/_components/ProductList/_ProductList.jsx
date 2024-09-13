"use client"
import React from 'react'
import NoResults from '@/components/custom-ui/no-results'
import ProductCard from '@/components/custom-ui/ProductCard/_ProductCard'

export default function ProductList({
    title,
    items
}) {
  return (
    <div className="space-y-5">
        <div>
             <h3 className="font-bold text-3xl">
                {title}
             </h3>
        </div>
        <div>
            {items.length > 0 ? (
                <div className="multiple-grid gap-3">
                    {items.map((item) => (
                      <ProductCard 
                        key={item.id}
                        item={item}
                      />
                    ))}
                </div>
            ) : ( 
              <NoResults/>
            )}
        </div>
    </div>
  )
}