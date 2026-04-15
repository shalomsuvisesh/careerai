import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, Code, Lock, Zap } from "lucide-react";

export default function AboutHowItWorks() {
  const principles = [
    {
      icon: Brain,
      title: "Local Processing",
      description:
        "All AI responses are generated directly in your browser using JavaScript. No external API calls or server-side processing.",
    },
    {
      icon: Lock,
      title: "Complete Privacy",
      description:
        "Your inputs never leave your device. Everything stays local, ensuring maximum privacy and data security.",
    },
    {
      icon: Zap,
      title: "Instant Responses",
      description:
        "No network latency means lightning-fast responses. The AI processes your queries in milliseconds.",
    },
    {
      icon: Code,
      title: "Deterministic Logic",
      description:
        "Uses pattern matching and intent detection to provide relevant, context-aware responses based on predefined rules.",
    },
  ];

  return (
    <div className="w-full py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It <span className="text-lime-500">Works</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understanding the technology behind our local AI demo and what makes
            it unique.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <Card
                key={principle.title}
                className="border-border hover:border-lime-500/50 transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-lime-500/10 flex items-center justify-center mb-3">
                    <Icon className="h-6 w-6 text-lime-500" />
                  </div>
                  <CardTitle className="text-xl">{principle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {principle.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Technical Details */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Technical Overview</CardTitle>
            <CardDescription>
              A deeper look at how our local AI demo generates intelligent
              responses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p className="text-foreground">
                Our demo uses a{" "}
                <strong className="text-lime-500">
                  deterministic, rules-based approach
                </strong>{" "}
                to simulate AI-like behavior entirely within your browser.
                Here's how it works:
              </p>
              <ol className="text-foreground space-y-2">
                <li>
                  <strong>Intent Detection:</strong> When you submit a query,
                  the system analyzes keywords and patterns to determine your
                  intent (e.g., asking about AI, machine learning, or how the
                  demo works).
                </li>
                <li>
                  <strong>Context Matching:</strong> Based on the detected
                  intent, the system selects the most appropriate response
                  template from a predefined knowledge base.
                </li>
                <li>
                  <strong>Response Generation:</strong> The selected template is
                  populated with relevant information and returned instantly to
                  you.
                </li>
                <li>
                  <strong>Zero Network Calls:</strong> Everything happens in
                  JavaScript running in your browser. No data is transmitted
                  over the network.
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Is this a real AI model like ChatGPT?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No, this is a demonstration of local, deterministic AI-like
                  behavior. Unlike large language models (LLMs) such as ChatGPT
                  that require massive computational resources and cloud
                  infrastructure, our demo uses simple pattern matching and
                  predefined responses. It's designed to showcase how
                  intelligent-seeming interactions can happen entirely in your
                  browser without external services.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Why doesn't it use a real AI model?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Real AI models require significant computational power and are
                  typically run on powerful servers. This demo prioritizes
                  privacy, speed, and accessibility by running entirely in your
                  browser. It demonstrates the concept of local processing
                  without requiring external API keys, subscriptions, or sending
                  your data to third-party services.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Is my data really private?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely! Everything you type stays in your browser. The
                  demo doesn't make any network requests to external servers,
                  doesn't store your inputs in any database, and doesn't track
                  your usage. You can even disconnect from the internet and the
                  demo will continue to work perfectly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Can I use this for production applications?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  This demo is designed for educational and demonstration
                  purposes. For production applications requiring true AI
                  capabilities, you would typically integrate with services like
                  OpenAI, Anthropic, or deploy your own models. However, the
                  privacy-first, local-processing approach demonstrated here can
                  be valuable for certain use cases where data privacy is
                  paramount.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  How can I learn more about real AI?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  To learn about real AI and machine learning, explore resources
                  like fast.ai, Coursera's Machine Learning courses, or the
                  official documentation for frameworks like TensorFlow and
                  PyTorch. Understanding the fundamentals of neural networks,
                  training data, and model architectures will give you a solid
                  foundation in modern AI technology.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
