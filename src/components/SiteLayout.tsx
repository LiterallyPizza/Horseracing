import { Outlet, NavLink, Link } from "react-router-dom";
import { Moon, Sun, Trophy, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/races", label: "Horse Races" },
  { to: "/news", label: "News" },
  { to: "/horses", label: "Horses" },
  { to: "/guides", label: "Guides" },
  { to: "/about", label: "About Us" },
  { to: "/donate", label: "Donate" },
];

const SiteLayout = () => {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container flex items-center justify-between py-5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg gradient-primary text-primary-foreground shadow-elegant transition-transform group-hover:scale-105">
              <Trophy className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                Paddock
              </span>
              <span className="hidden sm:inline-block h-6 w-px bg-border" />
              <span className="hidden sm:inline text-sm text-muted-foreground">
                horse racing website
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Nav bar */}
      <nav className="border-b-2 border-primary bg-secondary/60">
        <div className="container hidden md:flex items-center justify-between">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "relative px-4 py-4 text-sm font-medium transition-colors hover:text-primary",
                  isActive
                    ? "text-primary after:absolute after:left-0 after:right-0 after:-bottom-[2px] after:h-[3px] after:bg-primary"
                    : "text-foreground/80"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        {open && (
          <div className="md:hidden container flex flex-col py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-2 py-3 text-sm font-medium border-b border-border last:border-0 transition-colors",
                    isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-background">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 py-4 text-xs text-muted-foreground">
          <span>version 1.0</span>
          <span>
            data ·{" "}
            <a
              href="https://github.com/LiterallyPizza/Horseracing"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-primary"
            >
              LiterallyPizza/Horseracing
            </a>
          </span>
          <span>language: english</span>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
