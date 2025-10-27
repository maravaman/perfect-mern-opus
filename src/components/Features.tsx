import { Shield, Zap, Lock, Eye, AlertTriangle, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Advanced Threat Detection",
    description: "AI-powered algorithms identify and neutralize threats before they impact your systems."
  },
  {
    icon: Zap,
    title: "Real-Time Monitoring",
    description: "24/7 surveillance of your web applications with instant alerts for suspicious activity."
  },
  {
    icon: Lock,
    title: "Vulnerability Scanning",
    description: "Comprehensive security assessments to identify and patch potential weaknesses."
  },
  {
    icon: Eye,
    title: "Intrusion Prevention",
    description: "Proactive defense mechanisms that stop attacks before they penetrate your systems."
  },
  {
    icon: AlertTriangle,
    title: "Security Analytics",
    description: "Detailed reports and insights to understand your security posture and trends."
  },
  {
    icon: Activity,
    title: "DDoS Protection",
    description: "Robust infrastructure to absorb and mitigate distributed denial-of-service attacks."
  }
];

export const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">
            Complete Security{" "}
            <span className="text-primary">Suite</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Enterprise-grade protection with cutting-edge technology to keep your applications safe.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] p-6 space-y-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
