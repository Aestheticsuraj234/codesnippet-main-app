
import { create } from 'zustand';
import { Group } from '@/lib/tutorial/menu-list';

interface MenuStore {
 menuList: Group[];
 setMenuList: (menuList: Group[]) => void;
 isSubDone: boolean;
 setIsDone: (isDone: boolean) => void;
}

export const useMenu = create<MenuStore>((set) => ({
 menuList: [],
 setMenuList: (menuList) => set({ menuList }),
 isSubDone: false,
  setIsDone: (isDone) => set({ isSubDone: isDone }),
}));



