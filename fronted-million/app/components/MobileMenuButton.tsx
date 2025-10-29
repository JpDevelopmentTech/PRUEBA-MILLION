"use client";
import { X, Menu } from "lucide-react";

interface MobileMenuButtonProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function MobileMenuButton({ sidebarOpen, setSidebarOpen }: MobileMenuButtonProps) {
  return (
    <div className="lg:hidden fixed top-4 left-4 z-50">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-3 rounded-xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-lg"
      >
        {sidebarOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}

