import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import React from "react";

interface WorkshopInforCardProps {
  Title: string;
  TotalLength: number;
  Icon: LucideIcon;
  backgroundColor: string;
}

const WorkshopInforCard = ({
  Title,
  Icon,
  TotalLength,
  backgroundColor,
}: WorkshopInforCardProps) => {
  return (
    <Card className="dark:bg-[#27272A] bg-[#F3F4F6] dark:border-[#3F3F46] border-[#E5E7EB]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{Title}</CardTitle>
        <div className="p-2 rounded-full border"  style={{ backgroundColor: `${backgroundColor}` }}>
        <Icon
          size={30}
          className=" text-white"
        />
        </div>
      
      </CardHeader>
      <CardContent>
        <div className="text-2xl inline-flex font-bold border px-4 py-2 rounded-md shadow-md hover:shadow-xl dark:bg-[#18181B] bg-[#FFFFFF]">
          {TotalLength}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopInforCard;
