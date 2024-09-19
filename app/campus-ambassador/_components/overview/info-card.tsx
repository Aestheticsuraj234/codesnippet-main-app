import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PLAN } from "@prisma/client";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
 title:string;
 total:number;
 Icon:LucideIcon;
backgroundColor:string;
iconHexColor:string;

}


export const InfoCard = ({Icon,backgroundColor,iconHexColor,title,total}:InfoCardProps)=>{
    return(
        <Card className="dark:bg-[#27272A] bg-[#F3F4F6] dark:border-[#46443f] border-[#E5E7EB]"  >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
          <Icon size={30} style={{"backgroundColor":`${backgroundColor}` , "opacity":"80%" , "color":`${iconHexColor}`}}  className=" rounded-full px-1 py-1 "/>
        </CardHeader>
        <CardContent>
          <div className="text-2xl  inline-flex font-bold  px-4 py-2 rounded-md shadow-md hover:shadow-xl dark:bg-[#18181B] bg-[#FFFFFF] dark:border-[#3F3F46] boder-[#E5E7EB] ">
            {total}
          </div>
         
        </CardContent>
      </Card>
    )
}