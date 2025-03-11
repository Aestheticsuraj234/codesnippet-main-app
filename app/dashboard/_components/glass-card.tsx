import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
  blur?: "sm" | "md" | "lg";
  border?: boolean;
}

const blurValues = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
};

export function GlassCard({
  children,
  className,
  variant = "light",
  blur = "md",
  border = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        blurValues[blur],
        variant === "light"
          ? "bg-white/10 shadow-lg"
          : "bg-black/10 shadow-lg",
        border && (variant === "light" ? "border border-white/20" : "border border-black/5"),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
