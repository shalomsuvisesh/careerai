/**
 * careerAi.js — Deterministic, keyword-based career AI logic.
 * No external API calls. All logic is local.
 */

// ─── Domain keyword maps ───────────────────────────────────────────────────

const TECH_KEYWORDS = [
  "coding",
  "programming",
  "software",
  "developer",
  "engineer",
  "javascript",
  "python",
  "java",
  "react",
  "node",
  "data",
  "machine learning",
  "ai",
  "artificial intelligence",
  "ml",
  "devops",
  "cloud",
  "aws",
  "docker",
  "kubernetes",
  "database",
  "sql",
  "backend",
  "frontend",
  "fullstack",
  "cybersecurity",
  "security",
  "network",
  "algorithm",
  "tech",
  "computer",
  "web",
  "mobile",
  "app",
  "api",
  "git",
  "agile",
  "scrum",
];

const BUSINESS_KEYWORDS = [
  "business",
  "marketing",
  "sales",
  "finance",
  "accounting",
  "management",
  "leadership",
  "strategy",
  "operations",
  "hr",
  "human resources",
  "consulting",
  "analyst",
  "product",
  "project",
  "entrepreneur",
  "startup",
  "investor",
  "economics",
  "mba",
  "corporate",
  "budget",
  "revenue",
  "profit",
  "customer",
  "client",
  "brand",
  "advertising",
  "seo",
];

const CREATIVE_KEYWORDS = [
  "design",
  "art",
  "creative",
  "graphic",
  "ui",
  "ux",
  "illustration",
  "photography",
  "video",
  "film",
  "media",
  "content",
  "writing",
  "copy",
  "journalism",
  "storytelling",
  "animation",
  "motion",
  "branding",
  "typography",
  "figma",
  "sketch",
  "adobe",
  "photoshop",
];

const HEALTHCARE_KEYWORDS = [
  "healthcare",
  "health",
  "medical",
  "nurse",
  "nursing",
  "doctor",
  "physician",
  "therapy",
  "therapist",
  "psychology",
  "mental health",
  "hospital",
  "clinical",
  "patient",
  "care",
  "pharmacist",
  "biology",
  "research",
  "lab",
  "biotech",
  "medicine",
  "public health",
  "nutrition",
  "fitness",
  "wellness",
];

const EDUCATION_KEYWORDS = [
  "teaching",
  "teacher",
  "education",
  "school",
  "curriculum",
  "training",
  "learning",
  "student",
  "university",
  "professor",
  "instructor",
  "coach",
  "mentor",
  "e-learning",
  "workshop",
  "tutor",
  "academic",
  "classroom",
  "course",
  "certification",
  "pedagogy",
];

// ─── Helpers ───────────────────────────────────────────────────────────────

function scoreText(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.reduce((acc, kw) => acc + (lower.includes(kw) ? 1 : 0), 0);
}

function detectDomain(text) {
  const scores = {
    tech: scoreText(text, TECH_KEYWORDS),
    business: scoreText(text, BUSINESS_KEYWORDS),
    creative: scoreText(text, CREATIVE_KEYWORDS),
    healthcare: scoreText(text, HEALTHCARE_KEYWORDS),
    education: scoreText(text, EDUCATION_KEYWORDS),
  };
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

// ─── Career Quiz Logic ─────────────────────────────────────────────────────

/**
 * careerQuizLogic
 * @param {string[]} answers — array of free-text answers from the quiz
 * @returns {{ path: string, title: string, explanation: string, nextSteps: string[] }}
 */
export function careerQuizLogic(answers) {
  const combined = answers.join(" ");
  const domain = detectDomain(combined);

  const paths = {
    tech: {
      path: "tech",
      title: "Software & Technology",
      explanation:
        "Your answers show a strong alignment with technical problem-solving, logical thinking, and systems design. The tech industry offers high-growth roles in software engineering, data science, AI/ML, and DevOps.",
      nextSteps: [
        "Build a portfolio with 2–3 projects on GitHub",
        "Earn a cloud certification (AWS, GCP, or Azure)",
        "Contribute to open-source to gain visibility",
        "Practice LeetCode for technical interviews",
      ],
    },
    business: {
      path: "business",
      title: "Business & Management",
      explanation:
        "You demonstrate natural aptitude for leadership, strategic thinking, and relationship-building. Business careers in marketing, product management, finance, and consulting reward these strengths.",
      nextSteps: [
        "Develop Excel and data analysis skills",
        "Pursue an MBA or relevant certification",
        "Build a professional network on LinkedIn",
        "Take on cross-functional projects at work",
      ],
    },
    creative: {
      path: "creative",
      title: "Design & Creative Media",
      explanation:
        "Your profile reflects a visual and expressive orientation, ideally suited for UX/UI design, content creation, brand strategy, or creative direction.",
      nextSteps: [
        "Build a portfolio on Behance or Dribbble",
        "Master Figma or Adobe Creative Suite",
        "Study typography and visual hierarchy",
        "Work on real briefs via freelance platforms",
      ],
    },
    healthcare: {
      path: "healthcare",
      title: "Healthcare & Life Sciences",
      explanation:
        "Your empathy, detail-orientation, and interest in well-being align well with healthcare, clinical research, therapy, or public health roles.",
      nextSteps: [
        "Volunteer or shadow in a clinical setting",
        "Research licensure requirements in your region",
        "Pursue relevant healthcare certifications",
        "Explore healthcare technology as a hybrid path",
      ],
    },
    education: {
      path: "education",
      title: "Education & Training",
      explanation:
        "You show strong communication, patience, and a desire to enable others — key traits for teaching, instructional design, corporate training, or e-learning.",
      nextSteps: [
        "Get certified in instructional design (ADDIE, SAM)",
        "Build a teaching portfolio or sample curriculum",
        "Explore edtech platforms for online teaching",
        "Develop facilitation and coaching skills",
      ],
    },
  };

  return paths[domain] || paths.tech;
}

// ─── Resume Analyzer ───────────────────────────────────────────────────────

const SKILL_BANKS = {
  tech: {
    core: [
      "JavaScript",
      "Python",
      "React",
      "Node.js",
      "SQL",
      "Git",
      "REST APIs",
      "TypeScript",
    ],
    advanced: [
      "Docker",
      "Kubernetes",
      "CI/CD",
      "AWS",
      "System Design",
      "Machine Learning",
      "GraphQL",
    ],
  },
  business: {
    core: [
      "Excel",
      "PowerPoint",
      "CRM",
      "Project Management",
      "Data Analysis",
      "Communication",
    ],
    advanced: [
      "Salesforce",
      "Tableau",
      "Financial Modeling",
      "A/B Testing",
      "Agile",
      "OKRs",
    ],
  },
  creative: {
    core: [
      "Figma",
      "Adobe Photoshop",
      "Illustrator",
      "Typography",
      "User Research",
      "Wireframing",
    ],
    advanced: [
      "After Effects",
      "Prototyping",
      "Motion Design",
      "Design Systems",
      "Accessibility",
    ],
  },
  healthcare: {
    core: [
      "Patient Care",
      "EMR Systems",
      "Clinical Documentation",
      "HIPAA Compliance",
      "CPR",
    ],
    advanced: [
      "Evidence-Based Practice",
      "Telehealth",
      "Care Coordination",
      "Quality Improvement",
    ],
  },
  education: {
    core: [
      "Curriculum Design",
      "Lesson Planning",
      "Assessment",
      "Differentiation",
      "Feedback",
    ],
    advanced: [
      "Learning Management Systems",
      "Instructional Design",
      "E-Learning Tools",
      "Coaching",
    ],
  },
};

/**
 * resumeAnalyzer
 * @param {string} resumeText
 * @returns {{ strengths: string[], skillGaps: string[], tips: string[], domain: string }}
 */
export function resumeAnalyzer(resumeText) {
  if (!resumeText || resumeText.trim().length < 50) {
    return {
      domain: "general",
      strengths: [],
      skillGaps: ["Paste a more detailed resume for accurate analysis."],
      tips: ["Include work experience, skills, and education sections."],
    };
  }

  const domain = detectDomain(resumeText);
  const bank = SKILL_BANKS[domain] || SKILL_BANKS.tech;
  const lower = resumeText.toLowerCase();

  const strengths = bank.core.filter((s) => lower.includes(s.toLowerCase()));
  const skillGaps = [...bank.core, ...bank.advanced]
    .filter((s) => !lower.includes(s.toLowerCase()))
    .slice(0, 6);

  const tips = [];

  if (
    !lower.includes("quantif") &&
    !/\d+%/.test(lower) &&
    !/\$\d/.test(lower)
  ) {
    tips.push(
      'Quantify achievements — use numbers, percentages, or dollar values (e.g., "Increased efficiency by 30%").',
    );
  }
  if (lower.split("\n").filter((l) => l.trim().length > 0).length < 8) {
    tips.push(
      "Your resume looks sparse. Add more detail to each role — responsibilities, tools used, and impact.",
    );
  }
  if (
    !lower.includes("led") &&
    !lower.includes("managed") &&
    !lower.includes("owned")
  ) {
    tips.push(
      "Use strong action verbs: Led, Architected, Delivered, Drove, Owned, Scaled.",
    );
  }
  if (
    !lower.includes("summary") &&
    !lower.includes("objective") &&
    !lower.includes("profile")
  ) {
    tips.push(
      "Add a 2–3 sentence professional summary at the top to anchor your story.",
    );
  }
  if (strengths.length < 3) {
    tips.push(
      `Add more relevant ${domain} skills — recruiters scan for these keywords.`,
    );
  }

  return {
    domain,
    strengths:
      strengths.length > 0
        ? strengths
        : ["General communication skills detected"],
    skillGaps,
    tips:
      tips.length > 0
        ? tips
        : [
            "Your resume structure looks solid. Focus on tailoring it per job posting.",
          ],
  };
}

// ─── Job Matcher ───────────────────────────────────────────────────────────

const JOB_CATALOG = [
  // Tech
  {
    role: "Frontend Developer",
    keywords: [
      "javascript",
      "react",
      "css",
      "html",
      "typescript",
      "vue",
      "angular",
    ],
    domain: "tech",
    description:
      "Build user-facing features for web applications. High demand across all industries.",
  },
  {
    role: "Backend Engineer",
    keywords: [
      "python",
      "java",
      "node",
      "sql",
      "api",
      "backend",
      "database",
      "go",
      "rust",
    ],
    domain: "tech",
    description:
      "Design and maintain server-side systems, APIs, and databases.",
  },
  {
    role: "Data Scientist",
    keywords: [
      "python",
      "machine learning",
      "ml",
      "statistics",
      "data",
      "pandas",
      "numpy",
      "r",
    ],
    domain: "tech",
    description:
      "Extract insights from data using statistical modeling and machine learning.",
  },
  {
    role: "DevOps Engineer",
    keywords: [
      "docker",
      "kubernetes",
      "ci/cd",
      "aws",
      "cloud",
      "linux",
      "terraform",
      "devops",
    ],
    domain: "tech",
    description:
      "Automate infrastructure, deployments, and ensure system reliability.",
  },
  {
    role: "AI/ML Engineer",
    keywords: [
      "machine learning",
      "deep learning",
      "tensorflow",
      "pytorch",
      "nlp",
      "ai",
      "neural",
    ],
    domain: "tech",
    description:
      "Build and deploy machine learning models and AI-powered features.",
  },
  {
    role: "Cybersecurity Analyst",
    keywords: [
      "security",
      "cybersecurity",
      "network",
      "firewall",
      "penetration",
      "soc",
      "siem",
    ],
    domain: "tech",
    description: "Protect systems and data from threats and vulnerabilities.",
  },

  // Business
  {
    role: "Product Manager",
    keywords: [
      "product",
      "roadmap",
      "agile",
      "scrum",
      "user stories",
      "stakeholder",
      "sprint",
    ],
    domain: "business",
    description:
      "Define product vision and work cross-functionally to ship impactful features.",
  },
  {
    role: "Marketing Manager",
    keywords: [
      "marketing",
      "seo",
      "content",
      "brand",
      "advertising",
      "campaign",
      "analytics",
    ],
    domain: "business",
    description: "Drive brand growth through strategic campaigns and content.",
  },
  {
    role: "Financial Analyst",
    keywords: [
      "finance",
      "excel",
      "modeling",
      "forecasting",
      "accounting",
      "budget",
      "cfa",
    ],
    domain: "business",
    description:
      "Analyze financial data to guide business and investment decisions.",
  },
  {
    role: "Operations Manager",
    keywords: [
      "operations",
      "process",
      "efficiency",
      "supply chain",
      "logistics",
      "lean",
      "six sigma",
    ],
    domain: "business",
    description:
      "Optimize processes and teams to improve organizational efficiency.",
  },

  // Creative
  {
    role: "UX/UI Designer",
    keywords: [
      "ux",
      "ui",
      "figma",
      "wireframe",
      "prototype",
      "user research",
      "design",
    ],
    domain: "creative",
    description: "Design intuitive, accessible digital experiences for users.",
  },
  {
    role: "Content Strategist",
    keywords: [
      "content",
      "writing",
      "copy",
      "editorial",
      "seo",
      "blog",
      "brand voice",
    ],
    domain: "creative",
    description:
      "Plan and produce content that drives engagement and business goals.",
  },
  {
    role: "Brand Designer",
    keywords: [
      "branding",
      "logo",
      "typography",
      "illustration",
      "adobe",
      "graphic design",
      "identity",
    ],
    domain: "creative",
    description:
      "Create visual identities and brand assets for companies and products.",
  },

  // Healthcare
  {
    role: "Registered Nurse",
    keywords: [
      "nursing",
      "patient care",
      "clinical",
      "hospital",
      "icu",
      "emr",
      "medication",
    ],
    domain: "healthcare",
    description: "Provide direct patient care in clinical settings.",
  },
  {
    role: "Healthcare Data Analyst",
    keywords: [
      "health",
      "data",
      "ehr",
      "sql",
      "hipaa",
      "clinical analytics",
      "healthcare",
    ],
    domain: "healthcare",
    description:
      "Analyze healthcare data to improve patient outcomes and operations.",
  },
  {
    role: "Mental Health Counselor",
    keywords: [
      "counseling",
      "therapy",
      "psychology",
      "mental health",
      "cbt",
      "client",
    ],
    domain: "healthcare",
    description:
      "Support individuals through therapy and mental health guidance.",
  },

  // Education
  {
    role: "Instructional Designer",
    keywords: [
      "instructional design",
      "e-learning",
      "lms",
      "curriculum",
      "training",
      "addie",
      "articulate",
    ],
    domain: "education",
    description:
      "Design effective learning experiences for corporate or academic settings.",
  },
  {
    role: "Corporate Trainer",
    keywords: [
      "training",
      "facilitation",
      "workshop",
      "coaching",
      "onboarding",
      "development",
    ],
    domain: "education",
    description: "Develop and deliver employee training programs.",
  },
  {
    role: "K-12 Teacher",
    keywords: [
      "teaching",
      "classroom",
      "lesson plan",
      "curriculum",
      "students",
      "school",
      "education",
    ],
    domain: "education",
    description: "Educate students in primary or secondary school settings.",
  },
];

/**
 * jobMatcher
 * @param {string[]} skills — array of skill strings
 * @returns {{ role: string, match: number, description: string, domain: string }[]}
 */
export function jobMatcher(skills) {
  if (!skills || skills.length === 0) return [];

  const skillsText = skills.join(" ").toLowerCase();

  const scored = JOB_CATALOG.map((job) => {
    const matched = job.keywords.filter((kw) => skillsText.includes(kw));
    const match = Math.round((matched.length / job.keywords.length) * 100);
    return {
      role: job.role,
      match,
      description: job.description,
      domain: job.domain,
      matched: matched.length,
    };
  });

  return scored
    .filter((j) => j.match > 0)
    .sort((a, b) => b.match - a.match)
    .slice(0, 8)
    .map(({ role, match, description, domain }) => ({
      role,
      match,
      description,
      domain,
    }));
}

// ─── Mentor Chat ───────────────────────────────────────────────────────────

const CHAT_RESPONSES = {
  interview: [
    "Prepare using the STAR method: Situation, Task, Action, Result. Practice 5–7 behavioral stories that cover leadership, conflict, failure, and achievement.",
    "Research the company's products, culture, and recent news. Tailor your answers to their specific challenges.",
    "Always prepare 3–4 thoughtful questions to ask your interviewer — it signals genuine interest.",
    "Practise out loud. Thinking through answers mentally feels different from articulating them clearly under pressure.",
  ],
  resume: [
    "Tailor your resume for each role. Mirror the job description language — many companies use ATS keyword filtering.",
    "Keep it to 1–2 pages. Prioritize recent, relevant experience and quantify every achievement you can.",
    "Use a clean, ATS-friendly format. Avoid tables, graphics, and headers that parsing systems struggle with.",
  ],
  salary: [
    "Research salary ranges on Glassdoor, Levels.fyi, or LinkedIn Salary before negotiating. Know your market value.",
    'Never give the first number. Deflect with "What is the budgeted range for this role?" to anchor the negotiation.',
    "Negotiate the full package: base, equity, bonus, PTO, remote flexibility, and professional development budget.",
    "If they can't move on base, ask for a signing bonus or an early performance review.",
  ],
  networking: [
    "Focus on giving before asking. Comment thoughtfully on posts, share resources, and make introductions.",
    "Informational interviews are underused. Ask for a 20-minute chat — most people are happy to share their experience.",
    "Follow up within 24 hours after meeting someone. A short, personalized message goes a long way.",
  ],
  career_change: [
    "Identify transferable skills first — they're more portable than you think. Map them to your target role.",
    "Consider a bridge role: a position that sits between your current field and your target, reducing the gap.",
    "Build a portfolio or side project to demonstrate capability in the new domain before fully switching.",
    "Be honest about your transition in interviews. Frame it as intentional growth, not escape.",
  ],
  job_search: [
    "Treat your job search like a funnel: apply broadly at the top, but focus your energy on roles where you have warm introductions.",
    "Don't rely solely on job boards. 70–80% of roles are filled through networks before they're even posted.",
    "Set a weekly target: 5–10 applications, 3 networking outreaches, 1 informational interview.",
    "Track every application in a spreadsheet: company, role, date, status, and notes.",
  ],
  skills: [
    "Identify the 3–5 skills most in demand in your target role using job postings as a guide.",
    "Learning > certifications for most tech roles. Build something real and put it on GitHub.",
    "Soft skills differentiate candidates at the final round. Communication, ownership, and coachability matter more than you'd expect.",
  ],
  motivation: [
    "Career pivots are normal. Research shows most professionals change careers 3–5 times. You're not behind.",
    "Feeling stuck is data — it usually means you've outgrown your current environment, not that you're failing.",
    "Progress isn't always linear. Sometimes a lateral move or a step back sets you up for a much bigger leap forward.",
  ],
  default: [
    "That's a great question. To give you the best guidance, could you tell me more about where you are in your career and what outcome you're looking for?",
    "Career growth is highly personal. Share a bit more context — your current role, goals, and biggest challenge — and I can tailor my advice.",
    "I'd love to help with that. What specifically are you trying to figure out — landing a new role, growing in your current one, or making a career change?",
  ],
};

/**
 * mentorChat
 * @param {string} message
 * @param {{ role: string, content: string }[]} history
 * @returns {string}
 */
export function mentorChat(message, history = []) {
  const lower = message.toLowerCase();

  const topicMap = [
    {
      key: "interview",
      triggers: [
        "interview",
        "behavioral",
        "star method",
        "technical interview",
        "whiteboard",
        "take-home",
      ],
    },
    {
      key: "resume",
      triggers: ["resume", "cv", "cover letter", "ats", "application"],
    },
    {
      key: "salary",
      triggers: [
        "salary",
        "compensation",
        "negotiate",
        "offer",
        "pay",
        "raise",
        "equity",
        "stock",
      ],
    },
    {
      key: "networking",
      triggers: [
        "network",
        "linkedin",
        "connections",
        "referral",
        "informational interview",
      ],
    },
    {
      key: "career_change",
      triggers: [
        "career change",
        "switch careers",
        "pivot",
        "new field",
        "different industry",
        "transition",
      ],
    },
    {
      key: "job_search",
      triggers: [
        "job search",
        "find a job",
        "looking for work",
        "job hunting",
        "applications",
        "job board",
      ],
    },
    {
      key: "skills",
      triggers: [
        "skills",
        "learn",
        "certification",
        "course",
        "upskill",
        "training",
        "portfolio",
      ],
    },
    {
      key: "motivation",
      triggers: [
        "stuck",
        "motivated",
        "lost",
        "burnout",
        "purpose",
        "direction",
        "unhappy",
        "overwhelmed",
      ],
    },
  ];

  const matched = topicMap.find(({ triggers }) =>
    triggers.some((t) => lower.includes(t)),
  );
  const bucket = matched ? CHAT_RESPONSES[matched.key] : CHAT_RESPONSES.default;

  // Rotate through responses based on history length to avoid repetition
  const idx = (history.length || 0) % bucket.length;
  return bucket[idx];
}
