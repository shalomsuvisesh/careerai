import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle,
  Lightbulb,
  MessageSquare,
  Rocket,
  ScanText,
} from "lucide-react";
import FeatureCard from "../components/FeatureCard";

const FEATURES = [
  {
    key: "quiz",
    icon: <BookOpen className="h-5 w-5" />,
    title: "Career Quiz",
    description:
      "Discover your ideal career path with 6 targeted questions tailored to your strengths and interests.",
    href: "/quiz",
    cta: "Take the quiz",
  },
  {
    key: "resume",
    icon: <ScanText className="h-5 w-5" />,
    title: "Resume Analyzer",
    description:
      "Get skill gap analysis and personalized improvement tips to make your resume stand out.",
    href: "/resume",
    cta: "Analyze resume",
  },
  {
    key: "jobs",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    title: "Job Matcher",
    description:
      "Find roles that align with your current skills and career goals from curated job categories.",
    href: "/jobs",
    cta: "Match jobs",
  },
  {
    key: "chat",
    icon: <MessageSquare className="h-5 w-5" />,
    title: "AI Mentor Chat",
    description:
      "Chat with your AI career mentor for personalized advice on interviews, job search, and growth.",
    href: "/chat",
    cta: "Start chatting",
  },
];

const STEPS = [
  {
    key: "answer",
    number: "01",
    icon: <CheckCircle className="h-6 w-6 text-lime-500" />,
    title: "Answer questions",
    description:
      "Tell us about your skills, experience, and career aspirations through our targeted prompts.",
  },
  {
    key: "insights",
    number: "02",
    icon: <Lightbulb className="h-6 w-6 text-lime-500" />,
    title: "Get AI insights",
    description:
      "Our local AI engine analyzes your inputs and surfaces personalized career recommendations.",
  },
  {
    key: "action",
    number: "03",
    icon: <Rocket className="h-6 w-6 text-lime-500" />,
    title: "Take action",
    description:
      "Use your tailored plan to apply for jobs, improve your resume, and ace your next interview.",
  },
];

export default function Home() {
  return (
    <div className="w-full" data-ocid="home.page">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        className="hero-section relative overflow-hidden"
        data-ocid="home.hero.section"
      >
        {/* Decorative radial glows */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,oklch(0.85_0.2_127_/_0.08),transparent)] " />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_30%,oklch(0.85_0.2_127_/_0.05),transparent)]" />

        <div className="container mx-auto px-4 md:px-6 py-16 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-500 text-sm font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-500 animate-pulse" />
              AI-Powered · 100% Private · No Login Required
            </span>

            {/* Headline */}
            <h1 className="headline-hero text-5xl md:text-7xl leading-[1.1]">
              Your <span className="text-lime-500">AI Career</span> Navigator
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              CareerAI helps you discover the right path, sharpen your resume,
              match jobs to your skills, and get mentor-level advice — all
              running locally in your browser.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link to="/quiz" data-ocid="home.quiz_cta.primary_button">
                <button
                  type="button"
                  className="btn-cta inline-flex items-center gap-2 text-base px-8 py-3 group"
                >
                  Take the Career Quiz
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Link>
              <Link to="/chat" data-ocid="home.chat_cta.secondary_button">
                <button
                  type="button"
                  className="btn-secondary inline-flex items-center gap-2 text-base px-8 py-3 group"
                >
                  Chat with AI Mentor
                  <MessageSquare className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Cards ────────────────────────────────────── */}
      <section
        className="py-16 md:py-24 bg-charcoal-950 px-4 md:px-6"
        data-ocid="home.features.section"
      >
        <div className="container mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 space-y-3">
            <p className="text-lime-500 text-sm font-semibold tracking-widest uppercase">
              Tools
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
              Everything you need to advance your career
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Four AI-powered tools built to work together. No accounts, no
              uploads, no external services — just smart guidance.
            </p>
          </div>

          {/* Cards grid */}
          <div className="features-grid" data-ocid="home.features.list">
            {FEATURES.map((feat, i) => (
              <FeatureCard
                key={feat.key}
                icon={feat.icon}
                title={feat.title}
                description={feat.description}
                href={feat.href}
                cta={feat.cta}
                index={i + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section
        className="py-16 md:py-24 bg-charcoal-900 px-4 md:px-6 border-t border-border"
        data-ocid="home.how_it_works.section"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12 space-y-3">
            <p className="text-lime-500 text-sm font-semibold tracking-widest uppercase">
              How It Works
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
              Three steps to your next career move
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {STEPS.map((step, i) => (
              <div
                key={step.key}
                className="relative flex flex-col items-center text-center gap-4"
                data-ocid={`home.step.item.${i + 1}`}
              >
                {/* Connector line (desktop) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-px bg-gradient-to-r from-lime-500/40 to-transparent" />
                )}

                {/* Step number badge */}
                <div className="relative h-12 w-12 rounded-full bg-lime-500/10 border border-lime-500/30 flex items-center justify-center shrink-0">
                  {step.icon}
                  <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-charcoal-950 border border-lime-500/40 text-lime-500 text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display font-semibold text-base text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ───────────────────────────────────────── */}
      <section
        className="py-16 md:py-20 bg-charcoal-950 px-4 md:px-6 border-t border-border relative overflow-hidden"
        data-ocid="home.footer_cta.section"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_100%,oklch(0.85_0.2_127_/_0.07),transparent)]" />

        <div className="container mx-auto text-center relative space-y-6">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
            Start your career journey{" "}
            <span className="text-lime-500">today</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Six questions. Instant insights. Zero data stored. Your next chapter
            starts with a single click.
          </p>
          <Link to="/quiz" data-ocid="home.footer_cta.primary_button">
            <button
              type="button"
              className="btn-cta inline-flex items-center gap-2 text-base px-10 py-3 group"
            >
              Begin Career Quiz
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
