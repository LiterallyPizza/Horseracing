import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string | number;
  sublabel?: string;
  icon: LucideIcon;
}

export const StatCard = ({ label, value, sublabel, icon: Icon }: Props) => {
  return (
    <div className="rounded-xl bg-card border border-border p-5 shadow-card transition hover:shadow-elegant">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 text-2xl md:text-3xl font-bold text-foreground truncate">
            {value}
          </p>
          {sublabel && (
            <p className="mt-1 text-xs text-muted-foreground truncate">{sublabel}</p>
          )}
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg gradient-primary text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};
