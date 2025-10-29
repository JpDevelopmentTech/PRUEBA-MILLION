"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface FilterState {
  name: string;
  address: string;
  priceMin: number;
  priceMax: number;
  sidebarOpen: boolean;
}

interface FilterContextType {
  filters: FilterState;
  setName: (name: string) => void;
  setAddress: (address: string) => void;
  setPriceMin: (priceMin: number) => void;
  setPriceMax: (priceMax: number) => void;
  setSidebarOpen: (open: boolean) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [filters, setFilters] = useState<FilterState>({
    name: "",
    address: "",
    priceMin: 0,
    priceMax: 1000000,
    sidebarOpen: false,
  });

  const setName = (name: string) => {
    setFilters(prev => ({ ...prev, name }));
  };

  const setAddress = (address: string) => {
    setFilters(prev => ({ ...prev, address }));
  };

  const setPriceMin = (priceMin: number) => {
    setFilters(prev => ({ ...prev, priceMin }));
  };

  const setPriceMax = (priceMax: number) => {
    setFilters(prev => ({ ...prev, priceMax }));
  };

  const setSidebarOpen = (sidebarOpen: boolean) => {
    setFilters(prev => ({ ...prev, sidebarOpen }));
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      address: "",
      priceMin: 0,
      priceMax: 1000000,
      sidebarOpen: false,
    });
  };

  const value: FilterContextType = {
    filters,
    setName,
    setAddress,
    setPriceMin,
    setPriceMax,
    setSidebarOpen,
    resetFilters,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
}
