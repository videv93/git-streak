import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const numericValue = typeof value === 'string' ? parseInt(value.replace(/,/g, ''), 10) : value;
    
    if (isVisible) {
      let start = 0;
      const end = numericValue;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // 60 FPS

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [value, isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`stats-card-${title}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [title]);

  return (
    <Card 
      id={`stats-card-${title}`}
      className={cn(
        "bg-slate-800/50 border-slate-700 relative overflow-hidden group hover:bg-slate-800/70 transition-all duration-300",
        isVisible && "animate-fade-in"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl transform group-hover:scale-150 transition-transform duration-700" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-slate-200">{title}</CardTitle>
        <div className="p-2 bg-blue-500/10 rounded-full">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold text-slate-100">
          {isVisible ? count.toLocaleString() : '0'}
        </div>
      </CardContent>
    </Card>
  );
};