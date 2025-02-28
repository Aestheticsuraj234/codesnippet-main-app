"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/zustand/use-modal";
import { AddDayAssingToTopic } from "@/action/tutorial";
import toast from "react-hot-toast";

const formSchema = z.object({
  numberOfDays: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 1 && val <= 180, {
      message: "Please enter a number between 1 and 180",
    }),
});

type Props = {
  isDayAssigned: boolean;
  id: string;
};

export const InitialModal = ({ isDayAssigned, id }: Props) => {
  const { isOpen, onClose, type, onOpen } = useModal();
  const router = useRouter();
  const params = useParams();

  // Only open the modal if it's of the correct type and the day is not assigned
  const isModalOpen = isOpen && isDayAssigned && type === "INITIAL_DAY_SETUP";

  useEffect(() => {
    // Open modal if it's the right type and conditions are met
    if (!isOpen) {
      onOpen("INITIAL_DAY_SETUP");
    }
  }, [isOpen, onOpen]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfDays: "1", // Default as string because Input returns a string
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Perform your submission logic
      const data = await AddDayAssingToTopic(id, values.numberOfDays);
      form.reset();
      router.refresh();
      window.location.reload();
      toast.success("Your journey has begun");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Welcome to your journey
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Choose the number of days you want to start your journey with.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          {/* @ts-ignore */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="numberOfDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter number of days"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum number of days is 180
                      </FormDescription>
                      <FormMessage>
                        {form.formState.errors.numberOfDays?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4 flex flex-row gap-4 justify-between items-center w-full">
              <DialogClose className="text-zinc-500" onClick={handleClose}>
                Cancel
              </DialogClose>
              <Button type="submit" variant="default" disabled={isLoading}>
                Begin My Journey
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
