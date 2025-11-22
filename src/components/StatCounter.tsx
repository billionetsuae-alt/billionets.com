import { useCounter } from "@/hooks/useCounter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect } from "react";

interface StatCounterProps {
  value: number;
  label: string;
  delay?: number;
}

export const StatCounter = ({ value, label, delay = 0 }: StatCounterProps) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { count, start } = useCounter(value, { duration: 2000 });

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        start();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, start, delay]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold text-accent-gold mb-2 transition-all duration-slow">
        {count}+
      </div>
      <div className="text-sm sm:text-base text-muted-foreground">{label}</div>
    </div>
  );
};

