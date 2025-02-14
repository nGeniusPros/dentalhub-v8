import { LayoutDashboard, Brain, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardHeader({ title, className }: { title: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 mb-8", className)}>
      <div className="bg-navy/10 p-3 rounded-xl">
        {title.includes("Analytics") ? (
          <Brain className="w-6 h-6 text-navy" />
        ) : title.includes("Staff") ? (
          <Users className="w-6 h-6 text-navy" />
        ) : (
          <LayoutDashboard className="w-6 h-6 text-navy" />
        )}
      </div>
      <h1 className="text-2xl font-semibold text-gray-darker">{title}</h1>
    </div>
  );
}
