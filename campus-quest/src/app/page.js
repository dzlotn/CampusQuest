import Image from "next/image";

export default function Index() {
  return (
    <div className = "h-screen">
      <div>     
      <Image src="/map.png" alt="Logo" width={40} height={40} className="mr-2 "  />
      </div>

      <h1 className = "bg-black h-screen text-white">
        
        Welcome to the start page
      </h1>
    </div>
      );
}


