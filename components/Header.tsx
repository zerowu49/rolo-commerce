"use client";

import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/store/cartStore";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const router = useRouter();
  const cartItemCount = useCartStore((state) => state.getCartItemCount());

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <header className="bg-white">
      <div className="px-10 py-8">
        <div className="flex items-center justify-between gap-[20vw]">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              <Image
                src="/images/ROLO.png"
                alt="ROLO"
                width={100}
                height={100}
              />
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="w-[30vw]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button className="btn-secondary" disabled>
                Filters
              </button>
              <button
                onClick={handleCartClick}
                className={`relative ${
                  cartItemCount === 0 ? "btn-secondary" : "btn-primary"
                }`}
              >
                Your Cart
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
