"use client";
import { motion } from "framer-motion";
import { MapPin, DollarSign } from "lucide-react";
import Image from "next/image";

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    address: string;
    price?: number;
    images: string[];
  };
  onViewDetails: (id: string) => void;
}

export default function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative overflow-hidden rounded-xl md:rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl hover:shadow-gray-500/50 transition-all duration-500">
        {/* Image */}
        <div className="relative h-40 md:h-48 bg-gradient-to-br from-gray-700/30 to-slate-700/30 overflow-hidden">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              className="object-cover w-full h-full"
              src={property.images[0]}
              alt={property.name}
              width={1920}
              height={1080}
            />
          </div>
          {/* Price Badge */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-xl bg-white/20 border border-white/30">
            <div className="flex items-center gap-1 text-white font-bold text-sm md:text-base">
              <DollarSign className="w-3 h-3 md:w-4 md:h-4" />
              <span>{property.price?.toLocaleString() || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
            {property.name}
          </h3>

          <div className="flex items-start gap-2 text-white/70 mb-4">
            <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
            <p className="text-sm">{property.address}</p>
          </div>

          {/* Action Button */}
          <motion.button
            onClick={() => onViewDetails(property.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 md:mt-4 w-full py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-gray-600 to-slate-600 text-white font-semibold hover:shadow-lg hover:shadow-gray-500/50 transition-all duration-300 text-sm md:text-base"
          >
            Ver Detalles
          </motion.button>
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: ["200% 0%", "-200% 0%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      </div>
    </motion.div>
  );
}

