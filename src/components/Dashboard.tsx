import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Recycle, TreePine, Zap, BarChart3 } from "lucide-react";

interface DashboardProps {
  stats: {
    itemsDetected: number;
    recyclable: number;
    recyclingRate: number;
    co2Saved: number;
    energySaved: number;
  };
}

const Dashboard = ({ stats }: DashboardProps) => {
  const metrics = [
    {
      title: "Items Detected",
      value: stats.itemsDetected.toString(),
      icon: BarChart3,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Recyclable",
      value: stats.recyclable.toString(),
      icon: Recycle,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Recycling Rate",
      value: `${stats.recyclingRate}%`,
      icon: TreePine,
      color: "text-eco-accent",
      bgColor: "bg-eco-accent/10",
    },
    {
      title: "CO₂ Saved",
      value: `${stats.co2Saved} kg`,
      icon: TreePine,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Energy Saved",
      value: `${stats.energySaved} kWh`,
      icon: Zap,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  return (
    <section id="dashboard" className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-eco-accent bg-clip-text text-transparent">
            Live Detection Dashboard
          </h2>
          <p className="text-muted-foreground">Track your environmental impact in real-time</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                  {metric.title}
                  <div className={`w-8 h-8 rounded-full ${metric.bgColor} flex items-center justify-center`}>
                    <metric.icon className={`w-4 h-4 ${metric.color}`} />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-6 bg-gradient-to-r from-eco-light to-card rounded-lg border border-border/50">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              SahiBin - Revolutionizing Waste Management
            </h3>
            <p className="text-muted-foreground text-sm">
              Empowering individuals and communities worldwide to make informed decisions about waste disposal, 
              promoting sustainability, and creating a cleaner future through the power of artificial intelligence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;