"use client";
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Filter = ({ data, name, valueKey, setOpen }) => {
  const searchParams = useSearchParams();
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

    window.history.pushState(null, '', `?${params.toString()}`)
    
    // Close the sheet
    setOpen(false);
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