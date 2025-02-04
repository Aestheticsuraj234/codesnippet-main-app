"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "@/components/Auth/Header";
import { Social } from "./Social";
import { BackButton } from "./BackButton";

interface CardWrapperProps {
  children?: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
  redirectUrl?: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial = false,
  redirectUrl,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] border-[#03DC7A] shadow-md dark:bg-zinc-900">
      <CardHeader>
        <Header label={headerLabel} />
    </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social redirectUrl={redirectUrl}/>
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref!} label={backButtonLabel!} />
      </CardFooter>
    </Card>
  );
};
