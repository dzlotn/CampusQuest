import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


export default function Index() {
  console.log('hello world');

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
      <div className="bg-black flex h-[30vh] pt-8">
        <div className="bg-black flex flex-col w-1/3 justify-center items-center">
          <div className="bg-green flex w-1/2 justify-center items-center relative overflow-hidden">
            <Image
              src="https://wallpapers.com/images/featured/map-pin-png-uif0obj7gubmdh59.jpg"
              alt="sectionimage"
              className="object-cover"
              width={400}
              height={200}
            />
          </div>

        </div>
        <div className="text-white flex flex-col bg-invisible w-1/2 justify-center ">
          <h1 className="text-4xl font-bold">Campus Quest</h1>
          <p className="font-serif text-slate-300 mt-2 ">CampusQuest analyzes the path of seniors from your high school going to college. CampusQuest discovers information like geographical trends, popular majors, college acceptance rates, and provides insights into the most common college destinations. CampusQuest converts all college destinations and majors into one comprehensive map! This tool helps students make informed decisions about their higher education journey. </p>
        </div>

      </div>
      <div className="bg-black pt-8 pb-4">
        <h1 className="text-3xl text-center text-white font-bold"> How CampusQuest Works</h1>
        <div className="flex justify-center space-x-8 mt-8">
          <div className="rounded-lg border-2 border-[#255546] bg-[#94D1BE] p-4 w-64 h-16 justify-center flex items-center hover:scale-105">
            <Image src="/searchicon.png" width={20} height={20} className=" mr-4"></Image>

            <h1 className="text-black text-left text-base font-bold">Step 1: Data Collection</h1>
          </div>
          <div className="rounded-lg border-2 border-[#255546] bg-[#94D1BE] p-4 w-64 h-16 justify-center flex items-center hover:scale-105">
            <Image src="/mapicon.png" width={30} height={30} className=" mr-4 mb-1"></Image>

            <h1 className="text-black text-left text-base font-bold">Step 2: Mapping</h1>
          </div>
          <div className="rounded-lg border-2 border-[#255546] bg-[#94D1BE] p-4 w-64 h-16 justify-center flex items-center hover:scale-105">
            <Image src="/data.png" width={30} height={30} className=" mr-4"></Image>

            <h1 className="text-black text-left text-base font-bold">Step 3: Visualization</h1>
          </div>
        </div>
      </div>
      <div className="bg-black pt-8 pb-8">
        <h1 className="text-3xl text-center text-white font-bold"> Benefits of CampusQuest</h1>
        <div className="flex justify-center space-x-8 mt-8">
          <div className="rounded-lg border-2 border-[#255546] bg-[#94D1BE] p-4 w-64 h-16 justify-center flex items-center hover:scale-105">
            <Image src="/lightbulb.png" width={35} height={35} className=" mr-2 mb-1"></Image>

            <h1 className="text-black text-left text-base font-bold">Insights</h1>
          </div>
          <div className="rounded-lg border-2 border-[#255546] bg-[#94D1BE] p-4 w-64 h-16 justify-center flex items-center hover:scale-105">
            <Image src="/handshake.png" width={40} height={40} className=" mr-4"></Image>

            <h1 className="text-black text-left text-base font-bold">Engagement</h1>
          </div>
          <div className="rounded-lg border-2 border-[#255546] bg-[#94D1BE] p-4 w-64 h-16 justify-center flex items-center hover:scale-105">
            <Image src="/tick.png" width={30} height={30} className=" mr-4"></Image>

            <h1 className="text-black text-left text-base font-bold">Decision Making</h1>
          </div>
        </div>
      </div>
    </body>
  );
}
