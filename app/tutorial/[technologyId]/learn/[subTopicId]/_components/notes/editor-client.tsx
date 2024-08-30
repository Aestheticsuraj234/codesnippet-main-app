"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Editor from "./editor";
import { CreateNotes, getNotesBySubTopicId, updateNotes } from "@/action/tutorial/learn/notes";

interface EditorClientProps {
  data: {
    id: string;
    notes: {
      note: {
        blocks: Array<any>;
        time: number;
        version: string;
      };
      id: string;
      createdAt: Date;
    };
  };
}

export const NotesSchema = z.object({
  note: z.any().optional(),
});

const EditorClient = ({ data }: EditorClientProps) => {
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const editorRef = useRef(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      setIsPending(true);
      try {
        const response = await getNotesBySubTopicId(params.subTopicId as string);
        setFormData(response);
      } catch (error) {
        console.error("Error fetching subtopic data:", error);
        toast.error("Failed to fetch subtopic data.");
      } finally {
        setIsPending(false);
      }
    }

    fetchData();
  }, [params.subTopicId]);

  const methods = useForm<z.infer<typeof NotesSchema>>({
    resolver: zodResolver(NotesSchema),
    defaultValues: {
      note: formData?.notes[0]?.note || "", // Access the first element in the notes array
    },
  });

  useEffect(() => {
    if (formData) {
      methods.reset({
        note: formData?.notes[0]?.note || "",
      });
    }
  }, [formData, methods]);

  const onSubmit = async (values: z.infer<typeof NotesSchema>) => {
    try {
      setIsPending(true);

      if (editorRef.current) {
        // @ts-ignore
        const outputData = await editorRef.current.save();
        values.note = outputData;
      }

      // Check if updating existing notes or creating new ones
      if (formData?.notes[0]?.note && formData?.notes[0]?.id) {
        await updateNotes(formData?.notes[0].id, JSON.stringify(values.note));
      } else {
        await CreateNotes(data.id, JSON.stringify(values.note));
      }

      toast.success("Notes saved successfully.");
    } catch (error) {
      console.error("Error updating subtopic:", error);
      toast.error("Failed to save notes.");
    } finally {
      setIsPending(false);
    }

  };

  if(!formData) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={methods.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Your Notes</FormLabel>
              <FormControl>
                <Editor editorRef={editorRef} initialData={formData?.notes[0]?.note} />
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

export default EditorClient;
