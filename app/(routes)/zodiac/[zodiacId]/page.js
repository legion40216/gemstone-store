import Filter from './components/Filter'
import MobileFilters from './components/MobileFilters'
import getColors from '@/app/actions/get-colors'
import getSizes from '@/app/actions/get-sizes'
import getProducts from '@/app/actions/get-products'
import ProductList from './components/ProductList/_ProductList'

export const revalidate = 0 // ISR: Revalidate every request

export default async function Page({ params, searchParams }) {
  const { products, maxPrice } = await getProducts({
    zodiacId: params.zodiacId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
  });

  const sizes = await getSizes();
  const colors = await getColors();

  return (
    <div className="space-y-4">
      <div>
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <MobileFilters sizes={sizes} colors={colors} maxPrice={maxPrice} />
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
            <Filter
              valueKey="priceRange"
              name="Price Range"
              maxPrice={maxPrice}
            />
          </div>
          <div className="col-span-4">
            <ProductList initialData={products} />
          </div>
        </div>
      </div>
    </div>
  );
}