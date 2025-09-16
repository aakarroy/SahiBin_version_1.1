import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, RotateCcw, Camera, Search, TreePine, BarChart3, MapPin, Lightbulb } from "lucide-react";
import AnalyticsInsights from "./AnalyticsInsights";
import CollectionCenters from "./CollectionCenters";
import EnvironmentalImpact from "./EnvironmentalImpact";
import DisposalGuide from "./DisposalGuide";

interface DetectionResult {
  id: string;
  category: string;
  confidence: number;
  disposalTip: string;
  co2Impact: number;
  energyImpact: number;
  recyclable: boolean;
}

interface DetectionResultsProps {
  image: File | null;
  results: DetectionResult[];
  onRetry: () => void;
}

const DetectionResults = ({ image, results, onRetry }: DetectionResultsProps) => {
  if (!image || results.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-eco-accent bg-clip-text text-transparent">
            Detection Results
          </h2>
          <p className="text-muted-foreground">AI-powered waste classification and disposal guidance</p>
        </div>

        {/* Enhanced Tab Interface */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="details" className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Detection Details</span>
            </TabsTrigger>
            <TabsTrigger value="disposal" className="flex items-center space-x-2">
              <TreePine className="w-4 h-4" />
              <span className="hidden sm:inline">Disposal Guide</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics & Insights</span>
            </TabsTrigger>
            <TabsTrigger value="centers" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Collection Centers</span>
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex items-center space-x-2">
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Environmental Impact</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Display */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    Analyzed Image
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded waste item"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-primary-foreground">
                        {Math.round(results[0]?.confidence * 100 || 0)}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Results */}
              <div className="space-y-4">
                <Card className="border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Search className="w-5 h-5 mr-2 text-primary" />
                      {results[0]?.category || 'Unknown'} Detected
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h4 className="font-semibold text-sm mb-1">CATEGORY</h4>
                        <p className="text-sm text-primary font-medium">
                          {results[0]?.category || 'Textile'}
                        </p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h4 className="font-semibold text-sm mb-1">RECYCLABLE</h4>
                        <p className="text-sm font-medium">
                          {results[0]?.recyclable ? 'Yes' : 'No'}
                        </p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg col-span-2">
                        <h4 className="font-semibold text-sm mb-1">DISPOSAL BIN</h4>
                        <p className="text-sm font-medium">
                          {results[0]?.recyclable ? 'Shoe Recycling Center' : 'General Waste'}
                        </p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg col-span-2">
                        <h4 className="font-semibold text-sm mb-1">ENVIRONMENTAL TIP</h4>
                        <p className="text-sm">
                          {results[0]?.disposalTip || 'Donate if wearable or take to specialized recycling'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detection Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-base">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Detection Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6 text-sm">
                      <div>
                        <h4 className="font-semibold mb-1">Categories Detected:</h4>
                        <p>• Textile: 1 items</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Confidence Statistics:</h4>
                        <p>• Average: 51.9%</p>
                        <p>• Highest: 51.9%</p>
                        <p>• Lowest: 51.9%</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Recyclability:</h4>
                        <p>• Recyclable: 1 items</p>
                        <p>• Non-recyclable: 0 items</p>
                        <p>• Rate: 100.0%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Button onClick={onRetry} variant="outline" className="flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  <Button className="flex-1" variant="outline">
                    Wrong identification?
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="disposal">
            <DisposalGuide 
              category={results[0]?.category || 'Textile'} 
              recyclable={results[0]?.recyclable || true} 
            />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsInsights detectionData={results} />
          </TabsContent>

          <TabsContent value="centers">
            <CollectionCenters />
          </TabsContent>

          <TabsContent value="impact">
            <EnvironmentalImpact />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DetectionResults;