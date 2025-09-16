import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, AlertCircle } from "lucide-react";

interface LocationServiceProps {
  onLocationUpdate: (location: { lat: number; lng: number }) => void;
}

const LocationService = ({ onLocationUpdate }: LocationServiceProps) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setLocation(newLocation);
        onLocationUpdate(newLocation);
        setLoading(false);
      },
      (err) => {
        let errorMessage = 'Failed to get location';
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case err.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  useEffect(() => {
    // Auto-get location on component mount
    getCurrentLocation();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-primary" />
          Location Services
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {location && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center text-green-700 mb-2">
              <Navigation className="w-4 h-4 mr-2" />
              <span className="font-medium">Current Location</span>
            </div>
            <p className="text-sm text-green-600">
              Latitude: {location.lat.toFixed(6)}
            </p>
            <p className="text-sm text-green-600">
              Longitude: {location.lng.toFixed(6)}
            </p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center text-red-700 mb-2">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span className="font-medium">Location Error</span>
            </div>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Button
          onClick={getCurrentLocation}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Getting Location...
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4 mr-2" />
              {location ? 'Update Location' : 'Get Current Location'}
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground">
          <p>
            Location services help us find nearby recycling centers and provide 
            more accurate disposal recommendations based on your area's facilities.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationService;