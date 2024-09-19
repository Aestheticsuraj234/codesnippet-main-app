"use client";
import {signIn} from "next-auth/react"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { cookies } from "next/headers";


interface Props {
  redirectUrl?: string;
}

export const Social = ({
  redirectUrl,
}:Props) => {
  
  const onClick = (provider:"google"|"github")=>{
    signIn(provider, {
      callbackUrl: redirectUrl || DEFAULT_LOGIN_REDIRECT,
    })
  

  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"brandOutline"}
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size={"lg"}
        className="w-full"
        variant={"brandOutline"}
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
};
