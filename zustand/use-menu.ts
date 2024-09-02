import { create } from 'zustand';
import { Group } from '@/lib/tutorial/menu-list';

// Define the shape of your Zustand store
interface MenuStore {
  menuList: Group[]; // Array of groups (from the imported Group type)
  setMenuList: (menuList: Group[]) => void; // Action to set the menu list
  isSubDone: boolean; // Boolean to track if a subtopic is done
  setIsDone: (isDone: boolean) => void; // Action to set the isSubDone state
  updateSubtopicStatus: (subTopicId: string, doneStatus: boolean) => void; // Action to update the done status of a subtopic
}

// Create the Zustand store
export const useMenu = create<MenuStore>((set) => ({
  menuList: [], // Initial state for the menu list
  setMenuList: (menuList) => set({ menuList }), // Action to update the menu list
  isSubDone: false, // Initial state for subtopic done status
  setIsDone: (isDone) => set({ isSubDone: isDone }), // Action to update the isSubDone state

  // Action to update the done status of a specific subtopic
  updateSubtopicStatus: (subTopicId, doneStatus) =>
    set((state) => {
      // Update the specific subtopic's "done" status within the menu list
      const updatedMenuList = state.menuList.map((group) => ({
        ...group,
        menus: group.menus.map((menu) => ({
          ...menu,
          submenus: menu.submenus.map((submenu) =>
            submenu.id === subTopicId
              ? { ...submenu, done: doneStatus } // Update the done status if the ID matches
              : submenu
          ),
        })),
      }));
      return { menuList: updatedMenuList };
    }),
}));
