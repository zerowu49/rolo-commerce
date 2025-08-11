import { create } from "zustand";
import { Product } from "@/types/product";

export interface CartItem extends Product {
  variant?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, variant?: string) => void;
  removeFromCart: (productId: number, variant?: string) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartItems: () => CartItem[];
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (product: Product, variant?: string) => {
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product.id && item.variant === variant
      );

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return { items: updatedItems };
      } else {
        // Add new item
        return {
          items: [...state.items, { ...product, variant, quantity: 1 }],
        };
      }
    });
  },

  removeFromCart: (productId: number, variant?: string) => {
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.id === productId && item.variant === variant)
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  getCartItemCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getCartItems: () => {
    return get().items;
  },
}));
