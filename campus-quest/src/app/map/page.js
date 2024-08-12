'use client'
import React, { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Set up the marker icon as described above
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default function MapPage() {
  const [colleges, setColleges] = useState([]);
  const [collegeName, setCollegeName] = useState('');

  const addCollege = () => {
    if (collegeName) {
      // Fetch the college's coordinates (use an API or hardcode some examples)
      const collegeCoords = getCollegeCoordinates(collegeName);
      if (collegeCoords) {
        setColleges([...colleges, { name: collegeName, coords: collegeCoords }]);
        setCollegeName('');
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-black">
      <input
        type="text"
        value={collegeName}
        onChange={(e) => setCollegeName(e.target.value)}
        placeholder="Enter college name"
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={addCollege}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add College
      </button>

      <MapContainer center={[37.8, -96]} zoom={4} className="w-full h-96 mt-4">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {colleges.map((college, index) => (
          <Marker key={index} position={college.coords}>
            <Popup>{college.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function getCollegeCoordinates(collegeName) {
  // Dummy function to simulate fetching college coordinates
  const collegeMap = {
    "Cornell University": [42.4534, -76.4735],
    // Add more colleges here...
  };
  return collegeMap[collegeName];
}
