import getProduct from '@/app/actions/get-product'
import getProducts from '@/app/actions/get-products'
import React from 'react'
import ProductList from '../../_components/ProductList/_ProductList'

import ProductDetails from './components/ProductDetails'
import Gallery from '@/components/custom-ui/Gallery/_Gallery'
import { Separator } from '@/components/ui/separator'


export default async function Page({params}) {

  const product = await getProduct(params.productId)
  
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
    excludeProductId: product.id // Add this to exclude the current product from suggestions
  })

  return (
<div className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div>
      <Gallery images={product.images} />
    </div>
    <div className=" space-y-8">
      <div>
        <ProductDetails product={product} />
      </div>
    </div>
  </div>
  
  <Separator />  

  <ProductList 
  title="Related Items" 
  items={suggestedProducts}
  />
</div>
  )
}