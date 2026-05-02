import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Newspaper, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-subtle pointer-events-none" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-glow/10 blur-3xl pointer-events-none" />

        <div className="container relative py-20 md:py-32 text-center">
          <span className="inline-block rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
            Season 2025 · live data
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
            everything horse racing
            <br />
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              all in one place
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base md:text-lg text-muted-foreground">
            Race results, trainer & jockey stats, horse profiles, guides, and the latest news —
            wrapped up in one clean dashboard.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
              <Link to="/races">
                Explore races <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/guides">Read the guides</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="container pb-20 md:pb-28">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: BarChart3,
              title: "Race Dashboard",
              desc: "Sortable, searchable table with stats on every horse, jockey & trainer.",
              to: "/races",
            },
            {
              icon: Newspaper,
              title: "Latest News",
              desc: "Stay on top of headlines, results, and stories from the racing world.",
              to: "/news",
            },
            {
              icon: BookOpen,
              title: "Guides",
              desc: "Beginner-friendly explainers on form, odds, and how betting works.",
              to: "/guides",
            },
          ].map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className="group rounded-xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg gradient-primary text-primary-foreground shadow-elegant mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                Open <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
