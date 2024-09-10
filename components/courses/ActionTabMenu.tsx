"use client";

import { toggleMarkAsDone } from "@/action/workshop";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ActionMenuProps {
  isMarkAsDone: boolean;
  userId: string;
  dayId: string;
}

const ActionTabMenu = ({ isMarkAsDone, userId, dayId }: ActionMenuProps) => {
  const [isCompleted, setIsCompleted] = useState(isMarkAsDone);

  useEffect(() => {
    setIsCompleted(isMarkAsDone);
  }, [isMarkAsDone]);

  const onMarkAsDone = async () => {
    const newCompletedStatus = !isCompleted;
    setIsCompleted(newCompletedStatus);

    try {
      await toggleMarkAsDone(dayId, userId, newCompletedStatus);
    } catch (error) {
      console.error("Failed to mark as done:", error);
      setIsCompleted(!newCompletedStatus); // Revert state if error occurs
    }
  };

  return (
    <div className="flex items-center mt-4 sm:mt-0 space-x-2">
      <Button
        variant={isCompleted ? "completed" : "outline"}
        size="sm"
        onClick={onMarkAsDone}
        className="flex items-center"
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        {isCompleted ? "Completed" : "Mark as Done"}
      </Button>
    </div>
  );
};

export default ActionTabMenu;
