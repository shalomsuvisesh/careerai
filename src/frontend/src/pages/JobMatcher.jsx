import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BriefcaseBusiness,
  DollarSign,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import { jobMatcher } from "../lib/careerAi";

const QUICK_SKILLS = [
  "React",
  "Python",
  "Excel",
  "Writing",
  "Leadership",
  "Design",
  "SQL",
  "Marketing",
  "Java",
  "Node.js",
];

export default function JobMatcher() {
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [results, setResults] = useState(null);

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill) =>
    setSkills((prev) => prev.filter((s) => s !== skill));

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  const handleMatch = () => {
    if (skills.length === 0) return;
    const raw = jobMatcher(skills);
    const sorted = [...raw].sort((a, b) => b.match - a.match);
    setResults(sorted);
  };

  const handleReset = () => {
    setSkills([]);
    setResults(null);
    setSkillInput("");
  };

  const matchBadgeStyle = (pct) => {
    if (pct >= 70) return "text-lime-500 border-lime-500/40 bg-lime-500/10";
    if (pct >= 40) return "text-amber-400 border-amber-400/40 bg-amber-400/10";
    return "text-muted-foreground border-border bg-muted";
  };

  const matchTextColor = (pct) => {
    if (pct >= 70) return "text-lime-500";
    if (pct >= 40) return "text-amber-400";
    return "text-muted-foreground";
  };

  return (
    <div className="w-full min-h-screen bg-charcoal-950 py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Job <span className="text-lime-500">Matcher</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Add your skills and discover the roles that fit you best.
          </p>
        </div>

        {/* Skill input panel */}
        <div
          className="bg-charcoal-900 border border-border rounded-xl p-6 mb-8 shadow-xl"
          style={{ borderTop: "3px solid oklch(0.85 0.2 127)" }}
          data-ocid="jobs.input_panel"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Your Skills
          </h2>

          {/* Chip display area */}
          <div
            className="flex flex-wrap gap-2 min-h-[44px] mb-4"
            data-ocid="jobs.chips_area"
          >
            {skills.length === 0 ? (
              <span className="text-sm text-muted-foreground self-center">
                No skills added yet — type below or use Quick Add
              </span>
            ) : (
              skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border
                    bg-lime-500/10 text-lime-300 border-lime-700/60 transition-smooth"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeSkill(s)}
                    className="hover:text-foreground transition-colors rounded-full"
                    aria-label={`Remove ${s}`}
                    data-ocid={`jobs.remove_skill.${s}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Text input + Add button */}
          <div className="flex gap-2 mb-4">
            <Input
              data-ocid="jobs.skill_input"
              placeholder="Type a skill and press Enter…"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-charcoal-950 border-border focus:ring-lime-500/40 text-foreground placeholder:text-muted-foreground"
            />
            <Button
              variant="outline"
              onClick={() => addSkill(skillInput)}
              disabled={!skillInput.trim()}
              className="border-border bg-charcoal-950 hover:border-lime-500/60 hover:text-lime-500 shrink-0"
              data-ocid="jobs.add_skill_button"
            >
              Add
            </Button>
          </div>

          {/* Quick-add buttons */}
          <div className="mb-6">
            <p className="text-xs text-muted-foreground mb-2">Quick add:</p>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_SKILLS.filter((s) => !skills.includes(s)).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => addSkill(s)}
                  className="text-xs px-2.5 py-1 rounded border border-border
                    bg-charcoal-950 text-muted-foreground
                    hover:border-lime-500/60 hover:text-lime-400
                    transition-smooth"
                  data-ocid={`jobs.quick_add.${s}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={handleMatch}
            disabled={skills.length === 0}
            className="w-full bg-lime-500 text-charcoal-950 hover:bg-lime-400 font-semibold disabled:opacity-40"
            data-ocid="jobs.match_button"
          >
            <Search className="mr-2 h-4 w-4" />
            Find Matching Jobs
          </Button>
        </div>

        {/* Results */}
        {results !== null && (
          <div data-ocid="jobs.results">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-muted-foreground">
                {results.length > 0
                  ? `${results.length} matching role${results.length !== 1 ? "s" : ""} found`
                  : "No matches — try adding more skills"}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-muted-foreground hover:text-foreground"
                data-ocid="jobs.search_again_button"
              >
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                Search Again
              </Button>
            </div>

            {results.length === 0 ? (
              <div
                className="bg-charcoal-900 border border-border rounded-xl p-10 text-center"
                data-ocid="jobs.empty_state"
              >
                <BriefcaseBusiness className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-foreground font-medium mb-1">
                  No roles matched your skills
                </p>
                <p className="text-sm text-muted-foreground">
                  Try adding more specific technical or domain keywords.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((job, i) => (
                  <div
                    key={job.role}
                    className="bg-charcoal-900 border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-lime-500/40 transition-smooth"
                    style={{ borderTop: "3px solid oklch(0.85 0.2 127)" }}
                    data-ocid={`jobs.item.${i + 1}`}
                  >
                    {/* Role + match */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-foreground text-base leading-snug flex-1 min-w-0">
                        {job.role}
                      </h3>
                      <div className="shrink-0 text-right">
                        <span
                          className={`text-2xl font-bold ${matchTextColor(job.match)}`}
                        >
                          {job.match}%
                        </span>
                        <p className="text-xs text-muted-foreground">match</p>
                      </div>
                    </div>

                    {/* Match progress bar */}
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${job.match}%`,
                          backgroundColor:
                            job.match >= 70
                              ? "oklch(0.85 0.2 127)"
                              : job.match >= 40
                                ? "oklch(0.82 0.15 80)"
                                : "oklch(0.5 0 0)",
                        }}
                      />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>

                    {/* Salary range */}
                    {job.salaryRange && (
                      <div className="flex items-center gap-1.5 text-sm text-foreground font-medium">
                        <DollarSign className="h-3.5 w-3.5 text-lime-500 shrink-0" />
                        {job.salaryRange}
                      </div>
                    )}

                    {/* Required skills */}
                    {job.requiredSkills && job.requiredSkills.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1.5">
                          Required skills:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {job.requiredSkills.map((skill) => {
                            const matched = skills.some(
                              (s) => s.toLowerCase() === skill.toLowerCase(),
                            );
                            return (
                              <Badge
                                key={skill}
                                className={
                                  matched
                                    ? "text-xs bg-lime-500/10 text-lime-400 border border-lime-700/50"
                                    : "text-xs bg-muted text-muted-foreground border border-border"
                                }
                              >
                                {skill}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Match badge */}
                    <div className="mt-auto">
                      <Badge
                        className={`text-xs border font-semibold ${matchBadgeStyle(job.match)}`}
                      >
                        {job.match >= 70
                          ? "Strong Match"
                          : job.match >= 40
                            ? "Partial Match"
                            : "Weak Match"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
