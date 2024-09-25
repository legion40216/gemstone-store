"use client";
import useSWR from 'swr';
import qs from 'query-string';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useProducts = ({ categoryId, colorId, sizeId, initialData }) => {
  const url = qs.stringifyUrl({
    url: `${API_URL}/products`,
    query: {
      categoryId,
      colorId,
      sizeId,
      isArchived: false,
    },
  });

  const { data, error, isValidating } = useSWR(url, fetcher, {
    fallbackData: initialData,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    products: data,
    isLoading: isValidating,
    isError: !!error,
  };
};
