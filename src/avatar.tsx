import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Race } from "@/lib/races";

interface Props {
  races: Race[];
}

export const TrainerChart = ({ races }: Props) => {
  const data = useMemo(() => {
    const wins: Record<string, number> = {};
    for (const r of races) {
      if (r.position === 1 && r.trainer) {
        wins[r.trainer] = (wins[r.trainer] || 0) + 1;
      }
    }
    return Object.entries(wins)
      .map(([trainer, w]) => ({ trainer, wins: w }))
      .sort((a, b) => b.wins - a.wins)
      .slice(0, 10);
  }, [races]);

  return (
    <div className="rounded-xl bg-card border border-border p-5 shadow-card">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">Top 10 Trainers by Wins</h2>
        <p className="text-sm text-muted-foreground">Number of first-place finishes</p>
      </div>
      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="trainer"
              angle={-35}
              textAnchor="end"
              interval={0}
              height={80}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              stroke="hsl(var(--border))"
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              stroke="hsl(var(--border))"
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                color: "hsl(var(--popover-foreground))",
              }}
              cursor={{ fill: "hsl(var(--muted) / 0.5)" }}
            />
            <Bar dataKey="wins" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
