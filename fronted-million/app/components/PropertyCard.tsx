"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    address: string;
    price?: number;
    images: string[];
    bedrooms?: number;
    bathrooms?: number;
    squareFeet?: number;
  };
  onViewDetails: (id: string) => void;
}

export default function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const formatPrice = (price?: number) => {
    if (!price) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative cursor-pointer"
      onClick={() => onViewDetails(property.id)}
    >
      {/* Main Image Container */}
      <div className="relative h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
        <Image
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          src={property.images[0]}
          alt={property.name}
          width={1920}
          height={1080}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
      </div>

      {/* Information Card - Overlapping */}
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 lg:p-8"
        >
          {/* Property Name */}
          <h3 className="text-lg lg:text-xl font-sans font-semibold text-black mb-2">
            {property.name}
          </h3>

          {/* Address */}
          <p className="text-lg lg:text-xl font-sans font-bold text-black mb-3">
            {property.address}
          </p>

          {/* Property Details */}
          <div className="flex items-center gap-4 mb-4">
            {property.bedrooms && (
              <span className="text-sm lg:text-base font-sans text-black">
                {property.bedrooms} Beds
              </span>
            )}
            {property.bathrooms && (
              <span className="text-sm lg:text-base font-sans text-black">
                {property.bathrooms} Baths
              </span>
            )}
            {property.squareFeet && (
              <span className="text-sm lg:text-base font-sans text-black">
                {property.squareFeet.toLocaleString()} Sq. Ft.
              </span>
            )}
          </div>

          {/* Price */}
          <div className="text-xl lg:text-2xl font-sans font-bold text-black">
            {formatPrice(property.price)}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

