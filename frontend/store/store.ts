import create from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface StoreState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const useStore = create<StoreState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  clearCart: () =>
    set(() => ({
      cart: [],
    })),
}));

export default useStore;
