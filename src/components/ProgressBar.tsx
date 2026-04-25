// Reusable animated progress bar
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const ProgressBar = ({ value, className, showLabel = false, size = "md" }: ProgressBarProps) => {
  const clamped = Math.max(0, Math.min(100, value));
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-3.5" };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1.5">
          <span>Progress</span>
          <span className="text-foreground">{clamped}%</span>
        </div>
      )}
      <div className={cn("w-full bg-secondary rounded-full overflow-hidden", heights[size])}>
        <div
          className="h-full bg-gradient-primary rounded-full transition-all duration-700 ease-out shadow-glow"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
