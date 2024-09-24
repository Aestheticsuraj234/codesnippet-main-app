import React from "react";
import { Hint } from "@/components/Global/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pencil,
  Award,
  Smartphone,
  Calendar,
  GraduationCap,
  Users,
} from "lucide-react";
import Link from "next/link";

interface Props {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    image: string;
    campusAmbassador: [
      {
        id: string;
        campusName: string;
        mobileNumber: string;
        points: number;
      }
    ];
    members: [
      {
        createdAt: Date;
        role: string;
        community: {
          id: string;
          name: string;
          imageUrl: string;
        };
      }
    ];
    notes: string[]; // Assuming notes are a list of strings
  };
}

const ProfileClient = ({ user }: Props) => {
  return (
    <div className="container mx-auto p-4 flex flex-col space-y-6">
      <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-none shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardContent className="p-0">
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-green-200 via-green-400 to-green-500" />
            <Avatar className="absolute left-6 -bottom-16 h-32 w-32 border-4 border-background transition-transform duration-300 hover:scale-105">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Hint
              label="Edit Profile"
              align="center"
              side="left"
              alignOffset={5}
              sideOffset={5}
            >
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-background/80"
              >
                <Pencil size={18} />
              </Button>
            </Hint>
          </div>
          <div className="pt-20 px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Badge
                  variant="outline"
                  className="text-primary border-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  <Calendar size={14} className="mr-1" />
                  Joined{" "}
                  {user.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Badge>
              </div>
            </div>

            {/* Conditionally render Campus Ambassador section */}
            {user.campusAmbassador && user.campusAmbassador.length > 0 && (
              <div className="bg-primary/5 rounded-lg p-4 space-y-4 transition-all duration-300 hover:bg-primary/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center">
                    <GraduationCap size={20} className="mr-2 text-primary" />
                    Campus Ambassador
                  </h3>
                  <Badge
                    variant="secondary"
                    className="transition-all duration-300 hover:bg-secondary-foreground hover:text-secondary"
                  >
                    {user.campusAmbassador[0]?.campusName}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center group">
                    <Smartphone
                      size={16}
                      className="mr-2 text-indigo-400 group-hover:text-indigo-500 transition-colors duration-300"
                    />
                    <span className="text-sm group-hover:text-primary transition-colors duration-300">
                      {user.campusAmbassador[0]?.mobileNumber}
                    </span>
                  </div>
                  <div className="flex items-center group">
                    <Award
                      size={16}
                      className="mr-2 text-yellow-400 group-hover:text-yellow-500 transition-colors duration-300"
                    />
                    <span className="text-sm group-hover:text-primary transition-colors duration-300">
                      {user.campusAmbassador[0]?.points} Points
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Conditionally render Community Memberships section */}
      {user.members && user.members.length > 0 && (
        <Card className="overflow-hidden bg-[#F3F4F6] border-[#E5E7EB] dark:bg-[#27272A] dark:border-[#3F3F46] shadow-lg transition-all duration-300 hover:shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Users
                size={24}
                className="mr-2 text-gray-800 dark:text-gray-100"
              />
              Community Memberships
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.members.map((membership) => (
                <Link
                  href={`/discussion/community/${membership.community.id}`}
                  key={membership.community.id}
                >
                  <div className="dark:bg-[#18181B] bg-[#FFFFFF] dark:border-[#3F3F46] border-[#E5E7EB] rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                    <div className="flex items-center space-x-4 mb-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={membership.community.imageUrl}
                          alt={membership.community.name}
                        />
                        <AvatarFallback>
                          {membership.community.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">
                          {membership.community.name}
                        </h4>
                        <Badge variant="outline" className="mt-1">
                          {membership.role}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Joined{" "}
                      {membership.createdAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conditionally render Notes section */}
      {user.notes && user.notes.length > 0 && (
        <Card className="overflow-hidden bg-[#F3F4F6] border-[#E5E7EB] dark:bg-[#27272A] dark:border-[#3F3F46] shadow-lg transition-all duration-300 hover:shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-4">Notes</h3>
            <ul className="list-disc pl-5">
              {user.notes.map((note, index) => (
                <li key={index} className="text-muted-foreground">
                  {note}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileClient;
