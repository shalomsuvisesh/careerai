import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/**
 * FeatureCard — landing page card with lime top-border accent.
 *
 * Props:
 *   icon       — React node (Lucide icon element)
 *   title      — string
 *   description — string
 *   href       — route path string
 *   cta        — CTA label string (default "Get started")
 *   index      — number (for data-ocid)
 */
export default function FeatureCard({
  icon,
  title,
  description,
  href,
  cta = "Get started",
  index = 1,
}) {
  return (
    <div
      className="career-card group flex flex-col gap-4"
      data-ocid={`feature_card.item.${index}`}
    >
      {/* Icon */}
      <div className="h-11 w-11 rounded-lg bg-lime-500/15 border border-lime-500/30 flex items-center justify-center text-lime-500 transition-smooth group-hover:bg-lime-500/25">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="font-display font-semibold text-base text-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* CTA */}
      <Link
        to={href}
        data-ocid={`feature_card.link.${index}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-lime-500 hover:text-lime-400 transition-colors mt-auto group/cta"
      >
        {cta}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
      </Link>
    </div>
  );
}
