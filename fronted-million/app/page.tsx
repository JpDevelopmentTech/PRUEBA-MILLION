"use client";
import useProperties from "./hooks/useProperties";
import { useRouter } from "next/navigation";
import { useFilterContext } from "./contexts/FilterContext";
import AnimatedBackground from "./components/AnimatedBackground";
import MobileMenuButton from "./components/MobileMenuButton";
import FilterSidebar from "./components/FilterSidebar";
import PropertyGrid from "./components/PropertyGrid";

export default function HomePage() {
  const { filters, setName, setAddress, setPriceMin, setPriceMax, setSidebarOpen } = useFilterContext();
  const { properties } = useProperties(filters.name, filters.address, filters.priceMin, filters.priceMax);
  const router = useRouter();

  const handleViewDetails = (id: string) => {
    router.push(`/property/${id}`);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">

      <AnimatedBackground />


      <MobileMenuButton sidebarOpen={filters.sidebarOpen} setSidebarOpen={setSidebarOpen} />


      <div className="relative z-10 flex flex-col lg:flex-row h-screen">
   
        <FilterSidebar
          name={filters.name}
          setName={setName}
          address={filters.address}
          setAddress={setAddress}
          priceMin={filters.priceMin}
          setPriceMin={setPriceMin}
          priceMax={filters.priceMax}
          setPriceMax={setPriceMax}
          propertiesCount={properties.length}
        />

        <FilterSidebar
          isMobile
          isOpen={filters.sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          name={filters.name}
          setName={setName}
          address={filters.address}
          setAddress={setAddress}
          priceMin={filters.priceMin}
          setPriceMin={setPriceMin}
          priceMax={filters.priceMax}
          setPriceMax={setPriceMax}
          propertiesCount={properties.length}
        />

        <PropertyGrid properties={properties} onViewDetails={handleViewDetails} />
      </div>
    </div>
  );
}
