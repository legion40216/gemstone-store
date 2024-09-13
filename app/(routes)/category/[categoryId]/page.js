import getColors from '@/app/actions/get-colors'
import getProducts from '@/app/actions/get-products'
import Billboard from '../../_components/Billboard'
import getSizes from '@/app/actions/get-sizes'
import getCategory from '@/app/actions/get-category'
import Filter from './components/Filter'

import ProductCard from '../../../../components/custom-ui/ProductCard/_ProductCard'
import MobileFilters from './components/mobile-filters'

export const revalidate = 0

export default async function Page({ params, searchParams }) {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  })

  const sizes = await getSizes()
  const colors = await getColors()
  const category = await getCategory(params.categoryId)

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
            />
            <Filter
              valueKey="colorId"
              name="Colors"
              data={colors}
            />
          </div>
          <div className="lg:col-span-4">
            {products.length === 0 && <div>No results found.</div>}
            <div className="multiple-grid gap-3">
              {products.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}