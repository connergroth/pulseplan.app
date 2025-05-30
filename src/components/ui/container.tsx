import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("mx-auto max-w-6xl px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}; 