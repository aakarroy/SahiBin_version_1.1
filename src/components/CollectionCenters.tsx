import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Phone, Clock, Star } from "lucide-react";

interface CollectionCenter {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  phone: string;
  hours: string;
  types: string[];
  lat: number;
  lng: number;
}

const CollectionCenters = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [searchRadius, setSearchRadius] = useState(5);
  const [selectedCenter, setSelectedCenter] = useState<CollectionCenter | null>(null);

  // Mock collection centers data
  const centers: CollectionCenter[] = [
    {
      id: '1',
      name: 'EcoGreen Recycling Center',
      address: '123 Green Street, Eco City, EC 12345',
      distance: 1.2,
      rating: 4.8,
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM',
      types: ['Plastic', 'Paper', 'Metal', 'Glass'],
      lat: 40.7589,
      lng: -73.9851
    },
    {
      id: '2',
      name: 'City Waste Management',
      address: '456 Recycle Ave, Green Town, GT 67890',
      distance: 2.8,
      rating: 4.5,
      phone: '+1 (555) 987-6543',
      hours: 'Mon-Sat: 7AM-7PM, Sun: 10AM-3PM',
      types: ['Electronics', 'Batteries', 'Textiles'],
      lat: 40.7505,
      lng: -73.9934
    },
    {
      id: '3',
      name: 'Organic Waste Solutions',
      address: '789 Compost Blvd, Nature Park, NP 13579',
      distance: 3.5,
      rating: 4.9,
      phone: '+1 (555) 246-8135',
      hours: 'Daily: 6AM-8PM',
      types: ['Organic', 'Compost', 'Garden Waste'],
      lat: 40.7614,
      lng: -73.9776
    },
    {
      id: '4',
      name: 'Tech Recycle Hub',
      address: '321 Digital Drive, Tech Valley, TV 24680',
      distance: 4.1,
      rating: 4.6,
      phone: '+1 (555) 135-7924',
      hours: 'Tue-Sun: 10AM-6PM',
      types: ['Electronics', 'Computers', 'Phones'],
      lat: 40.7282,
      lng: -73.9942
    }
  ];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to NYC coordinates
          setUserLocation({ lat: 40.7589, lng: -73.9851 });
        }
      );
    } else {
      // Fallback to NYC coordinates
      setUserLocation({ lat: 40.7589, lng: -73.9851 });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getDirections = (center: CollectionCenter) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    window.open(url, '_blank');
  };

  const filteredCenters = centers.filter(center => center.distance <= searchRadius);

  return (
    <div className="space-y-6">
      {/* Location Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            Find Nearby Collection Centers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Search Radius (km)</label>
              <Input
                type="number"
                value={searchRadius}
                onChange={(e) => setSearchRadius(Number(e.target.value))}
                min="1"
                max="50"
                className="w-full"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={getCurrentLocation} className="w-full sm:w-auto">
                <Navigation className="w-4 h-4 mr-2" />
                Update Location
              </Button>
            </div>
          </div>
          
          {userLocation && (
            <div className="text-sm text-muted-foreground">
              Current location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interactive Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Collection Centers Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={mapContainer} 
            className="w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-dashed border-green-300"
          >
            <div className="text-center space-y-2">
              <MapPin className="w-12 h-12 mx-auto text-green-600" />
              <p className="text-green-700 font-medium">Interactive Map</p>
              <p className="text-sm text-green-600">Showing {filteredCenters.length} centers within {searchRadius}km</p>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {filteredCenters.slice(0, 4).map((center, index) => (
                  <div key={center.id} className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-xs font-bold">
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Centers List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCenters.map((center) => (
          <Card key={center.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{center.name}</CardTitle>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{center.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{center.address}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Navigation className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{center.distance} km away</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{center.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{center.hours}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Accepted Materials:</h4>
                <div className="flex flex-wrap gap-2">
                  {center.types.map((type) => (
                    <span key={type} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={() => getDirections(center)}
                  className="flex-1"
                  size="sm"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCenter(center)}
                  className="flex-1"
                  size="sm"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCenters.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Centers Found</h3>
            <p className="text-muted-foreground mb-4">
              No collection centers found within {searchRadius}km. Try increasing the search radius.
            </p>
            <Button onClick={() => setSearchRadius(10)}>
              Expand Search to 10km
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CollectionCenters;