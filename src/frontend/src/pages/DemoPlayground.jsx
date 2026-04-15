import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { generateResponse } from "../lib/localAi";

export default function DemoPlayground() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsProcessing(true);

    // Simulate processing time for better UX
    setTimeout(() => {
      const result = generateResponse(input);
      setResponse(result);
      setIsProcessing(false);
    }, 300);
  };

  const handleReset = () => {
    setInput("");
    setResponse(null);
  };

  const examplePrompts = [
    "What is artificial intelligence?",
    "How does machine learning work?",
    "Tell me about neural networks",
    "What are the benefits of AI?",
  ];

  const handleExampleClick = (prompt) => {
    setInput(prompt);
  };

  return (
    <div className="w-full py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-500 text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Interactive Demo
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            AI Demo Playground
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ask anything and get instant, intelligent responses. All processing
            happens locally in your browser.
          </p>
        </div>

        {/* Main Demo Card */}
        <Card className="border-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Try It Yourself</CardTitle>
            <CardDescription>
              Type your question below or click on an example to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Example Prompts */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">
                Example prompts:
              </p>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((prompt) => (
                  <Badge
                    key={prompt}
                    variant="outline"
                    className="cursor-pointer hover:bg-lime-500/10 hover:border-lime-500/50 hover:text-lime-500 transition-colors px-3 py-1.5"
                    onClick={() => handleExampleClick(prompt)}
                  >
                    {prompt}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Textarea
                  placeholder="Ask me anything about AI, technology, or how this demo works..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[120px] resize-none text-base"
                  disabled={isProcessing}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={!input.trim() || isProcessing}
                  className="bg-lime-500 text-charcoal-950 hover:bg-lime-400 font-semibold flex-1 sm:flex-none"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-charcoal-950 border-t-transparent mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Generate Response
                    </>
                  )}
                </Button>
                {response && (
                  <Button type="button" variant="outline" onClick={handleReset}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                )}
              </div>
            </form>

            {/* Response Display */}
            {response && (
              <div className="mt-6 p-6 rounded-lg bg-accent border border-lime-500/20 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 text-lime-500 font-semibold">
                  <Sparkles className="h-5 w-5" />
                  <span>AI Response</span>
                </div>
                <p className="text-foreground leading-relaxed text-base">
                  {response.text}
                </p>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Intent detected:</span>{" "}
                    {response.intent} •
                    <span className="font-medium"> Confidence:</span>{" "}
                    {response.confidence}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-8 border-lime-500/20 bg-lime-500/5">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              <span className="font-semibold text-lime-500">Privacy Note:</span>{" "}
              All responses are generated locally in your browser using
              deterministic rules. No data is sent to external servers.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
