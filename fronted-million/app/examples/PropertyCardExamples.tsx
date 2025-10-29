"use client";
import PropertyCardCompound from "../components/PropertyCardCompound";

interface ExamplePropertyCardProps {
  property: {
    id: string;
    name: string;
    address: string;
    price: number;
    images: string[];
    bedrooms?: number;
    bathrooms?: number;
    squareFeet?: number;
  };
  onViewDetails: (id: string) => void;
}

// Ejemplo usando el Compound Pattern
export default function ExamplePropertyCard({ property, onViewDetails }: ExamplePropertyCardProps) {
  return (
    <PropertyCardCompound onClick={() => onViewDetails(property.id)}>
      <PropertyCardCompound.Image 
        src={property.images[0]} 
        alt={property.name}
      />
      
      <PropertyCardCompound.Content>
        <PropertyCardCompound.Header>
          <h3 className="text-lg lg:text-xl font-sans font-semibold text-black mb-2">
            {property.name}
          </h3>
          <p className="text-lg lg:text-xl font-sans font-bold text-black mb-3">
            {property.address}
          </p>
        </PropertyCardCompound.Header>

        <PropertyCardCompound.Body>
          <PropertyCardCompound.Details
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            squareFeet={property.squareFeet}
            className="mb-4"
          />
        </PropertyCardCompound.Body>

        <PropertyCardCompound.Footer>
          <PropertyCardCompound.Price price={property.price} />
        </PropertyCardCompound.Footer>
      </PropertyCardCompound.Content>
    </PropertyCardCompound>
  );
}

// Ejemplo alternativo con layout diferente
export function AlternativePropertyCard({ property, onViewDetails }: ExamplePropertyCardProps) {
  return (
    <PropertyCardCompound onClick={() => onViewDetails(property.id)}>
      <PropertyCardCompound.Image 
        src={property.images[0]} 
        alt={property.name}
        className="h-[400px]"
      />
      
      {/* Content en el centro */}
      <PropertyCardCompound.Content position="center">
        <PropertyCardCompound.Header>
          <PropertyCardCompound.Price price={property.price} />
        </PropertyCardCompound.Header>
        
        <PropertyCardCompound.Body>
          <h3 className="text-xl font-bold text-black mb-2">
            {property.name}
          </h3>
          <p className="text-gray-600 mb-2">
            {property.address}
          </p>
        </PropertyCardCompound.Body>
      </PropertyCardCompound.Content>
    </PropertyCardCompound>
  );
}
