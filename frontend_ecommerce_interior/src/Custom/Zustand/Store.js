import { create } from "zustand";

export const useFinalPriceStore = create((set) => ({
  final_price: 1,
  setFinalPrice: (value) => set({ final_price: value }),
}));
export const usePromotionStore = create((set) => ({
  promotion_id: "",
  setPromotion_id: (value) => set({ promotion_id: value }),
}));
