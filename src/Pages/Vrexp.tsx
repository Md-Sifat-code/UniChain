import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
 // If you're using `L`, ensure it's actually needed

const Vrexp: React.FC = () => {
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  const getCoordinatesFromPlace = async (place: string) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${place}&format=json&addressdetails=1`);
    const data = await response.json();
    if (data && data.length > 0) {
      const location = data[0];
      setDestination({
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lon),
      });
    } else {
      alert('Could not get coordinates for the given place.');
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div>
      {/* MapContainer for Leaflet */}
      <MapContainer center={userLocation || { lat: 51.505, lng: -0.09 }} zoom={12} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && <Marker position={userLocation}>
          <Popup>Your Location</Popup>
        </Marker>}
        {destination && <Marker position={destination}>
          <Popup>Destination</Popup>
        </Marker>}
      </MapContainer>

      <div>
        <h2>Search for a Location:</h2>
        <input
          type="text"
          placeholder="Enter place name"
          onChange={(e) => getCoordinatesFromPlace(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Vrexp;
