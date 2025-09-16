import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TreePine, Zap, Droplets, Factory, Recycle, Home, Globe, BookOpen } from "lucide-react";

const EnvironmentalImpact = () => {
  const impactData = [
    { metric: 'Trees Saved', value: 0.140, unit: '', icon: TreePine, color: 'text-green-600', bgColor: 'bg-green-100' },
    { metric: 'Energy Saved', value: 1.90, unit: 'kWh', icon: Zap, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { metric: 'CO₂ Reduced', value: 2.80, unit: 'kg', icon: Factory, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { metric: 'Water Saved', value: 15, unit: 'L', icon: Droplets, color: 'text-cyan-600', bgColor: 'bg-cyan-100' }
  ];

  const projectionData = [
    { period: 'Daily', trees: 0.140, energy: 1.90, co2: 2.80, water: 15 },
    { period: 'Weekly', trees: 0.98, energy: 13.3, co2: 19.6, water: 105 },
    { period: 'Monthly', trees: 4.2, energy: 57.0, co2: 84.0, water: 450 },
    { period: 'Yearly', trees: 51.1, energy: 694, co2: 1022, water: 5475 }
  ];

  const impactBreakdown = [
    { category: 'Direct Savings', value: 65, color: '#22c55e' },
    { category: 'Energy Savings', value: 25, color: '#3b82f6' },
    { category: 'Impact Category', value: 8, color: '#f59e0b' },
    { category: 'CO₂ Reduction', value: 2, color: '#ef4444' }
  ];

  const sustainabilityTips = [
    {
      icon: Factory,
      title: 'Reduce at Source',
      description: 'Choose products with minimal packaging and opt for reusable alternatives to reduce waste generation.',
      impact: 'High'
    },
    {
      icon: Recycle,
      title: 'Proper Recycling',
      description: 'Clean containers thoroughly before recycling and separate materials correctly to prevent contamination.',
      impact: 'High'
    },
    {
      icon: Home,
      title: 'Home Composting',
      description: 'Start composting organic waste at home to create nutrient-rich soil and reduce methane emissions from landfills.',
      impact: 'Medium'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Remember: Every recycled aluminum can saves enough energy to run a TV for 3 hours and stays in circulation indefinitely!',
      impact: 'Education'
    },
    {
      icon: BookOpen,
      title: 'Share Knowledge',
      description: 'Educate friends and family about proper waste sorting and the environmental impact of recycling.',
      impact: 'Medium'
    },
    {
      icon: Droplets,
      title: 'Circular Economy',
      description: 'Support businesses that embrace circular economy principles by designing out waste and keeping materials in use.',
      impact: 'High'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Impact Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {impactData.map((item, index) => (
          <Card key={index} className={`${item.bgColor} border-0`}>
            <CardHeader className="pb-2">
              <CardTitle className={`text-2xl font-bold ${item.color} flex items-center justify-between`}>
                {item.value.toFixed(item.value < 1 ? 3 : item.value < 10 ? 1 : 0)}
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className={`text-sm font-medium ${item.color}`}>
                {item.metric.toUpperCase()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {item.unit}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Impact Projections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TreePine className="w-5 h-5 mr-2 text-green-600" />
            Impact Projections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
            <div className="flex items-center text-orange-700 mb-2">
              <Factory className="w-4 h-4 mr-2" />
              <span className="font-medium">If You Process Similar Items Daily:</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-semibold text-green-700">Trees: 51.1</div>
                <div className="text-muted-foreground">trees saved yearly</div>
              </div>
              <div>
                <div className="font-semibold text-yellow-700">Energy: 694 kWh</div>
                <div className="text-muted-foreground">energy saved yearly</div>
              </div>
              <div>
                <div className="font-semibold text-blue-700">CO₂: 1022 kg</div>
                <div className="text-muted-foreground">CO₂ reduced yearly</div>
              </div>
              <div>
                <div className="font-semibold text-cyan-700">Water: 5475 L</div>
                <div className="text-muted-foreground">water saved yearly</div>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="trees" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
              <Area type="monotone" dataKey="energy" stackId="2" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              <Area type="monotone" dataKey="co2" stackId="3" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="water" stackId="4" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Environmental Impact Breakdown Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Environmental Impact Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impactBreakdown} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="category" type="category" stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Bar dataKey="value" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Sustainability Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            Advanced Sustainability Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sustainabilityTips.map((tip, index) => (
              <Card key={index} className="border border-border/50 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    <div className="flex items-center">
                      <tip.icon className="w-5 h-5 mr-2 text-primary" />
                      {tip.title}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      tip.impact === 'High' ? 'bg-green-100 text-green-800' :
                      tip.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {tip.impact}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Global Impact Reminder */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardContent className="text-center py-8">
          <Globe className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h3 className="text-xl font-bold mb-2">Global Impact</h3>
          <p className="opacity-90 max-w-2xl mx-auto">
            Remember: Every recycled aluminum can saves enough energy to run a TV 
            for 3 hours and stays in circulation indefinitely!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnvironmentalImpact;