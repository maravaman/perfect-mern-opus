import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, Zap, MessageSquare, Image, Code } from "lucide-react";

const Tools = () => {
  const tools = [
    {
      id: "openai",
      name: "OpenAI",
      description: "Harness the power of GPT models for advanced AI solutions",
      icon: Bot,
      color: "from-green-500 to-emerald-600",
      features: [
        "Natural language processing",
        "Content generation and copywriting",
        "Code generation and debugging",
        "Conversation AI and chatbots",
        "Language translation",
        "Text summarization and analysis"
      ],
      capabilities: [
        { icon: MessageSquare, text: "Chat & Conversational AI" },
        { icon: Code, text: "Code Generation" },
        { icon: Sparkles, text: "Creative Writing" },
        { icon: Image, text: "DALL-E Image Generation" }
      ],
      useCases: [
        "Customer support automation",
        "Content creation at scale",
        "Software development assistance",
        "Educational tutoring systems"
      ]
    },
    {
      id: "gemini",
      name: "Gemini AI",
      description: "Google's most capable AI model for multimodal understanding",
      icon: Sparkles,
      color: "from-blue-500 to-cyan-600",
      features: [
        "Multimodal processing (text, images, video)",
        "Advanced reasoning and problem-solving",
        "Long-context understanding",
        "Real-time information processing",
        "Code understanding and generation",
        "Document analysis and extraction"
      ],
      capabilities: [
        { icon: Zap, text: "Lightning Fast Processing" },
        { icon: Image, text: "Image & Video Analysis" },
        { icon: Code, text: "Advanced Code Understanding" },
        { icon: MessageSquare, text: "Contextual Conversations" }
      ],
      useCases: [
        "Complex data analysis",
        "Multimodal content creation",
        "Research and document processing",
        "Advanced automation workflows"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI <span className="text-primary">Tools</span> & Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leverage cutting-edge AI technology to transform your business with intelligent automation
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {tools.map((tool, index) => (
              <div key={tool.id} className="relative">
                <Card className="overflow-hidden">
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
                  
                  <div className="grid md:grid-cols-5 gap-8 p-8">
                    {/* Left - Tool Info */}
                    <div className="md:col-span-2 space-y-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-4 rounded-lg bg-gradient-to-br ${tool.color} text-white`}>
                          <tool.icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold mb-2">{tool.name}</h2>
                          <p className="text-muted-foreground">{tool.description}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Key Capabilities</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {tool.capabilities.map((cap, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2 p-4 bg-secondary/50 rounded-lg text-center">
                              <cap.icon className="w-6 h-6 text-primary" />
                              <span className="text-sm font-semibold text-foreground leading-tight">{cap.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full" size="lg">
                        Get Started with {tool.name}
                      </Button>
                    </div>

                    {/* Right - Features & Use Cases */}
                    <div className="md:col-span-3 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Features</h3>
                        <ul className="space-y-2">
                          {tool.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-primary mt-1">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4">Use Cases</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {tool.useCases.map((useCase, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                              <span className="text-primary">→</span>
                              <span className="text-sm">{useCase}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Integrate AI into Your Business?</h2>
            <p className="text-lg mb-6 opacity-90">
              Let us help you implement these powerful AI tools to automate and enhance your operations
            </p>
            <Button variant="secondary" size="lg">
              Schedule a Consultation
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Tools;
