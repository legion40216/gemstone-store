import qs from 'query-string';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

const getProducts = async (query = {}) => {
  const url = qs.stringifyUrl({
    url: `${API_URL}/products`,
    query: {
      categoryId: query.categoryId,
      colorId: query.colorId,
      sizeId: query.sizeId,
      isArchived: false,
      ...query,
    },
  });

  return fetcher(url);
};

export default getProducts;