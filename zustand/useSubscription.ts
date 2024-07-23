import { create } from "zustand";

const useIsSubscribed = create((set) => ({
  isSubscribed: false,
  setIsSubscribed: (isSubscribed: boolean) => set({ isSubscribed }),
}));

export default useIsSubscribed;