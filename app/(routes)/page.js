import React from 'react'
import getBillboard from '../actions/get-billboards'
import Billboard from './_components/Billboard'
import getProducts from '../actions/get-products'
import ProductList from './_components/ProductList/_ProductList'

export const revalidate = 0

export default async function page() {
  const billboard = await getBillboard("ab0b3910-0048-496a-a446-0db5138f4ec6")
  const products = await getProducts()

  const featuredProducts = products.filter(product => product.isFeatured)
  const nonFeaturedProducts = products.filter(product => !product.isFeatured)

  return (
    <div className="space-y-16">
      <Billboard 
        data={billboard} 
        backgroundOverlay={false}
      />
      <ProductList 
        title="Featured products"
        items={featuredProducts}
      />
      <ProductList 
        title="Products"
        items={nonFeaturedProducts}
      />
    </div>
  )
}