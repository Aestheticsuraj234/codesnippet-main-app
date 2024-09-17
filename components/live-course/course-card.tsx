import { Card, CardContent } from "@/components/ui/card";
import { Unlock, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export interface CourseCardProps {
  id: string;
  date: Date;
  imageSrc: string;
  price: number;
  discountedPrice: number;
  isPurchased: boolean;
  title: string;
  description: string;
}

const CourseCard = async ({
  id,
  date,
  imageSrc,
  price,
  discountedPrice,
  isPurchased,
  title,
  description,
}: CourseCardProps) => {
  return (
    <Card className="cursor-pointer bg-[#F3F4F6] dark:bg-[#27272A] border dark:border-[#3F3F46] border-[#E5E7EB]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-muted-foreground">
            {formatDate(date)}
          </div>
          <div className="flex items-center gap-2">
            {isPurchased ? (
              <div className="flex items-center justify-center rounded-full dark:bg-[#676ECC] bg-[#8188EC]  p-2 text-white">
                <Unlock className="h-4 w-4" />
              </div>
            ) : (
              <>
                {discountedPrice !== price && (
                  <span className="text-sm line-through text-muted-foreground">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                )}
                <div className="flex justify-center items-center rounded-full bg-green-500 px-2 py-1 text-sm font-medium text-primary-foreground">
                  ₹{discountedPrice.toLocaleString("en-IN")}
                </div>
              </>
            )}
          </div>
        </div>
        <main className="flex flex-col items-start justify-center mt-3">
          <div className="aspect-video relative overflow-hidden border dark:border-[#3F3F46] border-[#E5E7EB] rounded-md shadow-md hover:shadow-xl">
            <img
              src={imageSrc}
              className="object-cover w-full h-full rounded-md"
              alt={title}
            />
          </div>
          <div className="flex flex-col items-start justify-start mt-2 w-full">
            <h3 className="text-lg font-bold truncate w-full" title={title}>
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </main>
        <div className="mt-4">
          {isPurchased ? (
            <Link href={`/live/${id}`}>
              <Button variant={"outline"} size={"default"} className="w-full">
                Start Course
              </Button>
            </Link>
          ) : (
            <Link href={`/live-course/${id}`}>
              <Button variant={"brand"} size={"default"} className="w-full">
                Buy Course
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
