"use client";
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import React,{useState} from 'react';

const Filter = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams.get(valueKey);
  const onClick = (id) => {
    // Create a copy of the current URLSearchParams
    const params = new URLSearchParams(searchParams);

    // If the value is already selected, remove it; otherwise, update it
    if (params.get(valueKey) === id) {
      params.delete(valueKey); // Remove the parameter to "deselect"
    } else {
      params.set(valueKey, id); // Update the parameter with the new value
    }

    // Construct the new URL with updated search params
    const url = `${window.location.pathname}?${params.toString()}`;

    // Use router.replace to update the URL without refreshing the page
    router.replace(url, { scroll: false }); // Prevents page refresh
  };

  return (
      <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <Button
            key={filter.id}
            onClick={() => onClick(filter.id)}
            variant={selectedValue === filter.id ? "default" : "outline"}
          >
            {filter.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Filter;

// import React,{useState} from 'react';
// const [plusone, setPlusone] = useState(0)
// console.log(plusone)  setPlusone(plusone+1)