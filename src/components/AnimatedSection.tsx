import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  threshold?: number;
}

export const AnimatedSection = ({
  children,
  className,
  delay = 0,
  direction = "up",
  threshold = 0.1,
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce: true,
  });

  const directionClasses = {
    up: "animate-on-scroll",
    left: "animate-on-scroll",
    right: "animate-on-scroll",
    scale: "animate-fade-in-scale",
  };

  const delayClasses = {
    0: "",
    1: "animate-on-scroll-delay-1",
    2: "animate-on-scroll-delay-2",
    3: "animate-on-scroll-delay-3",
    4: "animate-on-scroll-delay-4",
  };

  return (
    <div
      ref={ref}
      className={cn(
        directionClasses[direction],
        delayClasses[delay as keyof typeof delayClasses] || "",
        isVisible && "visible",
        className
      )}
    >
      {children}
    </div>
  );
};

