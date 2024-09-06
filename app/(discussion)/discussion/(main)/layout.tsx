import { NavigationSidebar } from "@/components/discussion/navigation/navigation-sidebar";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const DiscussionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn(poppins.className, "bg-white dark:bg-[#313338] h-screen flex")}>
      {/* Sidebar */}
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      
      {/* Main content */}
      <main className="flex-1 md:ml-[72px] h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DiscussionLayout;
