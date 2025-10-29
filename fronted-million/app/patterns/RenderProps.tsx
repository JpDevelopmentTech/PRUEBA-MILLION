"use client";
import { ReactNode } from "react";

interface RenderPropsState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface DataFetcherProps<T> {
  fetchFunction: () => Promise<T>;
  children: (state: RenderPropsState<T> & { refetch: () => void }) => ReactNode;
  dependencies?: any[];
}

interface AsyncDataProps<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Render Props Component para manejo de datos asíncronos
export function DataFetcher<T>({ 
  fetchFunction, 
  children, 
  dependencies = [] 
}: DataFetcherProps<T>) {
  const [state, setState] = useState<RenderPropsState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await fetchFunction();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return (
    <>
      {children({
        ...state,
        refetch: fetchData,
      })}
    </>
  );
}

// Hook alternativo usando Render Props internamente
export function useAsyncData<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [state, setState] = useState<RenderPropsState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await fetchFunction();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    ...state,
    refetch: fetchData,
  };
}

// Componente de ejemplo usando Render Props
interface PropertyListProps {
  searchParams: {
    name: string;
    address: string;
    priceMin: number;
    priceMax: number;
  };
}

export function PropertyListWithRenderProps({ searchParams }: PropertyListProps) {
  return (
    <DataFetcher
      fetchFunction={() => getProperties(
        searchParams.name,
        searchParams.address,
        searchParams.priceMin,
        searchParams.priceMax
      )}
      dependencies={[searchParams.name, searchParams.address, searchParams.priceMin, searchParams.priceMax]}
    >
      {({ data, loading, error, refetch }) => {
        if (loading) {
          return (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          );
        }

        if (error) {
          return (
            <div className="text-center p-8">
              <p className="text-red-600 mb-4">Error: {error}</p>
              <button 
                onClick={refetch}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Reintentar
              </button>
            </div>
          );
        }

        if (!data || data.length === 0) {
          return (
            <div className="text-center p-8">
              <p className="text-gray-600">No se encontraron propiedades</p>
            </div>
          );
        }

        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-2">{property.name}</h3>
                <p className="text-gray-600 mb-2">{property.address}</p>
                <p className="text-lg font-semibold text-green-600">
                  ${property.price?.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        );
      }}
    </DataFetcher>
  );
}

// Import necesario para el ejemplo
import { getProperties } from "../services/properties";
import { useState, useEffect } from "react";
