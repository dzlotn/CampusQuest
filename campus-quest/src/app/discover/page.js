'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { search, logChanges, checkIcon } from './search'; // Assuming 'search.js' is in the same directory

export default function Discover() {
    const [collegeInfo, setCollegeInfo] = useState(null);

    const handleSearch = async () => {
        try {
            const college = search(); // Perform the search
            const icon = await checkIcon(college); // Fetch the college icon
            // Set the college information
            setCollegeInfo({
                name: college,
                icon: icon
            });
        } catch (error) {
            console.error('Error searching for college:', error);
            // Handle error
        }
    };
    const handleBack=()=>{
        setCollegeInfo(null)
    }

    return (
        <body className="bg-black">
            <div className="relative bg-black">
                <div className="image-container relative flex items-center justify-center">
                    <Image
                        src="/college.jpg"
                        alt="sectionimage"
                        className="rounded-lg"
                        width={500}
                        height={500}
                    />
                    <h1 id="discoverTitle" className="text-overlay drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] absolute inset-0 flex items-center justify-center text-white font-bold text-2xl ">Discover Colleges and Universities</h1>
                    <div className="text-box-container absolute inset-x-0 bottom-0 mb-10 flex items-center justify-center">
                        <input type="text" id="tbox1" name="Name" placeholder="Search for a school" className="bg-black text-white p-2 border border-white rounded-l-lg" onKeyUp={() => logChanges('tbox1')}></input>
                        <button className="bg-green-500 rounded-r-lg px-4 py-2 cursor-pointer active:bg-green-600 border" id="gobutton" onClick={handleSearch}>Go</button>
                    </div>
                </div>
            </div>
            {collegeInfo && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/10 bg-white rounded-lg p-4">
                        <h2 className="text-black text-2xl font-bold">{collegeInfo.name}</h2>
                        <img src={collegeInfo.icon} alt="College Icon" />
                        {/* Add more college information here */}
                        <button onClick={handleBack}>Back</button>
                    </div>
                </div>
            )}
        </body>
    );
}
