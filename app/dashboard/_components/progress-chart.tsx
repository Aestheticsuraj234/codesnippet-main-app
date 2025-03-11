"use client"
import { useEffect, useState } from "react";
import { Award, BookOpen, Code, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { FadeIn } from "./fadeIn";


interface ProgressChartProps {
  techProgress: number;
  courseProgress: number;
  workshopProgress: number;
  monthlyChange?: number;
}

const ProgressChart = ({ techProgress, courseProgress, workshopProgress, monthlyChange = 5.2 }: ProgressChartProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Define the data structure correctly for a bar chart
  const data = [
    {
      name: "Technologies",
      progress: Math.round(techProgress),
      color: "hsl(var(--chart-1))",
      gradientId: "techGradient",
      icon: <Code className="h-5 w-5" />,
    },
    {
      name: "Courses",
      progress: Math.round(courseProgress),
      color: "hsl(var(--chart-2))",
      gradientId: "courseGradient",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Workshops",
      progress: Math.round(workshopProgress),
      color: "hsl(var(--chart-3))",
      gradientId: "workshopGradient",
      icon: <Award className="h-5 w-5" />,
    },
  ];

  const chartConfig = {
    progress: {
      label: "Progress",
    },
  };

  return (
    <Card className="w-full overflow-hidden border bg-card/50 backdrop-blur-sm shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight">Learning Progress</CardTitle>
            <CardDescription className="text-sm opacity-70">
              Your progress across different learning paths
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/15">
            {monthlyChange > 0 ? "+" : "-"}
            {Math.abs(monthlyChange)}%
            <TrendingUp className={`h-4 w-4 ${monthlyChange < 0 ? "rotate-180" : ""}`} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-0">
        {/* Progress indicators */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          {data.map((item, index) => (
            <FadeIn
              key={item.name}
              delay={index * 100}
              className="flex flex-col items-center justify-center rounded-lg bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
            >
              <div 
                className="mb-2 rounded-full p-2" 
                style={{ backgroundColor: `${item.color}20` }}
              >
                <div className="text-foreground">{item.icon}</div>
              </div>
              <div className="text-xl font-bold">{item.progress}%</div>
              <div className="text-xs text-muted-foreground">{item.name}</div>
            </FadeIn>
          ))}
        </div>

        {/* Chart */}
        <FadeIn
          delay={300}
          
        >
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data}
              margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              barGap={8}
              barSize={40}
            >
              <defs>
                {data.map((item) => (
                  <linearGradient key={item.gradientId} id={item.gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={item.color} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={item.color} stopOpacity={0.3} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 12 }} />
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                content={<ChartTooltipContent indicator="dot" formatter={(value) => `${value}%`} />}
              />
              <Bar
                dataKey="progress"
                radius={[8, 8, 0, 0]}
                name="Progress"
                fill="url(#techGradient)"
                fillOpacity={1}
                strokeWidth={1}
                strokeOpacity={0.6}
              />
            </BarChart>
          </ChartContainer>
        </FadeIn>
      </CardContent>

      <CardFooter className="mt-4 border-t bg-muted/20 pt-4">
        <div className="flex w-full items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
            Current learning period
          </div>
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProgressChart;
