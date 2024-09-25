import NoResults from '@/components/custom-ui/no-results'
import ProductCard from '@/app/(routes)/_components/ProductCard/_ProductCard'
import React from 'react'

export default function ProductItem({
    items
}) {
  return (
    <div>
    {items.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(170px,1fr))]">
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
  )
}
