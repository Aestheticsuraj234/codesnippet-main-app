"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CardWrapper } from "./CardWrapper";
import { LoginSchema } from "@/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../Global/Froms/FormError";
import { FormSuccess } from "../Global/Froms/FormSuccess";
import { login } from "@/action/auth/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Props {
  redirectUrl?: string;
}

export const LoginForm = ({redirectUrl}:Props) => {
  const searchParams = useSearchParams();
  const urlError = searchParams?.get("error") === "OAuthAccountNotLinked" ? "Email is already registered with another account" : "";



  const [isPending , startTransition] = useTransition();
  const [showTwoFactor , setShowTwoFactor] = useState(false);
  const [error , setError] = useState<string | undefined>("");
  const [success , setSuccess] = useState<string | undefined>("");
  
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code:""
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
  
startTransition(() => {
  login(values,redirectUrl)
  .then((data)=>{
    if(data?.error)
      {
        form.reset();
        setError(data.error);
      }

      if(data?.success)
        {
          form.reset();
          setSuccess(data.success);
        }

        if(data?.twoFactor)
          {
            setShowTwoFactor(true);
          }
  })
  .catch((error)=>{ 
    setError("Something went wrong!")
  })
})
    
  }

  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
      redirectUrl={redirectUrl}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {
              showTwoFactor && (
                <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Two factor Code </FormLabel>
                    <FormControl>
                      <Input
                      disabled={isPending}
                        {...field}
                        placeholder="123456"
                     
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              )
            }
           {  !showTwoFactor && (
           <>
           <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                    disabled={isPending}
                      {...field}
                      placeholder="jhon.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                    disabled={isPending}  
                     {...field} placeholder="********" type="password" />
                  </FormControl>

                    <Button size="sm" variant={"link"} asChild className="px-0 font-normal">
                      <Link href="/auth/reset">
                        Forgot Password?
                      </Link>
                    </Button>

                  <FormMessage />
                </FormItem>
              )}
            />
            </>
  )
            }
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button 
          type="submit"
          className="w-full"
          disabled={isPending}
          >
                {showTwoFactor ? "Verify" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
