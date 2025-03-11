"use client"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ProgressChartProps {
  techProgress: number
  courseProgress: number
  workshopProgress: number
}

const ProgressChart = ({ techProgress, courseProgress, workshopProgress }: ProgressChartProps) => {
  const data = [
    {
      name: "Technologies",
      progress: Math.round(techProgress),
      fill: "hsl(var(--primary))",
    },
    {
      name: "Courses",
      progress: Math.round(courseProgress),
      fill: "hsl(var(--primary) / 0.8)",
    },
    {
      name: "Workshops",
      progress: Math.round(workshopProgress),
      fill: "hsl(var(--primary) / 0.6)",
    },
  ]

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
            formatter={(value) => [`${value}%`, "Progress"]}
          />
          <Legend />
          <Bar dataKey="progress" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProgressChart

