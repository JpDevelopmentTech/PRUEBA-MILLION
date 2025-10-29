"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, DollarSign, Home, Filter, Sparkles, TrendingUp } from "lucide-react";

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
  name: string;
  setName: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  priceMin: number;
  setPriceMin: (value: number) => void;
  priceMax: number;
  setPriceMax: (value: number) => void;
  propertiesCount: number;
}

export default function FilterSidebar({
  isOpen = true,
  onClose,
  isMobile = false,
  name,
  setName,
  address,
  setAddress,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  propertiesCount,
}: FilterSidebarProps) {
  const filtersContent = (
    <>
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-gray-600 to-slate-600">
            <Filter className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Filtros</h2>
          <Sparkles className="w-5 h-5 text-gray-300 animate-pulse" />
        </div>
        <p className="text-white/60 text-sm">Encuentra tu propiedad ideal</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col gap-6">
        {/* Name Filter */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="group"
        >
          <label className="flex items-center gap-2 text-white/80 text-sm font-medium mb-2">
            <Home className="w-4 h-4" />
            Nombre de la Propiedad
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Buscar por nombre..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
            />
          </div>
        </motion.div>

        {/* Address Filter */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="group"
        >
          <label className="flex items-center gap-2 text-white/80 text-sm font-medium mb-2">
            <MapPin className="w-4 h-4" />
            Dirección
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Buscar por ubicación..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
            />
          </div>
        </motion.div>

        {/* Price Range */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="group"
        >
          <label className="flex items-center gap-2 text-white/80 text-sm font-medium mb-3">
            <DollarSign className="w-4 h-4" />
            Rango de Precio
          </label>

          {/* Min Price */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-xs">Precio Mínimo</span>
              <span className="text-white font-semibold text-sm">
                ${priceMin.toLocaleString()}
              </span>
            </div>
            <input
              value={priceMin}
              onChange={(e) => setPriceMin(Number(e.target.value))}
              type="range"
              min={0}
              max={1000000}
              step={10000}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>

          {/* Max Price */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-xs">Precio Máximo</span>
              <span className="text-white font-semibold text-sm">
                ${priceMax.toLocaleString()}
              </span>
            </div>
            <input
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              type="range"
              min={0}
              max={1000000}
              step={10000}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 p-4 rounded-xl bg-gradient-to-r from-gray-600/20 to-slate-600/20 border border-white/20 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span className="font-semibold">{propertiesCount}</span>
            <span className="text-white/60">propiedades encontradas</span>
          </div>
        </motion.div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            />
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-80 max-w-[85vw] p-6 backdrop-blur-2xl bg-white/10 border-r border-white/20 shadow-2xl overflow-y-auto z-40"
            >
              {filtersContent}
              <button
                onClick={onClose}
                className="mt-6 w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-medium"
              >
                Cerrar
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden lg:block w-96 p-6 backdrop-blur-2xl bg-white/10 border-r border-white/20 shadow-2xl overflow-y-auto"
    >
      {filtersContent}
    </motion.div>
  );
}

