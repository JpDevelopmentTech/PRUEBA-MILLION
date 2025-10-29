"use client";
import { ComponentType, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";

interface WithErrorHandlingProps {
  error?: string | null;
  onRetry?: () => void;
}

interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export function withErrorHandling<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  return function WithErrorHandlingComponent(props: P & WithErrorHandlingProps) {
    const [loadingState, setLoadingState] = useState<LoadingState>({
      isLoading: false,
      error: null,
    });

    const handleError = (error: string) => {
      setLoadingState(prev => ({
        ...prev,
        isLoading: false,
        error,
      }));
    };

    const handleLoading = (isLoading: boolean) => {
      setLoadingState(prev => ({
        ...prev,
        isLoading,
        error: isLoading ? null : prev.error,
      }));
    };

    const handleRetry = () => {
      setLoadingState({
        isLoading: false,
        error: null,
      });
      if (props.onRetry) {
        props.onRetry();
      }
    };

    // Error UI
    if (loadingState.error) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg"
        >
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Algo salió mal
          </h3>
          <p className="text-red-600 text-center mb-4">
            {loadingState.error}
          </p>
          <motion.button
            onClick={handleRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reintentar
          </motion.button>
        </motion.div>
      );
    }

    // Loading UI
    if (loadingState.isLoading) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center p-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full mb-4"
          />
          <p className="text-gray-600">Cargando...</p>
        </motion.div>
      );
    }

    return (
      <WrappedComponent
        {...props}
        onError={handleError}
        onLoading={handleLoading}
      />
    );
  };
}

// Hook para usar el HOC
export function useErrorHandling() {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    error: null,
  });

  const handleError = (error: string) => {
    setLoadingState(prev => ({
      ...prev,
      isLoading: false,
      error,
    }));
  };

  const handleLoading = (isLoading: boolean) => {
    setLoadingState(prev => ({
      ...prev,
      isLoading,
      error: isLoading ? null : prev.error,
    }));
  };

  const handleRetry = () => {
    setLoadingState({
      isLoading: false,
      error: null,
    });
  };

  return {
    ...loadingState,
    handleError,
    handleLoading,
    handleRetry,
  };
}
