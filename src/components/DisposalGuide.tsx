import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, AlertTriangle, CheckCircle, Info, ExternalLink, Calendar } from "lucide-react";

interface DisposalGuideProps {
  category: string;
  recyclable: boolean;
}

const DisposalGuide = ({ category, recyclable }: DisposalGuideProps) => {
  const getDisposalInfo = (category: string, recyclable: boolean) => {
    const guides = {
      'Textile': {
        recyclable: true,
        bin: 'Textile Recycling Center',
        steps: [
          'Clean the textile item if needed',
          'Check for any damages that might affect recycling',
          'Place in designated textile recycling bin',
          'Alternatively, donate if item is in good condition'
        ],
        tips: 'Donate if wearable or take to specialized recycling',
        dangers: ['Avoid putting dirty or heavily damaged textiles in regular recycling'],
        schedule: 'Textile collection: Wednesdays and Saturdays',
        preparation: '24-48 hours for cleaning if needed'
      },
      'Plastic': {
        recyclable: true,
        bin: 'Recycling Bin (Blue)',
        steps: [
          'Remove all labels and stickers',
          'Rinse thoroughly with water',
          'Let dry completely',
          'Place in blue recycling bin'
        ],
        tips: 'Check recycling codes - numbers 1-7 indicate different plastic types',
        dangers: ['Never mix different plastic types', 'Avoid contaminated plastics'],
        schedule: 'Plastic collection: Tuesdays and Fridays',
        preparation: '5-10 minutes for cleaning'
      },
      'Organic': {
        recyclable: false,
        bin: 'Compost Bin (Green)',
        steps: [
          'Separate from any packaging',
          'Chop large pieces into smaller chunks',
          'Place in green compost bin',
          'Cover with brown materials if home composting'
        ],
        tips: 'Perfect for home composting - creates nutrient-rich soil',
        dangers: ['Avoid meat, dairy, and oily foods in home compost'],
        schedule: 'Organic waste collection: Daily pickup available',
        preparation: 'Immediate disposal recommended'
      }
    };

    return guides[category as keyof typeof guides] || {
      recyclable: false,
      bin: 'General Waste Bin',
      steps: ['Place item in general waste bin'],
      tips: 'Check with local waste management for specific guidelines',
      dangers: ['Follow local disposal regulations'],
      schedule: 'General waste collection: Daily',
      preparation: 'None required'
    };
  };

  const info = getDisposalInfo(category, recyclable);

  return (
    <div className="space-y-6">
      {/* Disposal Summary */}
      <Card className={`border-2 ${recyclable ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
        <CardHeader>
          <CardTitle className={`flex items-center ${recyclable ? 'text-green-700' : 'text-orange-700'}`}>
            {recyclable ? (
              <CheckCircle className="w-6 h-6 mr-2" />
            ) : (
              <AlertTriangle className="w-6 h-6 mr-2" />
            )}
            {category} - {recyclable ? 'Recyclable' : 'Non-Recyclable'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">DISPOSAL BIN</h4>
              <p className={`text-sm ${recyclable ? 'text-green-600' : 'text-orange-600'}`}>
                {info.bin}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">PREPARATION TIME</h4>
              <p className="text-sm text-muted-foreground">{info.preparation}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">COLLECTION SCHEDULE</h4>
              <p className="text-sm text-muted-foreground">{info.schedule}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
            Step-by-Step Disposal Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {info.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm text-muted-foreground pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Tip */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700">
            <Info className="w-5 h-5 mr-2" />
            Environmental Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-600 text-sm">{info.tips}</p>
        </CardContent>
      </Card>

      {/* Safety & Warnings */}
      {info.dangers.length > 0 && (
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Important Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {info.dangers.map((danger, index) => (
                <li key={index} className="flex items-start space-x-2 text-red-600 text-sm">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{danger}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="w-8 h-8 text-blue-600 bg-blue-100 rounded-full p-2" />
                <div>
                  <h4 className="font-semibold text-sm">Find Collection Centers</h4>
                  <p className="text-xs text-muted-foreground">Locate nearby disposal facilities</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-8 h-8 text-green-600 bg-green-100 rounded-full p-2" />
                <div>
                  <h4 className="font-semibold text-sm">Set Reminder</h4>
                  <p className="text-xs text-muted-foreground">Get notified on collection days</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Additional Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <ExternalLink className="w-4 h-4 mr-2" />
            Local Waste Management Guidelines
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <ExternalLink className="w-4 h-4 mr-2" />
            Recycling Centers Near You
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <ExternalLink className="w-4 h-4 mr-2" />
            Environmental Impact Calculator
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DisposalGuide;