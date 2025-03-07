import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaMapMarkerAlt, FaLocationArrow } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet'; // Correct import for LatLngExpression
 // Use this hook if needed

const Location: React.FC = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    place: '',
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Function to get the user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Handle success
  const showPosition = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLocation({
      latitude,
      longitude,
      place: 'Loading place info...',
    });

    // Send location to backend or use it to get the place
    sendLocationToBackend(latitude, longitude);

    // Reverse geocode to get the address (place name)
    getPlaceFromCoordinates(latitude, longitude);

    setLoading(false);
  };

  // Handle error in geolocation
  const showError = (error: GeolocationPositionError) => {
    alert(`Error getting location: ${error.message}`);
    setLoading(false);
  };

  // Send the location to the backend
  const sendLocationToBackend = (latitude: number, longitude: number) => {
    fetch('/save-location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude,
        longitude,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Location sent to backend successfully!");
        }
      })
      .catch((error) => {
        console.error('Error sending location:', error);
      });
  };

  // Use a simple API to reverse geocode and get the place name from coordinates
  const getPlaceFromCoordinates = (latitude: number, longitude: number) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const place = data.display_name || 'Unknown Place';
        setLocation((prevLocation) => ({
          ...prevLocation,
          place,
        }));
      })
      .catch((error) => console.error('Error fetching place:', error));
  };

  // Automatically get the location when the component is mounted
  useEffect(() => {
    getLocation();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <h1 className="text-xl">Getting your location...</h1>
        <FaLocationArrow className="animate-spin text-3xl text-blue-600" />
      </div>
    );
  }

  // Correct the center prop to use LatLngExpression
  const position: LatLngExpression = [location.latitude, location.longitude];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Current Location</h1>
      <div className="flex items-center mb-4">
        <FaMapMarkerAlt className="text-2xl mr-2 text-green-600" />
        <span className="text-lg font-medium text-gray-700">{location.place}</span>
      </div>

      {/* Leaflet Map */}
      <MapContainer center={position} zoom={14} style={{ height: '400px' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            <h3>Your Location</h3>
            <p>{location.place}</p>
          </Popup>
        </Marker>
      </MapContainer>

      <div>
        <h2 className="text-xl font-semibold">Latitude:</h2>
        <p>{location.latitude}</p>
        <h2 className="text-xl font-semibold mt-4">Longitude:</h2>
        <p>{location.longitude}</p>
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => window.open(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`, '_blank')}
        >
          Open in Google Maps
        </button>
      </div>
    </div>
  );
};

export default Location;
