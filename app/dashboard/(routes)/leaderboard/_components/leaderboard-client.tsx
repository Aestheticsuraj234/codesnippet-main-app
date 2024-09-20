"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpenIcon, UsersIcon, GraduationCapIcon } from "lucide-react";

const tabIcons = {
  tutorials: <BookOpenIcon className="w-5 h-5" />,
  workshops: <UsersIcon className="w-5 h-5" />,
  liveCourses: <GraduationCapIcon className="w-5 h-5" />,
};

const rankColors = ["#FFD700", "#C0C0C0", "#CD7F32"];

type User = {
  id: number;
  name: string;
  points: number;
  image: string;
};

type Props = {
  liveCourses: User[];
  tutorial: User[];
  workshops: User[];
};

export default function LeaderboardClient({
  liveCourses,
  tutorial,
  workshops,
}: Props) {
  const [activeTab, setActiveTab] = useState("tutorials");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sort leaderboard data by points in descending order for each category
  const leaderboardData = {
    tutorials: [...tutorial].sort((a, b) => b.points - a.points),
    workshops: [...workshops].sort((a, b) => b.points - a.points),
    liveCourses: [...liveCourses].sort((a, b) => b.points - a.points),
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-[#F3F4F6] border-[#DDE2EC] dark:bg-[#27272A] dark:border-[#27272A] rounded-xl shadow-md">
      <Tabs
        defaultValue="tutorials"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 mb-8 dark:bg-[#18181B] bg-[#FFFFFF] rounded-t-xl p-1">
          {Object.entries(tabIcons).map(([key, icon]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="rounded-full text-sm font-medium transition-all duration-300 ease-in-out data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              <div className="flex items-center space-x-2">
                {icon}
                <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {mounted &&
          Object.entries(leaderboardData).map(([key, users]) => (
            <TabsContent key={key} value={key} className="space-y-4 p-4">
              {users.map((user: User, index: number) => (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-3 rounded-lg dark:bg-[#18181B] bg-[#FFFFFF] dark:border-[#3F3F46] border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300 group ${
                    activeTab === key
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    transitionProperty: "opacity, transform",
                    transitionDuration: "300ms",
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-gray-300 group-hover:border-green-500 transition-colors duration-300">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {index < 3 && (
                        <div
                          className="absolute -top-1 -left-1 rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white"
                          style={{ backgroundColor: rankColors[index] }}
                        >
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-black dark:text-white group-hover:text-green-600 transition-colors duration-300">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-200">
                        Rank: {index + 1}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-sm px-2 py-1 bg-green-500 text-white group-hover:bg-green-600 transition-all duration-300"
                  >
                    {user.points} pts
                  </Badge>
                </div>
              ))}
            </TabsContent>
          ))}
      </Tabs>
    </div>
  );
}
