import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { careerQuizLogic } from "../lib/careerAi";

const QUESTIONS = [
  {
    id: "q1",
    question: "What type of tasks energize you most?",
    options: [
      { id: "a", label: "Technical problem-solving" },
      { id: "b", label: "Creative projects" },
      { id: "c", label: "Helping people" },
      { id: "d", label: "Analyzing data" },
      { id: "e", label: "Managing teams" },
      { id: "f", label: "Teaching others" },
    ],
  },
  {
    id: "q2",
    question: "What's your preferred work environment?",
    options: [
      { id: "a", label: "Office / corporate" },
      { id: "b", label: "Remote / flexible" },
      { id: "c", label: "Collaborative team" },
      { id: "d", label: "Independent" },
      { id: "e", label: "Outdoors / active" },
      { id: "f", label: "Fast-paced startup" },
    ],
  },
  {
    id: "q3",
    question: "Which skill area feels most natural to you?",
    options: [
      { id: "a", label: "Coding / tech" },
      { id: "b", label: "Writing / communication" },
      { id: "c", label: "Mathematics / logic" },
      { id: "d", label: "Art / design" },
      { id: "e", label: "Leadership" },
      { id: "f", label: "Research" },
    ],
  },
  {
    id: "q4",
    question: "What motivates you most at work?",
    options: [
      { id: "a", label: "Salary / stability" },
      { id: "b", label: "Impact on society" },
      { id: "c", label: "Creative freedom" },
      { id: "d", label: "Learning new things" },
      { id: "e", label: "Recognition / achievement" },
      { id: "f", label: "Work-life balance" },
    ],
  },
  {
    id: "q5",
    question: "How do you prefer to solve problems?",
    options: [
      { id: "a", label: "Systematic / methodical" },
      { id: "b", label: "Collaborative brainstorm" },
      { id: "c", label: "Intuitive / creative" },
      { id: "d", label: "Data-driven analysis" },
      { id: "e", label: "Mentoring others" },
      { id: "f", label: "Hands-on experimentation" },
    ],
  },
  {
    id: "q6",
    question: "Where do you see yourself in 5 years?",
    options: [
      { id: "a", label: "Technical expert / architect" },
      { id: "b", label: "Team lead / manager" },
      { id: "c", label: "Entrepreneur" },
      { id: "d", label: "Subject matter expert" },
      { id: "e", label: "Creative director" },
      { id: "f", label: "Helping communities" },
    ],
  },
];

// Map quiz option labels to keywords the AI logic can detect
const DOMAIN_SIGNAL_MAP = {
  "Technical problem-solving": "coding tech algorithm",
  "Creative projects": "creative art design",
  "Helping people": "care healthcare therapy",
  "Analyzing data": "data machine learning statistics",
  "Managing teams": "management leadership business",
  "Teaching others": "teaching education training",
  "Office / corporate": "corporate business management",
  "Remote / flexible": "tech developer remote",
  "Collaborative team": "team management leadership",
  Independent: "research creative writing",
  "Outdoors / active": "healthcare fitness wellness",
  "Fast-paced startup": "startup entrepreneur tech",
  "Coding / tech": "coding javascript python tech developer",
  "Writing / communication": "writing content journalism creative",
  "Mathematics / logic": "mathematics data algorithm tech",
  "Art / design": "art design graphic illustration creative",
  Leadership: "leadership management business",
  Research: "research healthcare education",
  "Salary / stability": "business finance corporate",
  "Impact on society": "healthcare education social",
  "Creative freedom": "creative art design",
  "Learning new things": "tech coding machine learning",
  "Recognition / achievement": "business marketing management",
  "Work-life balance": "education healthcare remote",
  "Systematic / methodical": "coding algorithm tech",
  "Collaborative brainstorm": "business management team",
  "Intuitive / creative": "creative design art",
  "Data-driven analysis": "data machine learning statistics tech",
  "Mentoring others": "teaching education mentor",
  "Hands-on experimentation": "research lab biotech",
  "Technical expert / architect": "software architect tech developer",
  "Team lead / manager": "management leadership business",
  Entrepreneur: "startup entrepreneur business",
  "Subject matter expert": "research education data",
  "Creative director": "creative design art brand",
  "Helping communities": "healthcare education social",
};

const RESULT_SKILLS = {
  tech: [
    "JavaScript",
    "Python",
    "React",
    "System Design",
    "SQL",
    "DevOps",
    "Cloud",
    "Algorithms",
  ],
  business: [
    "Strategy",
    "Excel",
    "Leadership",
    "CRM",
    "Data Analysis",
    "Project Mgmt",
    "Communication",
  ],
  creative: [
    "Figma",
    "Storytelling",
    "Typography",
    "User Research",
    "Branding",
    "Adobe Suite",
  ],
  healthcare: [
    "Patient Care",
    "Clinical Skills",
    "EMR Systems",
    "Research",
    "Care Coordination",
  ],
  education: [
    "Curriculum Design",
    "Facilitation",
    "Coaching",
    "Instructional Design",
    "Assessment",
  ],
};

export default function CareerQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));
  const [result, setResult] = useState(null);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const currentQ = QUESTIONS[step];
  const selected = answers[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  const handleSelect = (label) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = label;
      return next;
    });
  };

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      // Map selected options to domain-rich text for AI scoring
      const mapped = answers.map((a) => DOMAIN_SIGNAL_MAP[a] || a);
      setResult(careerQuizLogic(mapped));
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const handleReset = () => {
    setAnswers(Array(QUESTIONS.length).fill(""));
    setResult(null);
    setStep(0);
    setDirection(1);
  };

  const skills = result ? RESULT_SKILLS[result.path] || RESULT_SKILLS.tech : [];
  const nextSteps = result ? (result.nextSteps || []).slice(0, 3) : [];

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <div
      className="min-h-screen bg-charcoal-950 py-12 md:py-20 px-4"
      data-ocid="career_quiz.page"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-charcoal-900 border border-border rounded-full px-4 py-1.5 mb-5">
            <Sparkles className="h-4 w-4 text-lime-500" />
            <span className="text-sm text-muted-foreground font-medium">
              AI-Powered Career Guidance
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Career <span className="text-lime-500">Quiz</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            6 questions to discover your ideal career path
          </p>
        </motion.div>

        {/* Quiz Card */}
        {!result ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card
              className="bg-charcoal-900 border-border shadow-2xl overflow-hidden"
              data-ocid="quiz.card"
            >
              {/* Progress Header */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="outline"
                    className="text-lime-500 border-lime-500/40 bg-lime-500/5"
                    data-ocid="quiz.progress_badge"
                  >
                    Question {step + 1} of {QUESTIONS.length}
                  </Badge>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {Math.round(progress)}% complete
                  </span>
                </div>
                {/* Lime Progress Bar */}
                <div
                  className="w-full h-2 bg-charcoal-950 rounded-full overflow-hidden"
                  data-ocid="quiz.progress_bar"
                >
                  <motion.div
                    className="h-full bg-lime-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>

              <CardContent className="px-6 pb-6">
                {/* Animated Question */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <CardHeader className="px-0 pt-0 pb-5">
                      <h2
                        className="text-xl md:text-2xl font-semibold text-foreground leading-snug"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {currentQ.question}
                      </h2>
                    </CardHeader>

                    {/* Options Grid */}
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                      data-ocid="quiz.options_list"
                    >
                      {currentQ.options.map((opt, idx) => {
                        const isSelected = selected === opt.label;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            data-ocid={`quiz.option.${idx + 1}`}
                            onClick={() => handleSelect(opt.label)}
                            className={[
                              "text-left rounded-lg px-4 py-3 text-sm font-medium border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500",
                              isSelected
                                ? "bg-lime-500/15 border-lime-500 text-lime-500 shadow-sm shadow-lime-500/20"
                                : "bg-charcoal-950 border-border text-muted-foreground hover:border-lime-500/40 hover:text-foreground hover:bg-charcoal-950/60",
                            ].join(" ")}
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className={[
                                  "inline-flex h-5 w-5 shrink-0 rounded-full border items-center justify-center text-xs font-bold",
                                  isSelected
                                    ? "bg-lime-500 border-lime-500 text-charcoal-950"
                                    : "border-border text-muted-foreground",
                                ].join(" ")}
                              >
                                {opt.id.toUpperCase()}
                              </span>
                              {opt.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={step === 0}
                    data-ocid="quiz.back_button"
                    className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                  >
                    <ArrowLeft className="mr-1.5 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!selected}
                    data-ocid="quiz.next_button"
                    className="bg-lime-500 text-charcoal-950 hover:bg-lime-400 font-semibold disabled:opacity-40 disabled:cursor-not-allowed px-6"
                  >
                    {step < QUESTIONS.length - 1 ? (
                      <>
                        Next <ArrowRight className="ml-1.5 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        See My Results{" "}
                        <CheckCircle className="ml-1.5 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Step dots */}
            <div
              className="flex justify-center gap-2 mt-6"
              data-ocid="quiz.step_dots"
            >
              {QUESTIONS.map((q, i) => (
                <div
                  key={q.id}
                  className={[
                    "h-2 rounded-full transition-all duration-300",
                    i === step
                      ? "w-6 bg-lime-500"
                      : answers[i]
                        ? "w-2 bg-lime-500/50"
                        : "w-2 bg-charcoal-900 border border-border",
                  ].join(" ")}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          /* Results Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            data-ocid="quiz.result_card"
          >
            <Card className="bg-charcoal-900 border-lime-500/30 shadow-2xl shadow-lime-500/10 overflow-hidden">
              {/* Lime accent top bar */}
              <div className="h-1.5 w-full bg-lime-500" />

              <CardContent className="p-6 md:p-8 space-y-8">
                {/* Match badge + Title */}
                <div>
                  <Badge className="bg-lime-500/10 text-lime-500 border border-lime-500/30 mb-4">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Your Career Match
                  </Badge>
                  <h2
                    className="text-3xl md:text-4xl font-bold text-lime-500 mb-3 leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                    data-ocid="quiz.result_title"
                  >
                    {result.title}
                  </h2>
                  <p
                    className="text-muted-foreground leading-relaxed text-base"
                    data-ocid="quiz.result_explanation"
                  >
                    {result.explanation}
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                    Key Skills to Develop
                  </h3>
                  <div
                    className="flex flex-wrap gap-2"
                    data-ocid="quiz.result_skills"
                  >
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-sm border border-lime-500/40 text-lime-500 bg-lime-500/5 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Next Steps */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                    Your Next 3 Steps
                  </h3>
                  <ol className="space-y-3" data-ocid="quiz.result_steps">
                    {nextSteps.map((stepText, i) => (
                      <li
                        key={stepText}
                        className="flex items-start gap-4"
                        data-ocid={`quiz.result_step.${i + 1}`}
                      >
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-lime-500 text-charcoal-950 text-sm font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <p className="text-muted-foreground text-sm leading-relaxed pt-1">
                          {stepText}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Retake */}
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="w-full border-border hover:border-lime-500/50 hover:text-lime-500 transition-smooth"
                  data-ocid="quiz.reset_button"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retake Quiz
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
