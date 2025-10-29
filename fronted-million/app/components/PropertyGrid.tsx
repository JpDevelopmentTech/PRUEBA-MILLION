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
}

interface PropertyGridProps {
  properties: Property[];
  onViewDetails: (id: string) => void;
}

export default function PropertyGrid({ properties, onViewDetails }: PropertyGridProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
          Propiedades Destacadas
        </h1>
        <p className="text-white/60 text-sm md:text-base">
          Descubre las mejores opciones para ti
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 pb-8">
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
          <div className="p-8 rounded-3xl backdrop-blur-2xl bg-white/10 border border-white/20">
            <Home className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <p className="text-white/60 text-center">
              No se encontraron propiedades
            </p>
            <p className="text-white/40 text-sm text-center mt-2">
              Intenta ajustar los filtros
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

