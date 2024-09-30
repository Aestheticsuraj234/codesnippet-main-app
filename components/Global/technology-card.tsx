import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface TechnologyCardProps {
  imageUrl: string;
  name: string;
  id: string;
  description: string;
  numberOfTopics: number;
  isPremiumUser: boolean;
}

// Helper function to truncate description
const truncateDescription = (description: string, wordLimit: number = 15) => {
  const words = description.split(" ");
  if (words.length <= wordLimit) {
    return description;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
};

export default function TechnologyCard({
  imageUrl,
  name,
  id,
  description,
  numberOfTopics,
  isPremiumUser,
}: TechnologyCardProps) {
  return (
    <Card className="overflow-hidden bg-[#F3F4F6] dark:bg-[#27272A] border dark:border-[#3F3F46] border-[#E5E7EB]">
      <CardContent className="p-0">
        <div className="flex items-center">
          <div className="relative h-24 w-24 flex-shrink-0 px-4 flex justify-center items-center border mx-3 rounded-lg  dark:bg-[#18181B] bg-[#fff]">
            <Image
              alt="Technology image"
              className="object-cover rounded-md"
              height={96}
              src={imageUrl}
              style={{
                aspectRatio: "1/1",
                objectFit: "cover",
              }}
              width={96}
            />
          </div>
          <div className="flex flex-col p-4">
            <h3 className="text-xl font-bold tracking-tight text-primary mb-1">
              {name.toUpperCase()}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {truncateDescription(description)}
            </p>
            <Badge className="text-xs w-fit dark:bg-[#18181B] bg-[#fff] dark:text-white text-zinc-800">
              {numberOfTopics} Topics
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-4">
        {isPremiumUser ? (
          <Link href={`/tutorial/${id}`}>
            <Button variant={"outline"} size={"default"}>
              Start Learning
            </Button>
          </Link>
        ) : (
          <Link href={"/pricing"}>
            <Button variant={"brand"} size={"default"}>
              Subscribe
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
