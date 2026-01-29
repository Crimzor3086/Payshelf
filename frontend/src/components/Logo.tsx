import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ className, size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "h-7 w-7",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 rounded-lg blur-sm" />
        <div className={cn("relative bg-primary rounded-lg p-1.5 flex items-center justify-center", sizeClasses[size])}>
          <Wallet className="h-full w-full text-primary-foreground" strokeWidth={2} />
        </div>
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight text-foreground", textSizes[size])}>
          PayShelf
        </span>
      )}
    </Link>
  );
};

export default Logo;
