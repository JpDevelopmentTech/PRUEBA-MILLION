"use client";
import { useEffect, useState } from "react";
import { Property } from "../interfaces/properties";
import { getProperties } from "../services/properties";

export default function useProperties( name: string, address: string, priceMin: number, priceMax: number ) {
  const [properties, setProperties] = useState<Property[]>([]);
  useEffect(() => {
    getProperties(name, address, priceMin, priceMax)
      .then((data) => setProperties(data))
      .catch((error) => console.error("Error fetching properties:", error));
  }, [name, address, priceMin, priceMax]);

  return { properties };
}
