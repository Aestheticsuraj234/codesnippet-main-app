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

const CommonContentFields = () => {
  const { control } = useFormContext();

  return (
    <div>
      <FormField
        control={control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Images</FormLabel>
            <FormControl>
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                onRemove={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="md:grid md:grid-cols-3 gap-8">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title of Content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description of Content." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of content</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ContentType.BLOGS}>Blogs</SelectItem>
                    <SelectItem value={ContentType.DSA}>DSA</SelectItem>
                    <SelectItem value={ContentType.CS_SUBJECT}>
                      CS Subject
                    </SelectItem>
                    <SelectItem value={ContentType.EBOOKS}>Ebooks</SelectItem>
                    <SelectItem value={ContentType.NOTES}>Notes</SelectItem>
                    <SelectItem value={ContentType.WORKSHOPS}>
                      Workshops
                    </SelectItem>
                    <SelectItem value={ContentType.SYSTEM_DESIGN}>
                      System Design
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status of Content</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select the Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ContentStatus.ARCHIVED}>
                      Archived
                    </SelectItem>
                    <SelectItem value={ContentStatus.PUBLISHED}>
                      Published
                    </SelectItem>
                    <SelectItem value={ContentStatus.UNPUBLISHED}>
                      Unpublished
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CommonContentFields;
