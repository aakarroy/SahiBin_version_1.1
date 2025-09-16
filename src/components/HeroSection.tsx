import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, Zap, Recycle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  onImageCapture: (file: File) => void;
}

const HeroSection = ({ onImageCapture }: HeroSectionProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setIsCapturing(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
            onImageCapture(file);
            stopCamera();
          }
        }, 'image/jpeg', 0.9);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCapturing(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      onImageCapture(file);
    }
  };

  const tips = [
    { icon: Lightbulb, text: "Ensure bright, even lighting" },
    { icon: Zap, text: "Keep items clearly visible" },
    { icon: Recycle, text: "Use clean, uncluttered background" },
  ];

  return (
    <section id="camera" className="py-12 bg-gradient-to-b from-eco-light to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-eco-accent bg-clip-text text-transparent">
            Smart Waste Detection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use your camera or upload an image to identify waste items and get disposal instructions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Camera/Upload Section */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-6">
                {!isCapturing ? (
                  <>
                    {/* Camera Button */}
                    <Button
                      onClick={startCamera}
                      size="lg"
                      className="w-full h-16 bg-gradient-to-r from-primary to-eco-accent hover:from-primary/90 hover:to-eco-accent/90 text-white shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    >
                      <Camera className="w-6 h-6 mr-3" />
                      <span className="text-lg font-semibold">Take Photo</span>
                    </Button>

                    {/* Upload Button */}
                    <div className="relative">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        size="lg"
                        className="w-full h-16 border-2 border-primary/20 hover:border-primary/40 hover:bg-eco-light transition-all duration-200 hover:scale-[1.02]"
                      >
                        <Upload className="w-6 h-6 mr-3" />
                        <span className="text-lg font-semibold">Upload Image</span>
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>

                    {uploadedFile && (
                      <div className="text-center p-4 bg-eco-light rounded-lg">
                        <p className="text-sm text-success font-medium">
                          ✓ {uploadedFile.name} uploaded successfully!
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Camera View */}
                    <div className="relative rounded-lg overflow-hidden bg-black">
                      <video
                        ref={videoRef}
                        className="w-full h-64 object-cover"
                        playsInline
                      />
                      <canvas ref={canvasRef} className="hidden" />
                    </div>

                    {/* Camera Controls */}
                    <div className="flex space-x-4">
                      <Button
                        onClick={capturePhoto}
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-primary to-eco-accent hover:from-primary/90 hover:to-eco-accent/90"
                      >
                        <Camera className="w-5 h-5 mr-2" />
                        Capture
                      </Button>
                      <Button
                        onClick={stopCamera}
                        variant="outline"
                        size="lg"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Detection Tips */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6 text-foreground">
                Detection Tips
              </h3>
              <div className="space-y-4">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-eco-light/50 transition-colors hover:bg-eco-light">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <tip.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-foreground font-medium">{tip.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;