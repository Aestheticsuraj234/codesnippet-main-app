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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{Title}</CardTitle>
        <Icon
          size={30}
          style={{ backgroundColor: `${backgroundColor}` }}
          className=" rounded-full px-1 py-1 text-white"
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl  inline-flex font-bold border px-4 py-2 rounded-md shadow-md hover:shadow-xl">
          {TotalLength}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkshopInforCard;
