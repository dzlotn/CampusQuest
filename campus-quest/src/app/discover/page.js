'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { search, logChanges, checkIcon } from './search'; // Assuming 'search.js' is in the same directory
import { testCollegeInfo } from './admissions'; // Assuming 'admissions.js' is in the same directory

const commonColleges = [
  { name: 'Harvard University', icon: '/harvard.jpg' },
  { name: 'Stanford University', icon: '/stanford.jpg' },
  { name: 'MIT', icon: '/mit.jpg' },
  { name: 'Yale University', icon: '/yale.jpg' },
  { name: 'Princeton University', icon: '/princeton.jpg' },
  { name: 'Columbia University', icon: '/columbia.jpeg' },
];

// Hardcoded college data
const hardcodedColleges = {
  Cornell: {
    name: 'Cornell University',
    icon: '/cornell.jpg', // Replace with actual icon path
    acceptanceRate: 0.105, // Example acceptance rate (10.5%)
    tuitionCost: "60,000", // Example tuition cost
    roomBoardCost: "15,000", // Example room and board cost
    state: 'New York',
    city: 'Ithaca',
  },
  "Cornell University": {
    name: 'Cornell University',
    icon: '/cornell.jpg', // Replace with actual icon path
    acceptanceRate: 0.105, // Example acceptance rate (10.5%)
    tuitionCost: "60,000", // Example tuition cost
    roomBoardCost: "15,000", // Example room and board cost
    state: 'New York',
    city: 'Ithaca',
  },
  MIT: {
    name: "MIT",
    icon: "/mit.jpg",
    acceptanceRate: 0.04, // Example acceptance rate (10.5%)
    tuitionCost: "79,850", // Example tuition cost
    roomBoardCost: "14,720", // Example room and board cost
    state: 'Massachusetts',
    city: 'Boston',
  },
};

export default function Discover() {
  const [collegeInfo, setCollegeInfo] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    try {
      const college = search(); // Perform the search
      const icon = await checkIcon(college); // Fetch the college icon
      let admissions = {};

      // Check if the college is hardcoded
      if (hardcodedColleges[college]) {
        admissions = hardcodedColleges[college];
      } else {
        admissions = await testCollegeInfo(college);
      }

      // Set the college information
      setCollegeInfo({
        name: college,
        icon: icon,
        acceptanceRate: admissions.acceptanceRate ? (admissions.acceptanceRate * 100).toFixed(2) : 'N/A',
        tuitionCost: admissions.tuitionCost ? admissions.tuitionCost : 'N/A',
        roomBoardCost: admissions.roomBoardCost ? admissions.roomBoardCost : 'N/A',
        state: admissions.state ? admissions.state : 'N/A',
        city: admissions.city ? admissions.city : 'N/A',
      });
      setError(false); // Reset error state
    } catch (error) {
      console.error('Error searching for college:', error);
      const college = search(); // Perform the search
      const icon = await checkIcon(college); // Fetch the college icon
      setCollegeInfo({
        name: college,
        icon: icon,
        acceptanceRate: 'N/A',
        tuitionCost: 'N/A',
        roomBoardCost: 'N/A',
        state: 'N/A',
        city: 'N/A',
      });
      setError(true); // Set error state
    }
  };

  const handleCardClick = async (college) => {
    try {
      let admissions = {};

      // Check if the college is hardcoded
      if (hardcodedColleges[college.name]) {
        admissions = hardcodedColleges[college.name];
      } else {
        admissions = await testCollegeInfo(college.name);
      }

      // Set the college information
      setCollegeInfo({
        name: college.name,
        icon: college.icon,
        acceptanceRate: admissions.acceptanceRate ? (admissions.acceptanceRate * 100).toFixed(2) : 'N/A',
        tuitionCost: admissions.tuitionCost ? admissions.tuitionCost : 'N/A',
        roomBoardCost: admissions.roomBoardCost ? admissions.roomBoardCost : 'N/A',
        state: admissions.state ? admissions.state : 'N/A',
        city: admissions.city ? admissions.city : 'N/A',
      });
      setError(false); // Reset error state
    } catch (error) {
      console.error('Error fetching college info:', error);
      setCollegeInfo({
        name: college.name,
        icon: college.icon,
        acceptanceRate: 'N/A',
        tuitionCost: 'N/A',
        roomBoardCost: 'N/A',
        state: 'N/A',
        city: 'N/A',
      });
      setError(true); // Set error state
    }
  };

  const handleBack = () => {
    setCollegeInfo(null);
    setError(false); // Reset error state when going back
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="relative bg-black">
        <div className="image-container relative flex items-center justify-center pt-4 ">
          <Image
            src="/college.jpg"
            alt="sectionimage"
            className="rounded-lg"
            width={500}
            height={500}
          />
          <h1 id="discoverTitle" className="text-overlay drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
            Discover Colleges and Universities
          </h1>
          <div className="text-box-container absolute inset-x-0 bottom-0 mb-10 flex items-center justify-center">
            <input
              type="text"
              id="tbox1"
              name="Name"
              placeholder="Search for a school"
              className="bg-black text-white p-2 border border-white rounded-l-lg"
              onKeyUp={() => logChanges('tbox1')}
            ></input>
            <button
              className="bg-green-500 rounded-r-lg px-4 py-2 cursor-pointer active:bg-green-600 border"
              id="gobutton"
              onClick={handleSearch}
            >
              Go
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-white text-xl font-bold mb-4 text-center mt-4">Common Inquiries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {commonColleges.map((college) => (
            <div
              key={college.name}
              className="relative bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl"
              onClick={() => handleCardClick(college)}
            >
              <img src={college.icon} alt={`${college.name} Icon`} className="w-full h-40 object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <h3 className="text-white text-lg font-bold">{college.name}</h3>
              </div>
              {collegeInfo && collegeInfo.name === college.name && (
                <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center p-4">
                  <h3 className="text-gray-900 text-lg font-bold">
                  {college.name.includes('University') || college.name === 'MIT' ? college.name : `${college.name} University`}
                  </h3>
                  {error ? (
                    <p className="text-red-500 mt-2">Admissions data not available</p>
                  ) : (
                    <>
                      <p className="text-gray-700 mt-2">Admissions Rate: {collegeInfo.acceptanceRate}%</p>
                      <p className="text-gray-700 mt-2">Tuition Cost: ${collegeInfo.tuitionCost}</p>
                      <p className="text-gray-700 mt-2">Room and Board Cost: ${collegeInfo.roomBoardCost}</p>
                      <p className="text-gray-700 mt-2">State: {collegeInfo.state}</p>
                      <p className="text-gray-700 mt-2">City: {collegeInfo.city}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {collegeInfo && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-full max-w-sm bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <img src={collegeInfo.icon} alt="College Icon" className="h-16 w-16 rounded-full" />
              <h2 className="text-gray-900 text-2xl font-bold ml-4">
              {collegeInfo.name.includes('University') || collegeInfo.name === 'MIT' ? collegeInfo.name : `${collegeInfo.name} University`}
              </h2>
            </div>
            <div className="mt-6">
              <h3 className="text-gray-700 text-lg font-bold">
                Admissions Rate: <span className="text-gray font-medium">{collegeInfo.acceptanceRate}%</span>
              </h3>
              <h3 className="text-gray-700 text-lg font-bold mt-2">
                Tuition Cost: <span className="text-gray font-medium">${collegeInfo.tuitionCost}</span>
              </h3>
              <h3 className="text-gray-700 text-lg font-bold mt-2">
                Room and Board Cost: <span className="text-gray font-medium">${collegeInfo.roomBoardCost}</span>
              </h3>
              <h3 className="text-gray-700 text-lg font-bold mt-2">
                State: <span className="text-gray font-medium">{collegeInfo.state}</span>
              </h3>
              <h3 className="text-gray-700 text-lg font-bold mt-2">
                City: <span className="text-gray font-medium">{collegeInfo.city}</span>
              </h3>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleBack}
                className="w-full bg-blue-600 text-white text-lg font-semibold py-2 rounded-lg hover:bg-blue-700"
              >
                Back
              </button>
              <a
                href={`https://www.google.com/search?q=${collegeInfo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 text-white text-lg font-semibold py-2 rounded-lg text-center hover:bg-green-700"
              >
                More Info
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
