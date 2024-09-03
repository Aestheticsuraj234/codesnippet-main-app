import { NavigationSidebar } from "@/components/discussion/navigation/navigation-sidebar";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";


const poppins =  Poppins({ subsets: ["latin"] , weight: ["400", "500", "600", "700"] });

const DiscussionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
   <div className={cn(poppins.className , "bg-white dark:bg-[#313338] h-full")}>
    <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
      <NavigationSidebar/>
    </div>
    <main className="md:pl-[72px] h-full">
        {children}
    </main>
   </div>
  );
};

export default DiscussionLayout;
