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
import { ResetSchema } from "@/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../Global/Froms/FormError";
import { FormSuccess } from "../Global/Froms/FormSuccess";
import { login } from "@/action/auth/login";
import { useState, useTransition } from "react";

import Link from "next/link";
import { reset } from "@/action/auth/reset";

export const ResetForm = () => {
 


  const [isPending , startTransition] = useTransition();
  const [error , setError] = useState<string | undefined>("");
  const [success , setSuccess] = useState<string | undefined>("");
  
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
  
    console.log(values)
startTransition(() => {
  reset(values)
  .then((data)=>{
    setError(data?.error);
    setSuccess(data?.success);
  })
})
    
  }

  return (
    <CardWrapper
      headerLabel="Forgot your password?!"
      backButtonLabel="Back to Login?"
      backButtonHref="/auth/login"
      
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button 
          type="submit"
          className="w-full"
          disabled={isPending}
          >
                Send Reset Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
