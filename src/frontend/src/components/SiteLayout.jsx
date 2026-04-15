import { Outlet } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import SiteNav from "./SiteNav";

export default function SiteLayout() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {year}. Built with{" "}
            <Heart className="inline h-4 w-4 text-lime-500 fill-lime-500" />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-500 hover:text-lime-400 transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
