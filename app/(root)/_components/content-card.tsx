"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ContentCardProps {
    Logo: string;
    Title: string;
    Description: string;
    href: string;
  
}

export const ContentCard = ({
    Logo,
    Title,
    Description,
    href,
   
}: ContentCardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-col items-start justify-center space-y-6 pb-2">
                <Image 
                    src={Logo} 
                    alt={Title} 
                    className={cn("rounded-md p-2 border dark:bg-white")}
                    width={60}
                    height={60}
                />
                <CardTitle className="text-xl font-medium dark:text-zinc-100 text-zinc-800">
                    {Title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-md inline-flex font-normal text-zinc-500">
                    {Description}
                </div>
            </CardContent>
            <CardFooter>
                <Link href={href} passHref>
                    <Button className="flex flex-row justify-start items-center font-bold truncate" variant={"outline"}>
                        {Title.length > 12 ? Title.slice(0, 5) + "..." : Title}
                        <MoveRight className="ml-2" size={20} />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
