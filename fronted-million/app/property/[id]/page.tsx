"use client";
import useProperty from '@/app/hooks/useProperty';
import React, { use } from 'react'
import Image from 'next/image';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { property } = useProperty(id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-gray-800 to-gray-600 px-8 py-6">
            <h1 className="text-4xl font-bold text-white mb-2">{property.name}</h1>
            <p className="text-gray-200 text-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.address}
            </p>
          </div>

          <div className="px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200">
                <p className="text-gray-600 text-sm font-semibold mb-1">Precio</p>
                <p className="text-3xl font-bold text-gray-800">{formatPrice(property.price)}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200">
                <p className="text-gray-600 text-sm font-semibold mb-1">Código Interno</p>
                <p className="text-2xl font-bold text-gray-800">{property.codeInternal}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200">
                <p className="text-gray-600 text-sm font-semibold mb-1">Año</p>
                <p className="text-2xl font-bold text-gray-800">{property.year}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Owner Section */}
          {property.owner && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800 to-gray-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Propietario
                  </h2>
                </div>
                <div className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative w-32 h-32 mb-4">
                      <Image
                        src={property.owner.photo}
                        alt={property.owner.name}
                        fill
                        className="rounded-full object-cover border-4 border-gray-200 shadow-lg"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 text-center">{property.owner.name}</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <svg className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Dirección</p>
                        <p className="text-sm text-gray-700">{property.owner.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <svg className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Fecha de Nacimiento</p>
                        <p className="text-sm text-gray-700">{formatDate(property.owner.birthday)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Images and Traces Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Images Gallery */}
            {property.images.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800 to-gray-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Galería de Imágenes
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.images.filter(img => img.enabled).map((image) => (
                      <div key={image.idPropertyImage} className="relative h-64 group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
                        <Image
                          src={image.file}
                          alt={`Property image ${image.idPropertyImage}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Property Traces */}
            {property.traces.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-gray-800 to-gray-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Historial de Transacciones
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {property.traces.map((trace) => (
                      <div key={trace.idPropertyTrace} className="border-l-4 border-gray-400 bg-gradient-to-r from-gray-50 to-gray-100 rounded-r-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{trace.name}</h3>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(trace.dateSale)}
                            </p>
                          </div>
                          <div className="flex gap-4">
                            <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                              <p className="text-xs text-gray-500 font-semibold">Valor</p>
                              <p className="text-lg font-bold text-gray-800">{formatPrice(trace.value)}</p>
                            </div>
                            <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                              <p className="text-xs text-gray-500 font-semibold">Impuesto</p>
                              <p className="text-lg font-bold text-gray-800">{formatPrice(trace.tax)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-900 hover:to-gray-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}
