"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/zustand/use-modal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCampusAmbassador } from "@/action/campus-ambassador";
import toast from "react-hot-toast";
import { set } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const campusAmbassadorSchema = z.object({
  fullName: z.string().min(1, {
    message: "Full name is required.",
  }),
  mobileNumber: z.string().min(1, {
    message: "Mobile number is required.",
  }),
  upiId: z.string().min(1, {
    message: "UPI ID is required.",
  }),
  campusName: z.string().min(1, {
    message: "Campus name is required.",
  }),
  termsAndConditions: z.boolean().refine((value) => value === true, {
    message: "Please agree to the terms and conditions.",
  }),
});

const AmbassadorModal = () => {
  const { isOpen, onClose, onOpen, type } = useModal();
  const [isPending , setIsPending] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [data , setData] = React.useState(null);
  const isModalOpen = isOpen && type === "ONBOARD_AMBASSADOR";

  const form = useForm({
    resolver: zodResolver(campusAmbassadorSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      upiId: "",
      campusName: "",
      termsAndConditions: false,
    },
  });

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof campusAmbassadorSchema>) => {
    try {
      setIsPending(true);
      const result = await createCampusAmbassador(values);
      setData(result);
      toast.success("Campus Ambassador onboarded successfully.");
      setIsSuccess(true);

    } catch (error) {
      toast.error("Failed to onboard Campus Ambassador.");
    } finally {
      form.reset();
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#F3F4F6] dark:bg-[#27272A] text-black dark:text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Onboard Campus Ambassador
          </DialogTitle>
        </DialogHeader>
        {
          isSuccess ? (
            // create a success message here with a button to go to the dashboard
            <div className="p-6 flex flex-col justify-center items-center gap-4">
             <Image
              src={"/campus-ambassador.svg"}
              alt="Campus Ambassador"
              width={200}
              height={200}
              className={"object-contain  mx-auto "}
             />
              <div className="flex justify-center mt-4">
                <Link href={`/campus-ambassador/${data?.id}`}>
                <Button variant="brand" className="flex flex-row justify-center items-center gap-2">
                  Go to Dashboard 
                  <ArrowRight size={24} />
                </Button>
                </Link>
                
              </div>
              </div>
          ):(
            <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 px-6"
            >
              <div className="space-y-8">
                <FormField
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-zinc-300 dark:bg-zinc-700 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                          placeholder="Enter your full name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                        Mobile Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          className="bg-zinc-300 dark:bg-zinc-700 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                          placeholder="Enter your mobile number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  name="upiId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                        UPI ID
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-zinc-300 dark:bg-zinc-700 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                          placeholder="Enter your UPI ID"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  name="campusName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-zinc-400">
                        Campus/Institution Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-zinc-300 dark:bg-zinc-700 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                          placeholder="Enter your campus or institution name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  name="termsAndConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <label className="inline-flex items-center text-zinc-500 dark:text-zinc-400">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            {...field}
                          />
                          <span className="ml-2 text-sm">
                            I agree to the <Button variant={"link"} >Terms and Conditions</Button>
                          </span>
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="bg-[#F3F4F6] dark:bg-[#27272A] px-6 py-4">
                <Button variant="brand" type="submit" disabled={isPending} >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
          )
        }
       
      </DialogContent>
    </Dialog>
  );
};

export default AmbassadorModal;
