import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Dashboard from "@/components/Dashboard";
import DetectionResults from "@/components/DetectionResults";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Zap, X } from "lucide-react";

interface DetectionResult {
  id: string;
  category: string;
  confidence: number;
  disposalTip: string;
  co2Impact: number;
  energyImpact: number;
  recyclable: boolean;
}

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([]);
  const [showGettingStarted, setShowGettingStarted] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    itemsDetected: 0,
    recyclable: 0,
    recyclingRate: 0,
    co2Saved: 0,
    energySaved: 0,
  });

  // Mock detection function (replace with actual AI detection)
  const mockDetection = (file: File): DetectionResult[] => {
    // Simulate AI detection results
    const mockResults: DetectionResult[] = [
      {
        id: "1",
        category: "Organic",
        confidence: 0.95,
        disposalTip: "Compost at home or use organic waste bin",
        co2Impact: 0.3,
        energyImpact: 0.1,
        recyclable: false,
      },
      {
        id: "2", 
        category: "Organic",
        confidence: 0.89,
        disposalTip: "Compost at home or use organic waste bin",
        co2Impact: 0.3,
        energyImpact: 0.1,
        recyclable: false,
      }
    ];
    return mockResults;
  };

  const handleImageCapture = (file: File) => {
    setUploadedImage(file);
    const results = mockDetection(file);
    setDetectionResults(results);
    
    // Update dashboard stats
    const recyclable = results.filter(r => r.recyclable).length;
    const totalCO2 = results.reduce((sum, r) => sum + r.co2Impact, 0);
    const totalEnergy = results.reduce((sum, r) => sum + r.energyImpact, 0);
    
    setDashboardStats(prev => ({
      itemsDetected: prev.itemsDetected + results.length,
      recyclable: prev.recyclable + recyclable,
      recyclingRate: Math.round(((prev.recyclable + recyclable) / (prev.itemsDetected + results.length)) * 100) || 0,
      co2Saved: Number((prev.co2Saved + totalCO2).toFixed(1)),
      energySaved: Number((prev.energySaved + totalEnergy).toFixed(1)),
    }));

    // Scroll to results
    setTimeout(() => {
      const element = document.querySelector('#results');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleRetry = () => {
    setUploadedImage(null);
    setDetectionResults([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <HeroSection onImageCapture={handleImageCapture} />
      
      <Dashboard stats={dashboardStats} />
      
      {/* Getting Started Modal */}
      {showGettingStarted && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">Getting Started with SahiBin</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowGettingStarted(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Welcome to SahiBin! Follow these steps to start detecting and properly disposing of waste:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Capture or Upload</h3>
                    <p className="text-sm text-muted-foreground">
                      Use your camera or upload an image of waste items
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">AI Detection</h3>
                    <p className="text-sm text-muted-foreground">
                      Our advanced system will identify and classify the waste
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Get Instructions</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive detailed disposal and recycling instructions
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Track Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      See your contribution to sustainability
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button 
                  onClick={() => {
                    setShowGettingStarted(false);
                    document.querySelector('#camera')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Start with Camera
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowGettingStarted(false)}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* New to SahiBin Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setShowGettingStarted(true)}
          className="bg-gradient-to-r from-primary to-eco-accent hover:from-primary/90 hover:to-eco-accent/90 shadow-lg"
          size="lg"
        >
          <Zap className="w-4 h-4 mr-2" />
          New to SahiBin?
        </Button>
      </div>
      
      <div id="results">
        <DetectionResults 
          image={uploadedImage}
          results={detectionResults}
          onRetry={handleRetry}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
