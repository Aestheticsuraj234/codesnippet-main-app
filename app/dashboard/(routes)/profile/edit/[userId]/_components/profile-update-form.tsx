"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {  UserRound, Mail, Phone, CreditCard, Save } from "lucide-react";
import { ProfileUpdateFormSchema } from "@/schema";
import { updateUserProfileById } from "@/action/profile";
import { useRouter } from "next/navigation";

type ProfileUpdateFormProps = {
  data: {
    id: string;
    name: string;
    email: string;
    image: string;
    campusAmbassador?: {
      campusName: string;
      fullName: string;
      mobileNumber: string;
      id: string;
      upiId: string;
    }[];
  }
};

const ProfileUpdateForm = ({ data }: ProfileUpdateFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Initialize form with default values
  const form = useForm<z.infer<typeof ProfileUpdateFormSchema>>({
    resolver: zodResolver(ProfileUpdateFormSchema),
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      campusName: data?.campusAmbassador?.[0]?.campusName ?? "",
      fullName: data?.campusAmbassador?.[0]?.fullName ?? "",
      mobileNumber: data?.campusAmbassador?.[0]?.mobileNumber ?? "",
      upiId: data?.campusAmbassador?.[0]?.upiId ?? "",
    },
  });
console.log(form.formState.errors);
  // Handle missing or invalid data
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p>No profile data found</p>
      </div>
    );
  }

  // Helper function to generate initials
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Handle form submission
  async function onSubmit(values: z.infer<typeof ProfileUpdateFormSchema>) {
    try {
        setIsLoading(true);

        // Filter out campusAmbassador data if none exists
        const filteredValues = {
            name: values.name,
            email: values.email,
            campusName: values.campusName || undefined,
            fullName: values.fullName || undefined,
            mobileNumber: values.mobileNumber || undefined,
            upiId: values.upiId || undefined,
        };

        let response;
        if (data) {
            response = await updateUserProfileById(data.id, filteredValues);
        }

        // Handle success
        if (response && response.error) {
            toast.error(response.error);
        } else {
            toast.success("Profile updated successfully");
            router.push("/dashboard/profile");
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
    } finally {
        setIsLoading(false);
    }
}

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <Card className="glass-card overflow-hidden">
        <CardHeader className="pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative hover-scale rounded-full border-4 border-white shadow-md">
              <Avatar className="w-24 h-24">
                <AvatarImage src={data.image} alt={data.name} />
                <AvatarFallback className="text-lg font-medium">
                  {getInitials(data.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center sm:text-left space-y-1">
              <CardTitle className="text-2xl md:text-3xl tracking-tight">
                {data.name}
              </CardTitle>
              <CardDescription className="text-base">{data.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
                <div className="flex items-center gap-2 mb-4">
                  <UserRound className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-medium">Personal Information</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} className="input-transition" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your email"
                            {...field}
                            className="input-transition"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Separator />

              {/* Conditionally Render Campus Ambassador Details */}
              {data.campusAmbassador && data.campusAmbassador.length > 0 && (
                <div className="space-y-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Mail className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium">Campus Ambassador Details</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="campusName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campus Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your campus name"
                              {...field}
                              className="input-transition"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your full name"
                              {...field}
                              className="input-transition"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Your mobile number"
                                {...field}
                                className="pl-10 input-transition"
                              />
                            </div>
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
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Your UPI ID"
                                {...field}
                                className="pl-10 input-transition"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </CardContent>
            {/* Submit Button */}
            <CardFooter className="pt-2 pb-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <Button
                type="submit"
                className="w-full sm:w-auto hover-scale group"
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ProfileUpdateForm;