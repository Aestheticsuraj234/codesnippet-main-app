import { Button } from "@/components/ui/button";
import { StarIcon, StarOffIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { toggleMarked } from "@/action/content/system-design";

interface MarkedToggleButtonProps {
  markedForRevision: boolean;
  id: string;
}

export const MarkedToggleButton: React.FC<MarkedToggleButtonProps> = ({ markedForRevision, id }) => {
  const [isMarked, setIsMarked] = useState(markedForRevision);
  const user = useCurrentUser();

  useEffect(() => {
    setIsMarked(markedForRevision);
  }, [markedForRevision]);

  if (!user) {
    console.warn("User is not available.");
    return null;
  }

  const handleToggle = async () => {
    const newMarkedState = !isMarked;
    setIsMarked(newMarkedState);

    try {
      await toggleMarked(id, user?.id, newMarkedState);
    } catch (error) {
      console.error("Failed to toggle mark for revision:", error);
      setIsMarked(!newMarkedState); // Revert state if the update fails
    }
  };

  return (
    <Button variant={"outline"} size={"icon"} onClick={handleToggle}>
      {isMarked ? <StarIcon size={24} className="text-yellow-500" /> : <StarOffIcon size={24} className="text-gray-500" />}
    </Button>
  );
};
