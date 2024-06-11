'use client'
import React from 'react';
import Image from 'next/image';
import { search, logChanges,checkIcon} from './search'; // Assuming 'search.js' is in the same directory


export default function Discover() {
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
                    <h1  id  ="discoverTitle"className="text-overlay drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] absolute inset-0 flex items-center justify-center text-white font-bold text-2xl ">Discover Colleges and Universities</h1>
                    <div className="text-box-container absolute inset-x-0 bottom-0 mb-10 flex items-center justify-center">
                        <input type="text" id="tbox1" name="Name" placeholder="Search for a school" className="bg-black text-white p-2 border border-white rounded-l-lg" onKeyUp={() => logChanges('tbox1')}></input>
                        <button className="bg-green-500 rounded-r-lg px-4 py-2 cursor-pointer active:bg-green-600 border" id="gobutton" onClick={() => checkIcon(search())}>Go</button>
                    </div>
                </div>
            </div>
            <div className="bg-black">asf</div>
        </body>
    );
}
