"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button"
import qs from "query-string"

const Filter = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const selectedValue = searchParams.get(valueKey);
  
  const onClick = (id) => {
    const current = qs.parse(searchParams.toString());
  
    const query = {
      ...current,
      [valueKey]: id
    };
  
    if (current[valueKey] === id) {
      query[valueKey] = null;
    }
  
    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, { skipNull: true });
  
    router.push(url);
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