"use client";
import { useEffect, useState } from "react";
import { PropertyDetail } from "../interfaces/properties";
import { getProperty } from "../services/properties";

export default function useProperty(id: string) {
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  useEffect(() => {
    getProperty(id)
      .then((data) => setProperty(data))
      .catch((error) => console.error("Error fetching property:", error));
  }, [id]);
  return { property };
}
