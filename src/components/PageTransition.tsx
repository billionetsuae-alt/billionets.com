import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<"entering" | "entered">("entered");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("entering");
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("entered");
        // Smooth scroll to top on route change
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <div
      className={cn(
        "min-h-screen transition-opacity duration-medium ease-smooth",
        transitionStage === "entering" ? "opacity-0" : "opacity-100"
      )}
    >
      {children}
    </div>
  );
};

