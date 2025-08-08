import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

export const StatsCard = ({ icon: Icon, title, value, change, trend }: StatsCardProps) => {
  const trendColor = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-muted-foreground"
  };

  return (
    <Card className="p-6 bg-gradient-subtle border-border shadow-card hover:shadow-soft transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {change && (
            <p className={`text-sm font-medium mt-1 ${trendColor[trend || "neutral"]}`}>
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-gradient-primary rounded-lg">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
    </Card>
  );
};