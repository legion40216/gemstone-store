"use client"
import Billboard from '@/app/(routes)/_components/Billboard';
import { useState, useMemo } from 'react';



  import React from 'react'
import MobileFilters from './mobile-filters';

import ProductCard from '@/components/custom-ui/ProductCard/_ProductCard';
import Filter from './Filter';
  
  export default function ProductFilter({ products, sizes, colors, category }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
  
    // Filter products based on size and color using useMemo for optimization
    const filteredProducts = useMemo(() => {
      return products.filter(product => {
        const matchesSize = selectedSize ? product.sizeId === selectedSize : true;
        const matchesColor = selectedColor ? product.colorId === selectedColor : true;
        return matchesSize && matchesColor;
      });
    }, [products, selectedSize, selectedColor]);
  
    return (
        <div className="space-y-4">
        <Billboard data={category.billboard} />
        <div>
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter
                valueKey="sizeId"
                name="Sizes"
                data={sizes}
                selectedValue={selectedSize}
                onSelect={setSelectedSize}
              />
              <Filter
                valueKey="colorId"
                name="Colors"
                data={colors}
                selectedValue={selectedColor}
                onSelect={setSelectedColor}
              />
            </div>
            <div className="lg:col-span-4">
              {filteredProducts.length === 0 && <div>No results found.</div>}
              <div className="multiple-grid gap-3">
                {filteredProducts.map(item => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  