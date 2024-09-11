import { Card, CardContent } from "@/components/ui/card";
import { currentRole, currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { Lock, Unlock } from "lucide-react";
import { Button } from "../ui/button";
import { formatDate } from "@/lib/utils";

export interface CourseCardProps {
  date: Date;
  imageSrc: string;
  price: number;
  discountedPrice: number;
  isPurchased: boolean;
  title: string;
  description: string;
}

const CourseCard = async ({ date, imageSrc, price, discountedPrice, isPurchased, title, description }: CourseCardProps) => {
  return (
    <Card className="cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-muted-foreground">{formatDate(date)}</div>
          <div className="flex items-center gap-2">
            {discountedPrice !== price && (
              <span className="text-sm line-through text-muted-foreground">₹{price.toLocaleString('en-IN')}</span>
            )}
            <div className="flex justify-center items-center rounded-full bg-green-500 px-2 py-1 text-sm font-medium text-primary-foreground">
              ₹{discountedPrice.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
        <main className="flex flex-col items-start justify-center mt-3">
          <div className="aspect-video relative overflow-hidden border rounded-md shadow-md hover:shadow-xl">
            <img src={imageSrc} className="object-cover w-full h-full rounded-md" alt={title} />
          </div>
          <div className="flex flex-col items-start justify-start mt-2 w-full"> 
            <h3 className="text-lg font-bold truncate w-full" title={title}>{title}</h3>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </main>
        <div className="mt-4">
          <Button
            variant={isPurchased ? "premium" : "outline"}
            size="default"
            className="w-full"
          >
            {isPurchased ? "Start Learning" : "View Details"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
};

export default CourseCard;