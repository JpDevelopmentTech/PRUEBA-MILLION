"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

interface PropertyCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface PropertyCardSubComponents {
  Image: typeof PropertyCardImage;
  Content: typeof PropertyCardContent;
  Header: typeof PropertyCardHeader;
  Body: typeof PropertyCardBody;
  Footer: typeof PropertyCardFooter;
  Price: typeof PropertyCardPrice;
  Details: typeof PropertyCardDetails;
}

// Main Compound Component
function PropertyCard({ children, className = "", onClick }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`group relative cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// Sub-components
function PropertyCardImage({ 
  src, 
  alt, 
  className = "",
  overlay = true 
}: {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
}) {
  return (
    <div className={`relative h-[500px] lg:h-[600px] overflow-hidden rounded-lg ${className}`}>
      <Image
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        src={src}
        alt={alt}
        width={1920}
        height={1080}
      />
      {overlay && (
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
      )}
    </div>
  );
}

function PropertyCardContent({ 
  children, 
  className = "",
  position = "bottom" 
}: {
  children: ReactNode;
  className?: string;
  position?: "bottom" | "top" | "center";
}) {
  const positionClasses = {
    bottom: "bottom-0",
    top: "top-0",
    center: "top-1/2 -translate-y-1/2"
  };

  return (
    <div className={`absolute left-0 right-0 p-6 lg:p-8 ${positionClasses[position]} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-lg p-6 lg:p-8"
      >
        {children}
      </motion.div>
    </div>
  );
}

function PropertyCardHeader({ 
  children, 
  className = "" 
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

function PropertyCardBody({ 
  children, 
  className = "" 
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

function PropertyCardFooter({ 
  children, 
  className = "" 
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mt-4 ${className}`}>
      {children}
    </div>
  );
}

function PropertyCardPrice({ 
  price, 
  className = "" 
}: {
  price: number;
  className?: string;
}) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`text-xl lg:text-2xl font-sans font-bold text-black ${className}`}>
      {formatPrice(price)}
    </div>
  );
}

function PropertyCardDetails({ 
  bedrooms, 
  bathrooms, 
  squareFeet, 
  className = "" 
}: {
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {bedrooms && (
        <span className="text-sm lg:text-base font-sans text-black">
          {bedrooms} Beds
        </span>
      )}
      {bathrooms && (
        <span className="text-sm lg:text-base font-sans text-black">
          {bathrooms} Baths
        </span>
      )}
      {squareFeet && (
        <span className="text-sm lg:text-base font-sans text-black">
          {squareFeet.toLocaleString()} Sq. Ft.
        </span>
      )}
    </div>
  );
}

// Attach sub-components to main component
const PropertyCardCompound = PropertyCard as typeof PropertyCard & PropertyCardSubComponents;
PropertyCardCompound.Image = PropertyCardImage;
PropertyCardCompound.Content = PropertyCardContent;
PropertyCardCompound.Header = PropertyCardHeader;
PropertyCardCompound.Body = PropertyCardBody;
PropertyCardCompound.Footer = PropertyCardFooter;
PropertyCardCompound.Price = PropertyCardPrice;
PropertyCardCompound.Details = PropertyCardDetails;

export default PropertyCardCompound;
