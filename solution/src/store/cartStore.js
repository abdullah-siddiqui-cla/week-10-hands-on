import { create } from "zustand";

/** Each "Add to order" appends one row so cart length matches README. */
export const useCartStore = create((set) => ({
  cartItems: [],
  addItem: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
    })),
  removeItem: (index) =>
    set((state) => ({
      cartItems: state.cartItems.filter((_, i) => i !== index),
    })),
  clearCart: () => set({ cartItems: [] }),
}));
