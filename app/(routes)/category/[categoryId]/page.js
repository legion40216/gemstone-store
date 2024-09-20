import Billboard from '../../_components/Billboard'
import Filter from './components/Filter'
import MobileFilters from './components/MobileFilters'
import getCategory from '@/app/actions/get-category'
import getColors from '@/app/actions/get-colors'
import getSizes from '@/app/actions/get-sizes'
import getProducts from '@/app/actions/get-products'
import ProductList from './components/ProductList/_ProductList'

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

  if (!category) {
    return 
  }
  
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
          <div className="col-span-4">
            {/* Pass products as initialData to ProductList */}
            <ProductList 
              categoryId={params.categoryId}
              colorId={searchParams.colorId}
              sizeId={searchParams.sizeId}
              initialData={products} // <-- Here
            />
          </div>
        </div>
      </div>
    </div>
  )
}