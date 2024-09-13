import qs from "query-string"

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProducts = async ( query = {}) => {
  const url = qs.stringifyUrl({
    url: API_URL,
    query: {
      categoryId: query.categoryId,
      sizeId: query.sizeId,
      colorId: query.colorId,
      isFeatured: query.isFeatured,
      isArchived: query.isArchived,
    }
  });
  console.log(url)
  const res = await fetch(url);
  return res.json();
};


export default getProducts;