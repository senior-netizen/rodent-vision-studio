import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import rodentLogo from "@/assets/rodent-logo.jpeg";

interface PreloaderProps {
  minDuration?: number;
}

export const Preloader = ({ minDuration = 1200 }: PreloaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const minTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setIsLoading(false), 500);
    }, minDuration);

    return () => clearTimeout(minTimer);
  }, [minDuration]);

  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-500",
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-accent/20 via-transparent to-transparent animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-tech/20 via-transparent to-transparent animate-pulse delay-300" />
      </div>

      {/* Logo and spinner */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated logo */}
        <div className="relative">
          {/* Outer ring */}
          <div className="absolute inset-0 w-24 h-24 rounded-2xl border-2 border-accent/30 animate-[spin_3s_linear_infinite]" />
          
          {/* Middle ring */}
          <div className="absolute inset-2 w-20 h-20 rounded-xl border-2 border-tech/40 animate-[spin_2s_linear_infinite_reverse]" />
          
          {/* Logo container */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div
              className={cn(
                "w-20 h-20 rounded-2xl overflow-hidden shadow-glow ring-1 ring-border/70 bg-card/80",
                "animate-[pulse_1.5s_ease-in-out_infinite]"
              )}
            >
              <img src={rodentLogo} alt="Rodent Inc. logo" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-border/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent via-tech to-energy rounded-full animate-[loading_1.2s_ease-in-out_infinite]"
            style={{
              animation: "loading 1.2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Text */}
        <p className="text-sm text-muted-foreground font-medium tracking-widest uppercase animate-pulse">
          Loading
        </p>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; margin-left: 0; }
          50% { width: 70%; margin-left: 15%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
