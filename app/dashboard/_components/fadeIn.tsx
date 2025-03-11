import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
  threshold?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 500,
  direction = "up",
  distance = 20,
  once = true,
  threshold = 0.1,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasAnimated(true);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '50px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [once, threshold, hasAnimated]);

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      case "left":
        return `translateX(${distance}px)`;
      case "right":
        return `translateX(-${distance}px)`;
      default:
        return "none";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible || hasAnimated ? 1 : 0,
        transform: isVisible || hasAnimated ? "none" : getInitialTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function FadeInStagger({
  children,
  className,
  childClassName,
  staggerDelay = 100,
  ...props
}: FadeInProps & { childClassName?: string; staggerDelay?: number }) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, i) => (
        <FadeIn
          key={i}
          className={childClassName}
          delay={(i + 1) * staggerDelay}
          {...props}
        >
          {child}
        </FadeIn>
      ))}
    </div>
  );
}
