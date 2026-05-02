import { useEffect, useMemo, useState } from "react";
import { Activity, Award, Search, Trophy, Users, Moon, Sun } from "lucide-react";
import { fetchRaces, Race } from "@/lib/races";
import { useTheme } from "@/hooks/useTheme";
import { StatCard } from "@/components/dashboard/StatCard";
import { TrainerChart } from "@/components/dashboard/TrainerChart";
import { RacesTable } from "@/components/dashboard/RacesTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const topByCount = (races: Race[], key: "trainer" | "jockey", winsOnly = true) => {
  const counts: Record<string, number> = {};
  for (const r of races) {
    if (winsOnly && r.position !== 1) continue;
    const v = r[key];
    if (!v) continue;
    counts[v] = (counts[v] || 0) + 1;
  }
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0] ?? ["—", 0];
};

const Index = () => {
  const { theme, toggle } = useTheme();
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;
    fetchRaces()
      .then((d) => active && setRaces(d))
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => {
    const totalRaces = new Set(races.map((r) => `${r.date}|${r.course}|${r.distance}`))
      .size;
    const uniqueHorses = new Set(races.map((r) => r.horse).filter(Boolean)).size;
    const [topTrainer, topTrainerWins] = topByCount(races, "trainer");
    const [topJockey, topJockeyWins] = topByCount(races, "jockey");
    return { totalRaces, uniqueHorses, topTrainer, topTrainerWins, topJockey, topJockeyWins };
  }, [races]);

  return (
    <div className="min-h-screen gradient-subtle">
      <header className="border-b border-border bg-background/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary text-primary-foreground shadow-elegant">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-foreground leading-none">
                Paddock
              </h1>
              <p className="text-xs text-muted-foreground">Horse Racing Dashboard 2025</p>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <main className="container py-6 md:py-10 space-y-6">
        {error && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive">
            Failed to load race data: {error}
          </div>
        )}

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Races"
            value={loading ? "…" : stats.totalRaces.toLocaleString()}
            icon={Activity}
          />
          <StatCard
            label="Unique Horses"
            value={loading ? "…" : stats.uniqueHorses.toLocaleString()}
            icon={Users}
          />
          <StatCard
            label="Top Trainer"
            value={loading ? "…" : (stats.topTrainer as string)}
            sublabel={loading ? undefined : `${stats.topTrainerWins} wins`}
            icon={Award}
          />
          <StatCard
            label="Top Jockey"
            value={loading ? "…" : (stats.topJockey as string)}
            sublabel={loading ? undefined : `${stats.topJockeyWins} wins`}
            icon={Trophy}
          />
        </section>

        <section>
          <TrainerChart races={races} />
        </section>

        <section className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground">All Races</h2>
              <p className="text-sm text-muted-foreground">
                Sort any column or search across the entire dataset.
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search horse, jockey, trainer…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          {loading ? (
            <div className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground shadow-card">
              Loading race data…
            </div>
          ) : (
            <RacesTable races={races} globalFilter={search} setGlobalFilter={setSearch} />
          )}
        </section>

        <footer className="pt-6 pb-2 text-center text-xs text-muted-foreground">
          Data sourced from{" "}
          <a
            href="https://github.com/LiterallyPizza/Horseracing"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-primary"
          >
            LiterallyPizza/Horseracing
          </a>
        </footer>
      </main>
    </div>
  );
};

export default Index;
