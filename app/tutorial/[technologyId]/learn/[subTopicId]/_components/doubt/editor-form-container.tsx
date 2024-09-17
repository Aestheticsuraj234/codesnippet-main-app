"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomRichTextEditor from '@/components/Global/custom-richtext-editor'
import { PostDoubt } from "@/action/tutorial/learn/doubt";

export const DoubtSchema = z.object({
  doubt: z.string().min(1, "Doubt content is required"),
});

const RichEditorFormContainer = () => {
  const [isPending, setIsPending] = useState(false);
  const params = useParams();

  const methods = useForm<z.infer<typeof DoubtSchema>>({
    resolver: zodResolver(DoubtSchema),
    defaultValues: {
      doubt: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof DoubtSchema>) => {
    console.log(values);
    try {
      setIsPending(true);
      await PostDoubt(values.doubt, params.subTopicId as string);
      toast.success("Doubt posted successfully.");
    } catch (error) {
      console.error("Error posting doubt:", error);
      toast.error("Failed to post doubt.");
    } finally {
      setIsPending(false);
      methods.reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={methods.control}
          name="doubt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ask Your Doubt</FormLabel>
              <FormControl>
                <CustomRichTextEditor
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end items-end">
        <Button variant={"brand"}  type="submit" disabled={isPending} className="self-end">
          {isPending ? "Posting..." : "Post Forum"}
        </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default RichEditorFormContainer