import { TriangleAlert } from "lucide-react";
import { CardWrapper } from "./CardWrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center ">
        <TriangleAlert className="text-destructive w-12 h-12" />
      </div>
    </CardWrapper>
  );
};
