'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { search, logChanges, checkIcon } from './search'; // Assuming 'search.js' is in the same directory

const commonColleges = [
    { name: "Harvard University", icon: "/harvard.png", admissionsRate: "5", tuitionCost: "54000" },
    { name: "Stanford University", icon: "/stanford.png", admissionsRate: "4", tuitionCost: "53000" },
    { name: "MIT", icon: "/mit.png", admissionsRate: "6", tuitionCost: "50000" },
    { name: "Yale University", icon: "/yale.png", admissionsRate: "7", tuitionCost: "58000" },
];

export default function Discover() {
    const [collegeInfo, setCollegeInfo] = useState(null);

    const handleSearch = async () => {
        try {
            const college = search(); // Perform the search
            const icon = await checkIcon(college); // Fetch the college icon
            // Set the college information
            setCollegeInfo({
                name: college,
                icon: icon,
                admissionsRate: "13", // Placeholder admissions rate
                tuitionCost: "70000" // Placeholder tuition cost
            });
        } catch (error) {
            console.error('Error searching for college:', error);
            // Handle error
        }
    };

    const handleBack = () => {
        setCollegeInfo(null);
    };

    const handleCardClick = (college) => {
        setCollegeInfo(college);
    };

    return (
        <div className="bg-black min-h-screen">
            <div className="relative bg-black">
                <div className="image-container relative flex items-center justify-center">
                    <Image
                        src="/college.jpg"
                        alt="sectionimage"
                        className="rounded-lg"
                        width={500}
                        height={500}
                    />
                    <h1 id="discoverTitle" className="text-overlay drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">Discover Colleges and Universities</h1>
                    <div className="text-box-container absolute inset-x-0 bottom-0 mb-10 flex items-center justify-center">
                        <input type="text" id="tbox1" name="Name" placeholder="Search for a school" className="bg-black text-white p-2 border border-white rounded-l-lg" onKeyUp={() => logChanges('tbox1')}></input>
                        <button className="bg-green-500 rounded-r-lg px-4 py-2 cursor-pointer active:bg-green-600 border" id="gobutton" onClick={handleSearch}>Go</button>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <h2 className="text-white text-xl font-bold mb-4 text-center">Common Colleges</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {commonColleges.map((college) => (
                        <div key={college.name} className="bg-white rounded-lg p-4 shadow-lg cursor-pointer hover:shadow-xl" onClick={() => handleCardClick(college)}>
                            <div className="flex items-center">
                                <img src={college.icon} alt={`${college.name} Icon`} className="h-16 w-16 rounded-full" />
                                <h3 className="text-gray-900 text-lg font-bold ml-4">{college.name.includes("University") ? college.name : `${college.name} University`}</h3>
                            </div>
                            <div className="mt-2">
                                <p className="text-gray-700">Admissions Rate: {college.admissionsRate}%</p>
                                <p className="text-gray-700">Tuition Cost: ${college.tuitionCost}</p>
                            </div>
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
                                {collegeInfo.name.includes("University") ? collegeInfo.name : `${collegeInfo.name} University`}
                            </h2>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-gray-700 text-lg font-medium">Admissions Rate: {collegeInfo.admissionsRate}%</h3>
                            <h3 className="text-gray-700 text-lg font-medium mt-2">Tuition Cost: ${collegeInfo.tuitionCost}</h3>
                        </div>
                        <div className="mt-6 flex space-x-4">
                            <button onClick={handleBack} className="w-full bg-blue-600 text-white text-lg font-semibold py-2 rounded-lg hover:bg-blue-700">
                                Back
                            </button>
                            <a href={`https://www.google.com/search?q=${collegeInfo.name}`} target="_blank" rel="noopener noreferrer" className="w-full bg-green-600 text-white text-lg font-semibold py-2 rounded-lg text-center hover:bg-green-700">
                                More Info
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
