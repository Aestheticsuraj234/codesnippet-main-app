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
import { NewPasswordSchema } from "@/schema";
import { Input } from "../ui/input";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { FormError } from "../Global/Froms/FormError";
import { FormSuccess } from "../Global/Froms/FormSuccess";
import { login } from "@/action/auth/login";
import { useState, useTransition } from "react";
import { newPassword } from "@/action/auth/new-password";

export const NewPasswordForm = () => {

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");



  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    

    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");


    startTransition(() => {
      newPassword(values , token).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });

    // reset the form
    form.reset();
  };

  return (
    <CardWrapper
      headerLabel="Enter a new Password!"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
      
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
          Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
