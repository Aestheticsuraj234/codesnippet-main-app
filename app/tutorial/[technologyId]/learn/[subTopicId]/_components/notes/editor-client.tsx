"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import React, { memo, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Editor from "./editor";

interface EditorClientProps {
  data: {
    note: string;
    id: string;
    createdAt: Date;
  };
}

export const NotesSchema = z.object({
  note: z.any().optional(),
});

const EditorClient = ({ data }: EditorClientProps) => {
  const [isPending, setIsPending] = useState(false);
  const ref = React.useRef(null);
  const router = useRouter();

  const methods = useForm<z.infer<typeof NotesSchema>>({
    resolver: zodResolver(NotesSchema),
    defaultValues: {
      note: data?.note || "", // Load the initial note if available
    },
  });

  const onSubmit = async (values: z.infer<typeof NotesSchema>) => {
    try {
      setIsPending(true);
      if (ref.current) {
        // @ts-ignore
        const outputData = await ref.current.save();
        values.note = outputData;
      }
      // Handle the submission logic here
      toast.success("Notes added successfully.");
    } catch (error) {
      console.error("Error updating subtopic:", error);
      toast.error("Failed to update subtopic.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-8 w-full"
      >
        <FormField
          control={methods.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Your Notes</FormLabel>
              <FormControl>
                {/* Render the Editor, initializing with data if available */}
                <Editor editorRef={ref} initialData={data?.note} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Notes"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default memo(EditorClient);
