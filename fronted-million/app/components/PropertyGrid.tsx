"use client";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import PropertyCard from "./PropertyCard";

interface Property {
  id: string;
  name: string;
  address: string;
  price?: number;
  images: string[];
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
}

interface PropertyGridProps {
  properties: Property[];
  onViewDetails: (id: string) => void;
}

export default function PropertyGrid({ properties, onViewDetails }: PropertyGridProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-black mb-4 tracking-wide">
            RECENT TRANSACTIONS
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PropertyCard property={property} onViewDetails={onViewDetails} />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {properties.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-96"
          >
            <div className="p-8 rounded-lg bg-gray-50 border border-gray-200">
              <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-center">
                No se encontraron propiedades
              </p>
              <p className="text-gray-400 text-sm text-center mt-2">
                Intenta ajustar los filtros
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

