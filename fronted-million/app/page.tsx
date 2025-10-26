"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, DollarSign, Home, Filter, Sparkles, TrendingUp, Bed, Bath, Maximize, Plus } from "lucide-react";
import useProperties from "./hooks/useProperties";

export default function HomePage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000000);
  const { properties } = useProperties(name, address, priceMin, priceMax);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-72 h-72 bg-slate-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [-50, 50, -50],
            y: [50, -50, 50],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar with Filters */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-96 p-6 backdrop-blur-2xl bg-white/10 border-r border-white/20 shadow-2xl"
        >
          {/* Header */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-linear-to-br from-gray-600 to-slate-600">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Filtros</h2>
              <Sparkles className="w-5 h-5 text-gray-300 animate-pulse" />
            </div>
            <p className="text-white/60 text-sm">Encuentra tu propiedad ideal</p>
          </motion.div>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex mb-4 items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-gray-600 to-slate-600 text-white font-semibold hover:shadow-lg hover:shadow-gray-500/50 transition-all duration-300">
            <Plus className="w-4 h-4" />
            Nueva propiedad
          </motion.button>

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
                  <span className="text-white font-semibold text-sm">${priceMin.toLocaleString()}</span>
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
                  <span className="text-white font-semibold text-sm">${priceMax.toLocaleString()}</span>
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
                <span className="font-semibold">{properties.length}</span>
                <span className="text-white/60">propiedades encontradas</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Properties Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Propiedades Destacadas</h1>
            <p className="text-white/60">Descubre las mejores opciones para ti</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative overflow-hidden rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl hover:shadow-gray-500/50 transition-all duration-500">
                  {/* Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-700/30 to-slate-700/30 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Home className="w-16 h-16 text-white/40 group-hover:scale-110 transition-transform duration-500" />
          </div>
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 px-4 py-2 rounded-full backdrop-blur-xl bg-white/20 border border-white/30">
                      <div className="flex items-center gap-1 text-white font-bold">
                        <DollarSign className="w-4 h-4" />
                        <span>{property.price?.toLocaleString() || 'N/A'}</span>
          </div>
        </div>
      </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors duration-300">
                      {property.name}
                    </h3>
                    
                    <div className="flex items-start gap-2 text-white/70 mb-4">
                      <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                      <p className="text-sm">{property.address}</p>
                    </div>

                    {/* Features */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-1 text-white/60 text-sm">
                        <Bed className="w-4 h-4" />
                        <span>3</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/60 text-sm">
                        <Bath className="w-4 h-4" />
                        <span>2</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/60 text-sm">
                        <Maximize className="w-4 h-4" />
                        <span>120m²</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-gray-600 to-slate-600 text-white font-semibold hover:shadow-lg hover:shadow-gray-500/50 transition-all duration-300"
                    >
                      Ver Detalles
                    </motion.button>
                  </div>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['200% 0%', '-200% 0%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
            </div>
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
                <p className="text-white/60 text-center">No se encontraron propiedades</p>
                <p className="text-white/40 text-sm text-center mt-2">Intenta ajustar los filtros</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
