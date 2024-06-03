import React from 'react';
import Image from 'next/image';

export default function discover() {
    return (
        <body className="bg-black">
            <div className=" bg-black image-container relative flex items-center justify-center">
                <Image
                    src="/campusphoto.jpg"
                    alt="sectionimage"
                    className="brightness-25 rounded-lg"
                    width={500}
                    height={500}
                />
                <div className="text-overlay absolute left-50 top-30 p-4 text-white font-bold text-2xl">Discover Colleges and Universities</div>
            </div>
            <div className = "h-1/3 bg-black"></div>
            
        </body>

    );
}