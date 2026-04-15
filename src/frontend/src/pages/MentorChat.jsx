import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Send,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { mentorChat } from "../lib/careerAi";

// ─── Topic categories with starter prompts ───────────────────────────────────

const CATEGORIES = [
  {
    id: "job-search",
    label: "Job Search Tips",
    icon: "🔍",
    prompts: [
      "How do I find hidden job opportunities?",
      "How many jobs should I apply to weekly?",
      "Which job boards are most effective?",
    ],
  },
  {
    id: "interview-prep",
    label: "Interview Prep",
    icon: "🎯",
    prompts: [
      "How do I prepare for behavioral interviews?",
      "What is the STAR method?",
      "How do I handle tricky interview questions?",
    ],
  },
  {
    id: "resume-help",
    label: "Resume Help",
    icon: "📄",
    prompts: [
      "How do I tailor my resume for each job?",
      "What makes an ATS-friendly resume?",
      "How long should my resume be?",
    ],
  },
  {
    id: "career-change",
    label: "Career Change",
    icon: "🔄",
    prompts: [
      "How do I switch careers with no experience?",
      "What are good bridge roles for transitioning?",
      "How do I explain a career pivot in interviews?",
    ],
  },
  {
    id: "salary",
    label: "Salary Negotiation",
    icon: "💰",
    prompts: [
      "How do I negotiate a job offer?",
      "Should I give the first number in salary talks?",
      "How do I negotiate beyond base salary?",
    ],
  },
  {
    id: "networking",
    label: "Networking",
    icon: "🤝",
    prompts: [
      "How do I grow my professional network?",
      "What is an informational interview?",
      "How do I reach out to people on LinkedIn?",
    ],
  },
];

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I'm your AI Career Mentor. I can help with interview prep, salary negotiation, career changes, job searching, skill building, and more. What's on your mind?",
  time: new Date(),
};

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─── TypingIndicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3" data-ocid="chat.loading_state">
      <div
        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
        style={{
          background: "oklch(0.85 0.2 127 / 0.12)",
          border: "1px solid oklch(0.85 0.2 127 / 0.3)",
        }}
      >
        <Sparkles className="h-3.5 w-3.5 text-lime-500" />
      </div>
      <div
        className="rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5"
        style={{
          background: "oklch(0.22 0 0)",
          border: "1px solid oklch(1 0 0 / 10%)",
        }}
      >
        <span className="w-2 h-2 rounded-full bg-lime-500 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-lime-500 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-lime-500 animate-bounce" />
      </div>
    </div>
  );
}

// ─── MessageBubble ────────────────────────────────────────────────────────────

function MessageBubble({ msg, index }) {
  const isUser = msg.role === "user";
  return (
    <div
      className={`flex items-end gap-3 message-enter ${isUser ? "flex-row-reverse" : ""}`}
      data-ocid={`chat.message.${index + 1}`}
    >
      {/* Icon badge — no avatar image */}
      {!isUser && (
        <div
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center mb-1"
          style={{
            background: "oklch(0.85 0.2 127 / 0.12)",
            border: "1px solid oklch(0.85 0.2 127 / 0.3)",
          }}
        >
          <Sparkles className="h-3.5 w-3.5 text-lime-500" />
        </div>
      )}

      <div
        className={`flex flex-col max-w-[75%] ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser ? "rounded-br-none" : "rounded-bl-none"
          }`}
          style={
            isUser
              ? {
                  background: "oklch(0.36 0.08 127)",
                  color: "oklch(0.92 0.06 127)",
                }
              : {
                  background:
                    "linear-gradient(135deg, oklch(0.22 0 0) 0%, oklch(0.22 0 0) 100%)",
                  backgroundBlendMode: "overlay",
                  boxShadow: "inset 0 0 0 1px oklch(0.85 0.2 127 / 0.08)",
                  border: "1px solid oklch(1 0 0 / 10%)",
                  color: "oklch(0.92 0 0)",
                }
          }
        >
          {msg.content}
        </div>
        <span
          className="text-xs mt-1 px-1"
          style={{ color: "oklch(0.55 0 0)" }}
        >
          {formatTime(msg.time)}
        </span>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ onPromptClick }) {
  const [expanded, setExpanded] = useState("interview-prep");

  return (
    <aside
      className="hidden lg:flex flex-col w-64 shrink-0 border-r overflow-hidden"
      style={{
        background: "oklch(0.18 0 0)",
        borderColor: "oklch(1 0 0 / 10%)",
      }}
      data-ocid="chat.sidebar"
    >
      <div
        className="px-4 py-4 border-b"
        style={{ borderColor: "oklch(1 0 0 / 10%)" }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "oklch(0.88 0.18 127)" }}
        >
          Quick Start
        </p>
        <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0 0)" }}>
          Click a question to get started
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="py-2">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} data-ocid={`chat.category.${cat.id}`}>
              <button
                type="button"
                onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-white/5 group"
                data-ocid={`chat.category_toggle.${cat.id}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base shrink-0">{cat.icon}</span>
                  <span
                    className="text-sm font-medium truncate"
                    style={{ color: "oklch(0.88 0.18 127)" }}
                  >
                    {cat.label}
                  </span>
                </div>
                {expanded === cat.id ? (
                  <ChevronUp
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: "oklch(0.55 0 0)" }}
                  />
                ) : (
                  <ChevronDown
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: "oklch(0.55 0 0)" }}
                  />
                )}
              </button>

              {expanded === cat.id && (
                <div className="pb-1 px-2">
                  {cat.prompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => onPromptClick(prompt)}
                      className="w-full text-left text-xs px-3 py-2 rounded-lg mb-1 transition-colors"
                      style={{ color: "oklch(0.7 0 0)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "oklch(0.36 0.08 127 / 0.15)";
                        e.currentTarget.style.color = "oklch(0.88 0.18 127)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "oklch(0.7 0 0)";
                      }}
                      data-ocid="chat.prompt_chip"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}

// ─── MobileCategoryBar ────────────────────────────────────────────────────────

function MobileCategoryBar({ onPromptClick }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (cat) => {
    setSelected(cat.id === selected ? null : cat.id);
  };

  const cat = CATEGORIES.find((c) => c.id === selected);

  return (
    <div
      className="lg:hidden border-b"
      style={{
        background: "oklch(0.18 0 0)",
        borderColor: "oklch(1 0 0 / 10%)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-sm"
        style={{ color: "oklch(0.88 0.18 127)" }}
        data-ocid="chat.mobile_topics_toggle"
      >
        <span className="font-medium">Quick-start topics</span>
        {open ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {open && (
        <div className="px-3 pb-3">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelect(c)}
                className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                style={
                  selected === c.id
                    ? {
                        background: "oklch(0.36 0.08 127 / 0.25)",
                        borderColor: "oklch(0.85 0.2 127 / 0.5)",
                        color: "oklch(0.88 0.18 127)",
                      }
                    : {
                        background: "transparent",
                        borderColor: "oklch(1 0 0 / 15%)",
                        color: "oklch(0.65 0 0)",
                      }
                }
                data-ocid={`chat.mobile_category.${c.id}`}
              >
                {c.icon} {c.label}
              </button>
            ))}
          </div>
          {cat && (
            <div className="flex flex-col gap-1">
              {cat.prompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    onPromptClick(p);
                    setOpen(false);
                    setSelected(null);
                  }}
                  className="text-left text-xs px-3 py-2 rounded-lg transition-colors"
                  style={{
                    background: "oklch(0.22 0 0)",
                    color: "oklch(0.75 0 0)",
                    border: "1px solid oklch(1 0 0 / 8%)",
                  }}
                  data-ocid="chat.mobile_prompt_chip"
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

function EmptyState({ onPromptClick }) {
  const featured = [
    "How do I prepare for interviews?",
    "Help me negotiate my salary",
    "How do I build my network?",
    "I feel stuck in my career",
  ];
  return (
    <div
      className="flex flex-col items-center justify-center h-full px-6 py-10 text-center"
      data-ocid="chat.empty_state"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: "oklch(0.85 0.2 127 / 0.1)",
          border: "1px solid oklch(0.85 0.2 127 / 0.25)",
        }}
      >
        <Sparkles className="h-7 w-7 text-lime-500" />
      </div>
      <h2
        className="text-lg font-semibold mb-1"
        style={{ color: "oklch(0.92 0 0)" }}
      >
        How can I help with your career today?
      </h2>
      <p className="text-sm mb-6" style={{ color: "oklch(0.55 0 0)" }}>
        Ask me anything about job search, interviews, or career growth.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
        {featured.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPromptClick(prompt)}
            className="text-left text-xs px-4 py-3 rounded-xl transition-colors"
            style={{
              background: "oklch(0.22 0 0)",
              border: "1px solid oklch(1 0 0 / 12%)",
              color: "oklch(0.75 0 0)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.85 0.2 127 / 0.35)";
              e.currentTarget.style.color = "oklch(0.88 0.18 127)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "oklch(1 0 0 / 12%)";
              e.currentTarget.style.color = "oklch(0.75 0 0)";
            }}
            data-ocid="chat.empty_prompt_button"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MentorChat (main) ────────────────────────────────────────────────────────

export default function MentorChat() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll imperatively whenever content changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional imperative scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isTyping]);

  const sendMessage = (text) => {
    const userText = (text ?? input).trim();
    if (!userText || isTyping) return;

    const now = new Date();
    const userMsg = { role: "user", content: userText, time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = mentorChat(userText, messages);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, time: new Date() },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleReset = () => {
    setMessages([{ ...INITIAL_MESSAGE, time: new Date() }]);
    setInput("");
  };

  const handlePromptClick = (prompt) => {
    sendMessage(prompt);
    textareaRef.current?.focus();
  };

  const isEmpty = messages.length <= 1;

  return (
    <div
      className="flex flex-col"
      style={{ height: "calc(100vh - 64px)", background: "oklch(0.12 0 0)" }}
      data-ocid="chat.page"
    >
      {/* Chat header */}
      <header
        className="shrink-0 flex items-center justify-between px-4 md:px-6 py-3 border-b"
        style={{
          background: "oklch(0.15 0 0)",
          borderColor: "oklch(1 0 0 / 10%)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "oklch(0.85 0.2 127 / 0.12)",
              border: "1px solid oklch(0.85 0.2 127 / 0.3)",
            }}
          >
            <Sparkles className="h-4 w-4 text-lime-500" />
          </div>
          <div>
            <h1
              className="font-semibold text-sm leading-none"
              style={{ color: "oklch(0.92 0 0)" }}
            >
              Career Mentor
            </h1>
            <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0 0)" }}>
              Local AI · Session only · No data leaves your browser
            </p>
          </div>
          <Badge
            variant="outline"
            className="hidden sm:flex border-lime-500/30 text-lime-500 text-xs ml-1"
          >
            Private
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-xs h-8 gap-1.5"
          style={{ color: "oklch(0.6 0 0)" }}
          data-ocid="chat.clear_button"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Clear chat</span>
        </Button>
      </header>

      {/* Body: sidebar + main */}
      <div className="flex flex-1 min-h-0">
        <Sidebar onPromptClick={handlePromptClick} />

        {/* Main chat column */}
        <div
          className="flex flex-col flex-1 min-w-0"
          data-ocid="chat.main_panel"
        >
          <MobileCategoryBar onPromptClick={handlePromptClick} />

          {/* Message list */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-5">
            {isEmpty ? (
              <EmptyState onPromptClick={handlePromptClick} />
            ) : (
              messages.map((msg, i) => (
                <MessageBubble key={`${msg.role}-${i}`} msg={msg} index={i} />
              ))
            )}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div
            className="shrink-0 px-4 md:px-6 py-4 border-t"
            style={{
              background: "oklch(0.18 0 0)",
              borderColor: "oklch(1 0 0 / 10%)",
            }}
            data-ocid="chat.input_area"
          >
            <div className="flex gap-2 items-end max-w-3xl mx-auto">
              <Textarea
                ref={textareaRef}
                data-ocid="chat.input"
                placeholder="Ask about interviews, salary, career changes… (Enter to send)"
                className="min-h-[44px] max-h-[140px] resize-none text-sm border"
                style={{
                  background: "oklch(0.22 0 0)",
                  borderColor: "oklch(1 0 0 / 15%)",
                  color: "oklch(0.92 0 0)",
                }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={isTyping}
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                className="shrink-0 h-[44px] px-4"
                style={
                  !input.trim() || isTyping
                    ? {
                        background: "oklch(0.28 0 0)",
                        color: "oklch(0.45 0 0)",
                      }
                    : {
                        background: "oklch(0.85 0.2 127)",
                        color: "oklch(0.12 0 0)",
                      }
                }
                data-ocid="chat.send_button"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
            <p
              className="text-xs mt-2 text-center max-w-3xl mx-auto"
              style={{ color: "oklch(0.45 0 0)" }}
            >
              Shift+Enter for new line · Enter to send
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
