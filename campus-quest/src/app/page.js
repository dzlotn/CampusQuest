import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Index() {
  return (
    <body className="bg-black">
      <div className="h-3/4 bg-black flex">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <h1 className="text-[#94D1BE] text-9xl  text-center font-bold">
            Track the Journey
          </h1>
          <h2 className="text-slate-300 text-4xl font-serif text-center mt-4">
            Mapping Student Success
          </h2>
        </div>

        <div className="w-1/2 relative overflow-hidden flex justify-center items-center">
          <Image
            src="https://wallpapercave.com/wp/wp3357174.jpg"
            alt="sectionimage"
            className="object-cover"
            width={1000}
            height={500}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black from-2% " />
        </div>
      </div>
      {/* border-t-4 border-dashed border-slate-500 */}
      <div className="bg-black flex h-[50vh] "> 
        <div className="bg-black flex flex-col w-1/2 justify-center items-center border-r-4 border-radius-2">
          <h1 className="text-center">a</h1>
        </div>
        <div className="bg-green flex w-1/2 justify-center items-center relative overflow-hidden">
          <Image
            src="https://wallpapers.com/images/featured/map-pin-png-uif0obj7gubmdh59.jpg"
            alt="sectionimage"
            className="object-cover"
            width={400}
            height={400}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black from-2%" />
        </div>
      </div>
    </body>
  );
}
