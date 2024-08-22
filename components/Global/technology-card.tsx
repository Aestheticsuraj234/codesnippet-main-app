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

export default function TechnologyCard({
  imageUrl,
  name,
  id,
  description,
  numberOfTopics,
  isPremiumUser,
}: TechnologyCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center">
          <div className="relative h-24 w-24 flex-shrink-0 px-4 flex justify-center items-center border mx-3 rounded-lg">
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
            <p className="text-sm text-muted-foreground mb-2">{description}</p>
            <Badge variant="secondary" className="text-xs w-fit">
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
            <Button variant={"premium"} size={"default"}>
              Subscribe
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
