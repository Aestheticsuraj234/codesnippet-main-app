import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { redirect } from "next/navigation";
import { NavigationAction } from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "@/components/Global/Navbar/theme-toggle";
import { UserButton } from "@/components/Auth/UserButton";


export const NavigationSidebar = async()=>{
    const user = await currentUser();

    if(!user){
        return redirect('/');
    }

    const communities = await db.community.findMany({
        where:{
            members:{
                some:{
                    userId: user?.id!
                }
            }
        }
    })



    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] py-3">
            <NavigationAction/>
            <Separator
            className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto "
            />
            <ScrollArea className="flex-1 w-full">
                {
                    communities.map((community)=>(
                        <div key={community.id} className="mb-4">
                            <NavigationItem
                            id={community.id}
                            imageUrl={community.imageUrl}
                            name={community.name}/>  
                        </div>
                    ))
                }
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center justify-center flex-col gap-y-4">
                    <ModeToggle/>
                    <UserButton/>
            </div>
        </div>
    )
}

