import Image from "next/image";

export default function Index() {
  return (
    <body className = "bg-black h">
    <div className="h-3/4 bg-black flex">
  <div className="w-1/2 flex flex-col justify-center items-center">
    <h1 className="text-slate-500 text-9xl font-serif text-center">
      Track the Journey
    </h1>
    <h2 className="text-slate-300 text-4xl font-serif text-center mt-4">
      Mapping Student Success
    </h2>
  </div>

  <div className="w-1/2 relative overflow-hidden flex justify-center ">
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
</body>
);
}


