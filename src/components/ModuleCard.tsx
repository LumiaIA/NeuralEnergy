import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export const ModuleCard = ({ icon: Icon, title, description, features }: ModuleCardProps) => {
  return (
    <Card className="p-6 bg-gradient-subtle border-border shadow-card hover:shadow-soft transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gradient-primary rounded-lg group-hover:scale-105 transition-transform duration-300">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};