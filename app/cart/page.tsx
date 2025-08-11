"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { items } = useCartStore();

  const handleBack = () => {
    router.back();
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const cartItems = items;

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className=" mx-auto px-60 py-16">
        {/* Cart Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold ">Your Cart</h1>
          <span className="text-xl text-grey">
            {getItemCount()} {getItemCount() > 1 ? "items" : "item"}
          </span>
        </div>

        {/* Cart Items */}
        <div className="space-y-6 mb-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <button
                onClick={() => router.push("/")}
                className="mt-4 bg-green-200 hover:bg-green-800 text-white px-6 py-3 rounded-md transition-colors"
              >
                Check the product
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={`pb-6 ${
                  index < cartItems.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div className="flex items-center space-x-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <span className="text-xl font-semibold text-green-100">
                        ${item.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-description mb-2">
                        {item.variant ||
                          (item.colorChoice
                            ? Object.keys(item.colorChoice)[0]
                            : "Default")}
                      </p>
                      <span className="text-description">
                        {item.quantity} {item.quantity > 1 ? "units" : "unit"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Sticky Bottom Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-description hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back</span>
            </button>

            <div className="flex items-center space-x-8">
              <span className="text-2xl text-green-100">
                Total ${calculateTotal().toLocaleString()}
              </span>
              <button
                onClick={handleCheckout}
                className="bg-green-200 hover:bg-green-800 text-white px-6 py-3 rounded-md transition-colors flex items-center space-x-2"
              >
                <span>Check Out</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
