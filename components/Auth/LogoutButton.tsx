"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();

  const onClick = async () => {
    await signOut({ callbackUrl: '/' }); // Redirect to homepage or a specific URL after sign out
    router.refresh();
  };

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};

export default LogoutButton;
