import { create } from "zustand";

interface CartState {
  selectedCartItems: string[];
  checkoutInfo: CheckoutResponse | null;

  selectCartItem: (value: string) => void;
  deselectCartItem: (value: string) => void;
  toggleCartSelections: (allItems: string[]) => void;
  clearSelections: () => void;
  setCheckoutInfo: (info: CheckoutResponse | null) => void;
}

export const useCart = create<CartState>((set, get) => ({
  selectedCartItems: [],
  checkoutInfo: null,
  selectCartItem: (value) =>
    set((state) => {
      if (state.selectedCartItems.includes(value)) return state;

      return {
        selectedCartItems: [...state.selectedCartItems, value],
      };
    }),

  deselectCartItem: (value) =>
    set((state) => ({
      selectedCartItems: state.selectedCartItems.filter(
        (item) => item !== value
      ),
    })),

  toggleCartSelections: (allItems) =>
    set((state) => {
      const allSelected =
        state.selectedCartItems.length === allItems.length;

      return {
        selectedCartItems: allSelected ? [] : allItems,
      };
    }),

  clearSelections: () => set({ selectedCartItems: [] }),
  setCheckoutInfo: (info) => set({ checkoutInfo: info })
}));