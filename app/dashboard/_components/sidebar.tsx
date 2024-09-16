import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
  return (
    <div className="h-full border-r  dark:border-[#27272A] flex flex-col overflow-y-auto bg-[#fff] dark:bg-[#27272A] shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}