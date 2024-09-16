import { create } from "zustand";


// Create modal for opening and closing modal for authentication


interface ModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useAuthModal = create<ModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));