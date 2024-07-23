import { Header } from "@/components/Global/header";
import { currentUser } from "@/lib/auth/data/auth";
import React from "react";
import { UpcomingWorkshops } from "./_components/home/upcoming-workshops";
import Link from "next/link";
import { RecentlyAdded } from "./_components/home/recently-added";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const Home = async () => {
  const user = await currentUser();
  return (
    <main className="px-4 py-4 flex flex-col ">
      <Header
        title={`HELLO ${user?.name?.toUpperCase()}👋`}
        description={"Let's Learn Something New Today"}
      />

      {/* */}
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-12 grid gap-8">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-600 dark:text-zinc-100">
              Upcoming Workshops
            </h2>
            <Link
              href="/workshops"
              className="text-sm font-medium text-yellow-500 hover:underline underline-offset-4"
              prefetch={false}
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            <UpcomingWorkshops
              Category="DSA"
              imageSrc="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F08857d36-2392-4182-9f6f-5fb93a8e8543-2ytnxz.jpg&w=1920&q=75"
              Date="7 August, 2024"
              Title="Data Structure and Algorithm"
              Description="Learn about the basics of Data Structure and Algorithm"
            />
            <UpcomingWorkshops
              Category="Frontend"
              imageSrc="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F6f5ddbbe-cf91-44d4-bd10-5fdb235889df-tt9026.png&w=1920&q=75"
              Date="27 July, 2024"
              Title="React Workshop"
              Description="Learn about the basics of React"
            />
            <UpcomingWorkshops
              Category="Backend"
              imageSrc="https://www.codewithantonio.com/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F3fd4e9e6-8489-4005-a6a7-29f0338745b1-jbkgcj.jpg&w=1920&q=75"
              Date="17 August, 2024"
              Title="Nodejs Workshop"
              Description="Learn about the basics of Nodejs"
            />
          </div>
        </section>
      </main>

      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-12 grid gap-8">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-600 dark:text-zinc-100">
              Recently Added
            </h2>
            <Link
              href="/dsa"
              className="text-sm font-medium text-yellow-500 hover:underline underline-offset-4"
              prefetch={false}
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            <RecentlyAdded
              Category="DSA"
              Date="7 August, 2024"
              Title="Linked List "
              Description=" Learn about the basics of Linked List"
            />
            <RecentlyAdded
              Category="Notes"
              Date="27 July, 2024"
              Title="Html Notes"
              Description="Learn about the basics of Html"
            />
            <RecentlyAdded
              Category="System Design"
              Date="17 August, 2024"
              Title="System Design of Instagram"
              Description="Learn about the basics of System Design"
            />
          </div>
        </section>
      </main>
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="text-4xl font-bold">20</div>
              <div className="text-sm font-medium text-muted-foreground">
                July 2024
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                <div>Upcoming Events</div>
                <Link
                  href="#"
                  className="text-primary hover:underline underline-offset-4"
                  prefetch={false}
                >
                  View All
                </Link>
              </div>
              <div className="mt-2 grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">
                    Introduction to React.js
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    July 15
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">
                    Mastering Arrays and Linked Lists
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    August 5
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>To-Do List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <div className="text-sm font-medium">
                    Finish React.js project
                  </div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Due: July 25
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <div className="text-sm font-medium">Review DSA sheet</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Due: August 1
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <div className="text-sm font-medium">
                    Complete Python course
                  </div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Due: August 15
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Home;
