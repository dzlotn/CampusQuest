import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-lightlark border-b-[0.001rem] border-slate-500">
      <div className="flex items-center">
        <Image src="/mapicon.png" alt="Logo" width={40} height={40} className="mr-2 invert"  />
        <span className="text-white text-[1.25rem] font-mono ml-2.5">CampusQuest</span>
      </div>
      <div className="flex space-x-3 mr-3 ">
        <Link href = "/statistics" className="text-white hover:bg-gray-700 hover:underline p-2 rounded">Statistics</Link>
        <Link href="/contact" className="text-white hover:bg-gray-700 hover:underline p-2 rounded">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
