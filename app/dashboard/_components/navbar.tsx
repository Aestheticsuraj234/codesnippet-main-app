import { NavbarRoutes } from "@/components/Global/Navbar/navbar-routes"

import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white dark:bg-[#191A19] shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  )
}