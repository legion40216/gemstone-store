import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

const useCart = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (data, count = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        
        if (existingItem) {
          const newCount = Math.min(count, data.quantity);
          set({
            items: currentItems.map((item) =>
              item.id === data.id ? { ...item, count: newCount } : item
            ),
          });
          toast.success('Item quantity updated in cart.');
        } else {
          const newCount = Math.min(count, data.quantity);
          set({ items: [...currentItems, { ...data, count: newCount }] });
          toast.success('Item added to cart.');
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success('Item removed from the cart.');
      },

      removeAll: () => {
        set({ items: [] });
      },

      getItemCount: (id) => {
        const item = get().items.find((item) => item.id === id);
        return item ? item.count : 0;
      },

      getTotalCount: () => {
        return get().items.reduce((total, item) => total + item.count, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.count, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
