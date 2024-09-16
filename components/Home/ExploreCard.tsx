import { LucideIcon, MoveRight } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface props {
  Icon: LucideIcon;
  backgroundHex: string;
  colorHex: string;
  title: string;
  description: string;
  href: string;
}

const ExploreCard = ({
  Icon,
  backgroundHex,
  colorHex,
  title,
  description,
  href,
}: props) => {
  return (
    <Card className="bg-[#F3F4F6] border-[#DDE2EC] dark:bg-[#27272A] dark:border-[#27272A] ">
      <CardHeader className="flex flex-col items-start justify-center space-y-6 pb-2">
        <div
          className="
        rounded-md p-2
        "
          style={{
            backgroundColor: backgroundHex,
          }}
        >
          <Icon className="rounded-md p-2" size={40} color={colorHex} />
        </div>
        <CardTitle className="text-xl font-bold text-[#1A1818] dark:text-[#ffffff]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-md inline-flex font-normal text-[#6B7280] dark:text-[#A1A1AA]">
          {description}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={href} passHref>
          <Button
            className="flex flex-row justify-start items-center font-bold truncate"
            variant={"outline"}
          >
            Get Started
            <MoveRight className="ml-2" size={20} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ExploreCard;
