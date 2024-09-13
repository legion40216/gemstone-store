import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (data) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        
        if (existingItem) {
          return toast.info('Item already in cart.');
        }
        
        set({ items: [...currentItems, data] });
        toast.success('Item added to cart.');
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success('Item removed from the cart.');
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;