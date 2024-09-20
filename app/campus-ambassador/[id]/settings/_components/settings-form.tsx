"use client";
import React, { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Hint } from "@/components/Global/hint";
import { FormError } from "@/components/Global/Froms/FormError";
import { FormSuccess } from "@/components/Global/Froms/FormSuccess";
import { updateAmbassador } from "@/action/campus-ambassador";

// Define the Zod schema for validation
export const UpdateAmbassadorSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  campusName: z.string().min(2, "Campus name is required"),
  mobileNumber: z.string().regex(/^(\d{10})$/, "Dont use +91 in mobile number"),
  upiId: z.string().min(5, "UPI ID is required"),
});

// Define the props for the component
interface AmbassadorInterface {
  fullName: string;
  campusName: string;
  mobileNumber: string;
  upiId: string;
}

export default function SettingsForm({
  ambassador,
}: {
  ambassador: AmbassadorInterface;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const params = useParams();

  // Initialize the form with default values from ambassador data
  const form = useForm<z.infer<typeof UpdateAmbassadorSchema>>({
    resolver: zodResolver(UpdateAmbassadorSchema),
    defaultValues: {
      fullName: ambassador.fullName,
      campusName: ambassador.campusName,
      mobileNumber: ambassador.mobileNumber,
      upiId: ambassador.upiId,
    },
  });

  // Define a submit handler
  async function onSubmit(values: z.infer<typeof UpdateAmbassadorSchema>) {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      try {
        // Assuming an updateAmbassador function to send the data to your API
        const res = await updateAmbassador(params?.id as string, values);
        setSuccess("Ambassador details updated successfully");
      } catch (error) {
        setError("Failed to update ambassador details");
        console.error(error);
      }
    });
  }

  const onBack = () => {
    router.back();
  };

  return (
    <>
      <Hint label={"Go Back"} side="right" align="start" sideOffset={18}>
        <Button
          onClick={onBack}
          variant={"outline"}
          size={"icon"}
          className="flex justify-center items-center px-2 py-2 rounded-md"
        >
          <ArrowLeftIcon size={24} />
        </Button>
      </Hint>

      <div className="px-4 py-4 mt-5 flex flex-col justify-center items-center">
        <Card className="w-[600px]">
          <CardHeader>
            <div className="flex flex-col items-center justify-center w-full mt-4 mb-4">
              <Button
                variant={"outline"}
                size={"lg"}
                className="flex px-4 py-4 flex-row items-center justify-center gap-x-4"
              >
                <span className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
                  {ambassador.fullName}
                </span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="campusName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campus Name</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input type="tel" disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="upiId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UPI ID</FormLabel>
                      <FormControl>
                        <Input disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              {/* Display any error or success messages */}
              <FormError message={error!} />
            <FormSuccess message={success!} />

                <Button type="submit" disabled={isPending}>
                  Save
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
