/**
 * Local AI Response Generator
 *
 * This module provides a deterministic, rules-based "AI" that runs entirely in the browser.
 * It uses keyword matching and intent detection to provide relevant responses without
 * making any network calls or using external AI services.
 */

const knowledgeBase = {
  ai_general: {
    keywords: ["artificial intelligence", "ai", "what is ai", "define ai"],
    responses: [
      "Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence. This includes learning from experience, understanding natural language, recognizing patterns, solving problems, and making decisions. AI powers everything from virtual assistants to recommendation systems.",
      "AI is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning (acquiring information and rules), reasoning (using rules to reach conclusions), and self-correction. Modern AI applications range from simple automation to complex neural networks.",
    ],
    intent: "General AI Information",
  },
  machine_learning: {
    keywords: [
      "machine learning",
      "ml",
      "learning algorithm",
      "training data",
      "how does ml work",
    ],
    responses: [
      "Machine Learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed. It works by feeding large amounts of data into algorithms that identify patterns and make predictions. The more data the system processes, the better it becomes at its task.",
      "Machine Learning algorithms build mathematical models based on sample data (training data) to make predictions or decisions. There are three main types: supervised learning (learning from labeled data), unsupervised learning (finding patterns in unlabeled data), and reinforcement learning (learning through trial and error).",
    ],
    intent: "Machine Learning",
  },
  neural_networks: {
    keywords: [
      "neural network",
      "deep learning",
      "neurons",
      "layers",
      "neural",
    ],
    responses: [
      "Neural networks are computing systems inspired by biological neural networks in animal brains. They consist of interconnected nodes (neurons) organized in layers. Each connection has a weight that adjusts as learning proceeds, allowing the network to recognize patterns and make decisions based on input data.",
      'Deep learning uses neural networks with multiple layers (hence "deep") to progressively extract higher-level features from raw input. For example, in image recognition, lower layers might identify edges, while deeper layers recognize complex objects. This hierarchical learning makes neural networks powerful for complex tasks.',
    ],
    intent: "Neural Networks",
  },
  benefits: {
    keywords: ["benefit", "advantage", "why use ai", "why ai", "useful"],
    responses: [
      "AI offers numerous benefits: automation of repetitive tasks, processing vast amounts of data quickly, identifying patterns humans might miss, providing 24/7 availability, reducing human error, and enabling personalized experiences. AI helps businesses make data-driven decisions and improves efficiency across industries.",
      "The key advantages of AI include enhanced productivity through automation, improved accuracy in tasks like medical diagnosis, ability to handle big data analysis, cost reduction over time, and enabling new capabilities like natural language processing and computer vision that weren't possible before.",
    ],
    intent: "AI Benefits",
  },
  demo_how: {
    keywords: [
      "how does this work",
      "how this demo",
      "this work",
      "demo work",
      "explain demo",
    ],
    responses: [
      "This demo uses a deterministic, rules-based system running entirely in your browser. When you submit a query, JavaScript code analyzes keywords to detect your intent, then selects an appropriate response from a predefined knowledge base. No external APIs or servers are involved—everything happens locally for instant responses and complete privacy.",
      "The demo works through pattern matching and intent detection. Your input is analyzed for keywords, which are matched against predefined categories. Based on the best match, a relevant response is selected and displayed. This approach simulates AI-like behavior without requiring actual machine learning models or cloud services.",
    ],
    intent: "Demo Explanation",
  },
  privacy: {
    keywords: ["privacy", "private", "secure", "data", "safe", "track"],
    responses: [
      "Your privacy is completely protected! This demo runs entirely in your browser using JavaScript. No data is sent to external servers, no information is stored in databases, and no tracking occurs. You could disconnect from the internet right now and the demo would continue working perfectly.",
      "All processing happens locally on your device. Your inputs never leave your browser, ensuring complete privacy and data security. This local-first approach means you have full control over your data—it never touches our servers or any third-party services.",
    ],
    intent: "Privacy & Security",
  },
  technology: {
    keywords: ["technology", "tech", "built", "made", "create", "develop"],
    responses: [
      "This application is built with React and JavaScript, running on the Internet Computer blockchain platform. The demo uses client-side JavaScript for all AI-like processing, ensuring fast responses and complete privacy. The UI is styled with Tailwind CSS for a modern, responsive design.",
      "The tech stack includes React for the user interface, TanStack Router for navigation, and pure JavaScript for the local AI logic. Everything runs in your browser—no backend processing required for the demo functionality. This architecture prioritizes speed, privacy, and user experience.",
    ],
    intent: "Technology Stack",
  },
  greeting: {
    keywords: [
      "hello",
      "hi",
      "hey",
      "greetings",
      "good morning",
      "good afternoon",
    ],
    responses: [
      "Hello! Welcome to the NeuralFlow AI demo. I'm here to answer your questions about artificial intelligence, machine learning, and how this demo works. Feel free to ask me anything!",
      "Hi there! Thanks for trying out the demo. I can help you learn about AI concepts, explain how machine learning works, or tell you more about this local AI demonstration. What would you like to know?",
    ],
    intent: "Greeting",
  },
  default: {
    keywords: [],
    responses: [
      "That's an interesting question! While I can provide information about AI, machine learning, neural networks, and how this demo works, I might not have a specific answer for that particular query. Try asking about artificial intelligence concepts, the benefits of AI, or how this local demo operates.",
      "I'm designed to answer questions about AI and machine learning concepts, as well as explain how this browser-based demo works. Could you rephrase your question or ask about topics like artificial intelligence, neural networks, machine learning, or the technology behind this demo?",
    ],
    intent: "General Query",
  },
};

/**
 * Detects the intent of the user's input by matching keywords
 * @param {string} input - User's input text
 * @returns {string} - The detected intent category
 */
function detectIntent(input) {
  const normalizedInput = input.toLowerCase().trim();

  let bestMatch = "default";
  let maxMatches = 0;

  for (const [category, data] of Object.entries(knowledgeBase)) {
    if (category === "default") continue;

    let matches = 0;
    for (const keyword of data.keywords) {
      if (normalizedInput.includes(keyword)) {
        matches += keyword.split(" ").length; // Weight multi-word keywords higher
      }
    }

    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = category;
    }
  }

  return bestMatch;
}

/**
 * Generates a response based on the user's input
 * @param {string} input - User's input text
 * @returns {Object} - Response object with text, intent, and confidence
 */
export function generateResponse(input) {
  if (!input || input.trim().length === 0) {
    return {
      text: "Please enter a question or prompt to get started.",
      intent: "Empty Input",
      confidence: "N/A",
    };
  }

  const intent = detectIntent(input);
  const category = knowledgeBase[intent];

  // Select a random response from the category
  const responseText =
    category.responses[Math.floor(Math.random() * category.responses.length)];

  // Calculate a pseudo-confidence score
  const confidence = intent === "default" ? "Low" : "High";

  return {
    text: responseText,
    intent: category.intent,
    confidence: confidence,
  };
}
