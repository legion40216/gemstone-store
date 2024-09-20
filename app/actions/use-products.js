"use client";
import useSWR from 'swr';
import qs from 'query-string';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetcher = (url) => fetch(url).then((res) => res.json());

// // Function to simulate a delay
// const delayedFetcher = (url, delay = 2000) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       fetch(url)
//         .then((res) => res.json())
//         .then(resolve);
//     }, delay); // Adjust the delay time as needed
//   });
// };

export const useProducts = ({ categoryId, colorId, sizeId }) => {
  const url = qs.stringifyUrl({
    url: `${API_URL}/products`,
    query: {
      categoryId,
      colorId,
      sizeId,
      isArchived: false,
    },
  });

  const { data, error, isValidating } = useSWR(url, fetcher);

  // Determine if we should show loading state
  const isLoading = !data && isValidating;

  return {
    products: data,
    isLoading,
    isError: error,
  };
};