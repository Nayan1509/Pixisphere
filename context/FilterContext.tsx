import { createContext, useContext, useState, ReactNode } from "react";

export interface Filters {
  price: [number, number];
  rating: number;
  styles: string[];
  city: string;
  sortBy: string;
}

interface FilterContextType {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const defaultFilters: Filters = {
  price: [0, 20000],
  rating: 0,
  styles: [],
  city: "",
  sortBy: "",
};

const FilterContext = createContext<FilterContextType>({
  filters: defaultFilters,
  setFilters: () => {},
});

export const useFilterContext = () => useContext(FilterContext);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
