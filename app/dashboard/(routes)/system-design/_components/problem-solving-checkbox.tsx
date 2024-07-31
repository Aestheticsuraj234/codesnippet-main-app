"use client";
import React, { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { toggleSolver } from "@/action/content/system-design";

interface ProblemCheckboxProps {
  checked: boolean;
  Probid: string;
}

const ProblemCheckbox: React.FC<ProblemCheckboxProps> = ({ checked, Probid }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const user = useCurrentUser();

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  if (!user) {
    console.warn("User is not available.");
    return null;
  }

  const handleCheckboxChange = async () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    try {
      await toggleSolver(Probid, user?.id, newCheckedState);
    } catch (error) {
      console.error("Failed to toggle solver:", error);
      setIsChecked(!newCheckedState); // Revert state if the update fails
    }
  };

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleCheckboxChange}
    />
  );
};

export default ProblemCheckbox;
