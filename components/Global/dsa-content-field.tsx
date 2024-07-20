"use client";
import { useFormContext, Controller } from "react-hook-form";
import { ContentStatus, ContentType } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/Global/image-upload";

const DsaCommonFields = () => {
  const { control } = useFormContext();

  return (
    <FormField
    control={control}
    name="dsaTitle"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input placeholder="Title of Your DSA Sheet" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  );
};

export default DsaCommonFields;
