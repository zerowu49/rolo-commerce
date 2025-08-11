"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div
      className="flex flex-col cursor-pointer p-4 hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 rounded-lg mb-4 relative overflow-hidden border border-gray-200">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 text-lg">
            {product.name}
          </h3>
          <span className="font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed h-16 mt-4">
          {product.description}
        </p>

        <div className="flex justify-end mt-10">
          <span className="font-bold text-gray-900">
            ${product.endPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
