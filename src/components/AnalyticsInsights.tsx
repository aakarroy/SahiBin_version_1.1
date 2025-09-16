import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Target, Zap } from "lucide-react";

interface AnalyticsInsightsProps {
  detectionData: any[];
}

const AnalyticsInsights = ({ detectionData }: AnalyticsInsightsProps) => {
  // Sample data for charts
  const categoryData = [
    { name: 'Organic', value: 45, items: 12 },
    { name: 'Plastic', value: 30, items: 8 },
    { name: 'Paper', value: 15, items: 4 },
    { name: 'Metal', value: 10, items: 3 }
  ];

  const confidenceData = [
    { range: '90-100%', count: 15 },
    { range: '80-89%', count: 8 },
    { range: '70-79%', count: 4 },
    { range: '60-69%', count: 2 }
  ];

  const weeklyTrend = [
    { day: 'Mon', items: 12, recyclable: 8 },
    { day: 'Tue', items: 15, recyclable: 11 },
    { day: 'Wed', items: 8, recyclable: 6 },
    { day: 'Thu', items: 20, recyclable: 14 },
    { day: 'Fri', items: 18, recyclable: 13 },
    { day: 'Sat', items: 25, recyclable: 18 },
    { day: 'Sun', items: 22, recyclable: 16 }
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Detection Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">94.2%</div>
            <p className="text-xs text-green-600">+2.1% from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Weekly Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">85%</div>
            <p className="text-xs text-blue-600">120/140 items detected</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Processing Speed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">1.2s</div>
            <p className="text-xs text-yellow-600">Average detection time</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600 flex items-center">
              <TrendingDown className="w-4 h-4 mr-2" />
              False Positives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">5.8%</div>
            <p className="text-xs text-purple-600">-1.2% improvement</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confidence Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={confidenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Detection Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="items" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="recyclable" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">Recyclability Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">100.0%</div>
            <div className="text-sm opacity-90">
              • Recyclable: 1 items<br/>
              • Non-recyclable: 0 items<br/>
              • Rate: 100.0%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">Confidence Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">51.9%</div>
            <div className="text-sm opacity-90">
              • Average: 51.9%<br/>
              • Highest: 51.9%<br/>
              • Lowest: 51.9%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">Categories Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
            <div className="text-sm opacity-90">
              • Textile: 1 items
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsInsights;