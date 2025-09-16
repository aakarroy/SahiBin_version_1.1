import { Card } from "@/components/ui/card";
import { Leaf, Zap, Eye, Users } from "lucide-react";

const Footer = () => {
  const features = [
    {
      icon: Eye,
      text: "Real-time Detection",
    },
    {
      icon: Leaf,
      text: "Smart Disposal",
    },
    {
      icon: Zap,
      text: "Impact Tracking",
    },
    {
      icon: Users,
      text: "Community Connection",
    },
  ];

  return (
    <footer className="py-12 bg-gradient-to-t from-primary/5 to-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tech Stack */}
        <Card className="mb-8 p-6 bg-card/50 backdrop-blur-sm border-0 shadow-lg">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Powered by:</p>
            <div className="flex flex-wrap justify-center items-center gap-2 text-sm font-medium">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                YOLO Object Detection
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="px-3 py-1 bg-eco-accent/10 text-eco-accent rounded-full">
                Enhanced with Gemini AI
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full">
                Built with React
              </span>
            </div>
          </div>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="text-center space-y-2">
          <p className="font-semibold text-foreground">
            Mission: Making Sustainability Accessible • One Detection at a Time
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 SahiBin - Revolutionizing Waste Management through AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;