import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { BrainCircuit, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/quiz", label: "Career Quiz" },
  { path: "/resume", label: "Resume" },
  { path: "/jobs", label: "Job Matcher" },
  { path: "/chat", label: "Mentor Chat" },
];

export default function SiteNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <header
      data-ocid="site.nav"
      className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
    >
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            data-ocid="site.nav_logo_link"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity group"
          >
            <div className="h-9 w-9 rounded-lg bg-lime-500 flex items-center justify-center shadow-sm">
              <BrainCircuit className="h-5 w-5 text-charcoal-950" />
            </div>
            <span className="text-lg font-bold text-foreground font-display tracking-tight">
              CareerAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-ocid={`site.nav_${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className={
                    isActive(link.path)
                      ? "relative text-lime-500 font-semibold after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-lime-500"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-lime-500 transition-colors rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            data-ocid="site.nav_mobile_toggle"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className="md:hidden py-3 border-t border-border"
            data-ocid="site.nav_mobile_menu"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  data-ocid={`site.nav_mobile_${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={
                      isActive(link.path)
                        ? "w-full justify-start text-lime-500 font-semibold bg-lime-500/10"
                        : "w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }
                  >
                    {isActive(link.path) && (
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-lime-500 shrink-0" />
                    )}
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
