import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

const recentThreats = [
  { id: 1, type: "SQL Injection", severity: "high", status: "blocked", time: "2 min ago" },
  { id: 2, type: "XSS Attack", severity: "medium", status: "blocked", time: "15 min ago" },
  { id: 3, type: "DDoS Attempt", severity: "critical", status: "mitigated", time: "1 hour ago" },
  { id: 4, type: "Malware Scan", severity: "low", status: "clean", time: "2 hours ago" },
];

const stats = [
  { label: "Active Protection", value: "99.9%", trend: "+2.5%", icon: Shield, color: "text-primary" },
  { label: "Threats Blocked", value: "1,234", trend: "+18%", icon: CheckCircle2, color: "text-accent" },
  { label: "Security Score", value: "A+", trend: "Excellent", icon: TrendingUp, color: "text-primary" },
  { label: "Active Monitors", value: "24", trend: "All Systems", icon: AlertCircle, color: "text-accent" },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical": return "bg-destructive/20 text-destructive border-destructive/50";
    case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/50";
    case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
    case "low": return "bg-accent/20 text-accent border-accent/50";
    default: return "bg-muted/20 text-muted-foreground border-muted/50";
  }
};

export const Dashboard = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Live Security{" "}
            <span className="text-primary">Dashboard</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real-time monitoring and threat intelligence at your fingertips.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-xs text-accent font-medium">{stat.trend}</span>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Threats Table */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Recent Security Events</h3>
            <Badge variant="outline" className="border-primary/50">Live</Badge>
          </div>

          <div className="space-y-4">
            {recentThreats.map((threat) => (
              <div 
                key={threat.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/30 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <div className="space-y-1">
                    <div className="font-medium">{threat.type}</div>
                    <div className="text-sm text-muted-foreground">{threat.time}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge className={getSeverityColor(threat.severity)}>
                    {threat.severity}
                  </Badge>
                  <Badge variant="outline" className="border-accent/50 text-accent">
                    {threat.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};
