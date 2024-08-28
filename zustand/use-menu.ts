import { getMenuList } from '@/lib/tutorial/menu-list';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Group } from '@/lib/tutorial/menu-list';

interface MenuStore {
  isLoading: boolean;
  isFirstLoad: boolean;
  menuList: Group[];
  fetchMenuList: (pathname: string, params: string) => Promise<void>;
}

export const useMenuStore = create<MenuStore>()(
  immer((set, get) => ({
    isLoading: false,
    isFirstLoad: true, // New state to track the first load
    menuList: [],
    fetchMenuList: async (pathname, params) => {
      const { menuList, isFirstLoad } = get();

      if (menuList.length === 0 || isFirstLoad) {
        set((state) => {
          state.isLoading = true;
          state.isFirstLoad = false; // After the first load, this will be false
        });

        try {
          const menu = await getMenuList(pathname, params);
          set((state) => {
            state.menuList = menu;
          });
        } catch (error) {
          console.error('Failed to fetch menu list:', error);
        } finally {
          set((state) => {
            state.isLoading = false;
          });
        }
      }
    },
  }))
);
