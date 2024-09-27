import { create } from "zustand";

export type ModalType = "INITIAL_DAY_SETUP" | "ADD_DAY" | "REMOVE_DAY" | "ONBOARD_AMBASSADOR" | "MEETING_OPEN"

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data?: any;
  onOpen: (type: ModalType , data?:any) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type , data={}) => set({ isOpen: true, type , data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
