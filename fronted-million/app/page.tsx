"use client";
import { useState } from "react";
import useProperties from "./hooks/useProperties";
import { useRouter } from "next/navigation";
import AnimatedBackground from "./components/AnimatedBackground";
import MobileMenuButton from "./components/MobileMenuButton";
import FilterSidebar from "./components/FilterSidebar";
import PropertyGrid from "./components/PropertyGrid";

export default function HomePage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000000);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { properties } = useProperties(name, address, priceMin, priceMax);
  const router = useRouter();

  const handleViewDetails = (id: string) => {
    router.push(`/property/${id}`);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Mobile Menu Button */}
      <MobileMenuButton sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row h-screen">
        {/* Desktop Sidebar */}
        <FilterSidebar
          name={name}
          setName={setName}
          address={address}
          setAddress={setAddress}
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          propertiesCount={properties.length}
        />

        {/* Mobile Sidebar */}
        <FilterSidebar
          isMobile
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          name={name}
          setName={setName}
          address={address}
          setAddress={setAddress}
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          propertiesCount={properties.length}
        />

        {/* Properties Grid */}
        <PropertyGrid properties={properties} onViewDetails={handleViewDetails} />
      </div>
    </div>
  );
}
