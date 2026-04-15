import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import { resumeAnalyzer } from "../lib/careerAi";

const DOMAIN_LABELS = {
  tech: "Technology",
  business: "Business",
  creative: "Creative & Design",
  healthcare: "Healthcare",
  education: "Education",
  general: "General",
};

const DOMAIN_COLORS = {
  tech: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  business: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  creative: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  healthcare: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  education: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  general: "bg-muted text-muted-foreground border-border",
};

const SKILL_GAP_REASONS = {
  // Tech
  JavaScript: "Core web language — required for almost all frontend roles",
  Python: "Top language for data science, ML, and automation workflows",
  React: "Most in-demand frontend framework across product companies",
  "Node.js": "Powers server-side JavaScript and REST API development",
  SQL: "Critical for querying databases in backend and analyst roles",
  Git: "Version control is a non-negotiable baseline for all developers",
  "REST APIs": "API design and consumption underpins most modern systems",
  TypeScript: "Type safety reduces bugs and is expected in senior tech roles",
  Docker: "Containerization is standard in modern DevOps pipelines",
  Kubernetes:
    "Container orchestration at scale — critical for cloud-native roles",
  "CI/CD": "Automated delivery pipelines accelerate shipping velocity",
  AWS: "Market-leading cloud platform; certifications signal expertise",
  "System Design":
    "Senior engineers need to design scalable distributed systems",
  "Machine Learning": "Foundational for AI/ML and data science positions",
  GraphQL: "Alternative API paradigm gaining traction in product companies",
  // Business
  Excel: "Spreadsheet proficiency is a baseline expectation in business roles",
  PowerPoint: "Presentation skills directly impact executive communication",
  CRM: "Customer relationship tools are essential for sales and marketing",
  "Project Management":
    "Coordinating timelines and resources is a core leadership skill",
  "Data Analysis": "Decision-making roles require quantitative reasoning",
  Communication:
    "Written and verbal clarity is the top soft-skill differentiator",
  Salesforce:
    "Industry-standard CRM with strong demand across enterprise sales",
  Tableau: "Data visualization tool valued in analytics and BI roles",
  "Financial Modeling":
    "Required for finance, consulting, and investment banking",
  "A/B Testing": "Experimentation drives growth in product and marketing teams",
  Agile: "Cross-functional teams rely on agile methodology daily",
  OKRs: "Outcome-based goal frameworks are standard at scaling startups",
  // Creative
  Figma: "Industry-standard design tool — expected in all UX/UI roles",
  "Adobe Photoshop":
    "Raster editing tool required in visual and brand design roles",
  Illustrator: "Vector graphics tool essential for logo and icon work",
  Typography: "Type knowledge separates good designers from great ones",
  "User Research": "Evidence-based design decisions require research skills",
  Wireframing: "Low-fidelity sketching is the first step in any design process",
  "After Effects": "Motion graphics are increasingly expected in content roles",
  Prototyping: "Interactive prototypes validate UX before development begins",
  "Motion Design":
    "Animation skills are premium in product and media companies",
  "Design Systems":
    "Scalable component systems require systematic design thinking",
  Accessibility: "WCAG compliance is now a legal and ethical expectation",
  // Healthcare
  "Patient Care":
    "Direct patient interaction is foundational to clinical roles",
  "EMR Systems":
    "Electronic medical records are the backbone of clinical workflow",
  "Clinical Documentation":
    "Accurate records are critical for patient safety and compliance",
  "HIPAA Compliance":
    "Privacy regulation knowledge is mandatory in US healthcare",
  CPR: "Basic life support certification is required in most clinical settings",
  "Evidence-Based Practice":
    "Clinical decisions must be backed by current research",
  Telehealth:
    "Remote care delivery is rapidly expanding across all specialties",
  "Care Coordination":
    "Managing multi-disciplinary care improves patient outcomes",
  "Quality Improvement": "Process improvement reduces errors and lowers costs",
  // Education
  "Curriculum Design":
    "Building structured learning pathways is a core educator skill",
  "Lesson Planning":
    "Structured plans ensure learning objectives are consistently met",
  Assessment: "Measuring learner progress requires evaluation design skills",
  Differentiation:
    "Adapting instruction for diverse learners improves outcomes",
  Feedback: "Constructive feedback is the primary driver of skill development",
  "Learning Management Systems":
    "LMS platforms are the delivery channel for all digital learning",
  "Instructional Design":
    "ADDIE and related models structure effective training programs",
  "E-Learning Tools":
    "Articulate Storyline and similar tools are industry-standard",
  Coaching: "One-on-one coaching accelerates professional development",
};

function ResultsPanel({ result, onReset }) {
  return (
    <div className="space-y-5" data-ocid="resume.results">
      {/* Domain + Reset row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Detected Field
          </span>
          <Badge
            className={`capitalize border text-sm font-semibold px-3 py-1 ${DOMAIN_COLORS[result.domain] ?? DOMAIN_COLORS.general}`}
            data-ocid="resume.domain_badge"
          >
            {DOMAIN_LABELS[result.domain] ?? result.domain}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground transition-smooth"
          data-ocid="resume.reset_button"
        >
          <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
          Analyze Another
        </Button>
      </div>

      {/* Strengths */}
      <div className="career-card" data-ocid="resume.strengths_card">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="h-5 w-5 text-lime-500 shrink-0" />
          <h3 className="font-semibold text-base text-foreground">
            Detected Strengths
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {result.strengths.map((s) => (
            <span
              key={s}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: "oklch(0.25 0.06 127)",
                color: "oklch(0.88 0.18 127)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Skill Gaps */}
      <div className="career-card" data-ocid="resume.gaps_card">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-amber-400 shrink-0" />
          <h3 className="font-semibold text-base text-foreground">
            Skill Gaps to Address
          </h3>
        </div>
        <ul className="space-y-2.5">
          {result.skillGaps.map((s) => (
            <li
              key={s}
              className="flex items-start gap-3 p-2.5 rounded-lg border border-amber-500/15"
              style={{ backgroundColor: "oklch(0.2 0.03 60)" }}
            >
              <span
                className="mt-0.5 shrink-0 h-4 w-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.7 0.15 70 / 0.15)" }}
              >
                <TriangleAlert
                  className="h-2.5 w-2.5"
                  style={{ color: "oklch(0.78 0.16 70)" }}
                />
              </span>
              <div className="min-w-0">
                <span
                  className="block text-sm font-medium"
                  style={{ color: "oklch(0.82 0.12 70)" }}
                >
                  {s}
                </span>
                {SKILL_GAP_REASONS[s] && (
                  <span className="block text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {SKILL_GAP_REASONS[s]}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Improvement Tips */}
      <div className="career-card" data-ocid="resume.tips_card">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-lime-500 shrink-0" />
          <h3 className="font-semibold text-base text-foreground">
            Improvement Tips
          </h3>
        </div>
        <ol className="space-y-3">
          {result.tips.map((tip, i) => (
            <li
              key={tip}
              className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
            >
              <span className="shrink-0 w-5 h-5 rounded-full bg-lime-500/15 text-lime-500 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {tip}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-5" data-ocid="resume.loading_state">
      <div className="flex items-center gap-3">
        <Skeleton className="h-6 w-36 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="career-card space-y-3">
        <Skeleton className="h-5 w-40" />
        <div className="flex gap-2 flex-wrap">
          {["sk-a", "sk-b", "sk-c", "sk-d"].map((k) => (
            <Skeleton key={k} className="h-7 w-24 rounded-full" />
          ))}
        </div>
      </div>
      <div className="career-card space-y-2.5">
        <Skeleton className="h-5 w-48" />
        {["sk-1", "sk-2", "sk-3"].map((k) => (
          <Skeleton key={k} className="h-12 w-full rounded-lg" />
        ))}
      </div>
      <div className="career-card space-y-2.5">
        <Skeleton className="h-5 w-40" />
        {["sk-t1", "sk-t2", "sk-t3"].map((k) => (
          <Skeleton key={k} className="h-5 w-full" />
        ))}
      </div>
    </div>
  );
}

export default function ResumeAnalyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const charCount = text.length;
  const isTooShort = text.trim().length < 50;
  const showWarning = touched && isTooShort;

  const handleAnalyze = () => {
    setTouched(true);
    if (isTooShort) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(resumeAnalyzer(text));
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    setText("");
    setResult(null);
    setTouched(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) handleAnalyze();
  };

  return (
    <div className="min-h-screen bg-charcoal-950 py-10 md:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3 font-display">
            Resume <span className="text-lime-500">Analyzer</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Paste your resume and get instant skill gap analysis, detected
            strengths, and actionable improvement tips — powered by local AI
            logic.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left: Input panel */}
          <div
            className="career-card flex flex-col gap-4"
            data-ocid="resume.input_panel"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg text-foreground">
                Paste Your Resume
              </h2>
              {charCount > 0 && (
                <span className="text-xs text-muted-foreground tabular-nums">
                  {charCount.toLocaleString()} chars
                </span>
              )}
            </div>

            <div className="relative">
              <textarea
                data-ocid="resume.input"
                className={[
                  "w-full min-h-[380px] md:min-h-[480px] resize-none rounded-lg px-4 py-3",
                  "bg-charcoal-950 border text-sm font-mono text-foreground",
                  "placeholder-muted-foreground/50 leading-relaxed",
                  "transition-smooth focus:outline-none focus:ring-2",
                  showWarning
                    ? "border-amber-500/60 focus:ring-amber-500/30"
                    : "border-border focus:ring-lime-500/40",
                ].join(" ")}
                placeholder={
                  "Paste your resume here...\n\nInclude: Summary, Work Experience, Skills, and Education for the best analysis."
                }
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={() => setTouched(true)}
                onKeyDown={handleKeyDown}
                aria-label="Resume text input"
                aria-describedby={showWarning ? "resume-warning" : undefined}
              />
            </div>

            {/* Inline warning */}
            {showWarning && (
              <div
                id="resume-warning"
                className="flex items-center gap-2 text-sm rounded-lg px-3 py-2.5 border border-amber-500/30"
                style={{ backgroundColor: "oklch(0.2 0.03 60)" }}
                data-ocid="resume.warning_state"
                role="alert"
              >
                <AlertCircle
                  className="h-4 w-4 shrink-0"
                  style={{ color: "oklch(0.78 0.16 70)" }}
                />
                <span style={{ color: "oklch(0.82 0.12 70)" }}>
                  Your resume is too short for accurate analysis — please paste
                  at least 50 characters.
                </span>
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-lime-500 text-charcoal-950 hover:bg-lime-400 font-semibold transition-smooth disabled:opacity-50"
              data-ocid="resume.submit_button"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze Resume
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Tip: Press{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-xs">
                Ctrl + Enter
              </kbd>{" "}
              to analyze
            </p>
          </div>

          {/* Right: Results panel */}
          <div className="min-h-[200px]">
            {loading && <LoadingSkeleton />}
            {!loading && result && (
              <ResultsPanel result={result} onReset={handleReset} />
            )}
            {!loading && !result && (
              <div
                className="career-card flex flex-col items-center justify-center text-center py-16 gap-5"
                data-ocid="resume.empty_state"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "oklch(0.85 0.2 127 / 0.1)" }}
                >
                  <Sparkles className="h-7 w-7 text-lime-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">
                    Your analysis will appear here
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                    Paste your resume on the left and click Analyze Resume to
                    see your strengths, skill gaps, and personalized improvement
                    tips.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 w-full max-w-xs mt-2">
                  {[
                    {
                      icon: CheckCircle,
                      label: "Strengths",
                      color: "text-lime-500",
                    },
                    {
                      icon: AlertCircle,
                      label: "Skill Gaps",
                      color: "text-amber-400",
                    },
                    { icon: Sparkles, label: "Tips", color: "text-lime-500" },
                  ].map(({ icon: Icon, label, color }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-muted/20 border border-border"
                    >
                      <Icon className={`h-4 w-4 ${color}`} />
                      <span className="text-xs text-muted-foreground">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
