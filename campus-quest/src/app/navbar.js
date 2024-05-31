import Link from 'next/link';
import Image from 'next/image';


const Navbar = () => {
  return (

    <header class="bg-black shadow-lg hidden md:block text-white">
      <div class="container mx-auto flex items-center h-24">
        <Image src="/mapicon.png" alt="main icon" width={40} height={40} className="ml-4 invert" />
        <span class="select-none ml-4 uppercase font-black">Campus<br />Quest</span>
        <nav class="contents font-semibold text-base lg:text-lg">
          <ul class="mx-auto flex items-center">
            <li class="p-5 xl:p-8 active">
              <div class="hover:text-green-300">

                <a href="/" >
                  <span>Home</span>
                </a>
              </div>
            </li>
            <li class="p-5 xl:p-8">
              <div className="hover:text-green-300">
                <a href="/statistics">
                  <span>Statistics</span>
                </a>
              </div>

            </li>
            <li class="p-5 xl:p-8">
              <div class="hover:text-green-300">
                <a href="">
                  <span>Projects</span>
                </a>
              </div>
            </li>
            <li class="p-5 xl:p-8">
              <a href="">
                <div class="hover:text-green-300">

                  <span>Services</span>
                </div>
              </a>
            </li>
            <li class="p-5 xl:p-8">
              <a href="">
                <div class="hover:text-green-300">

                  <span>Blog</span>
                </div>
              </a>
            </li>
          </ul>
        </nav>
        <a href = "https://github.com/dzlotn/CampusQuest" target = "_blank">
          <Image src ="/githublogo.png" width={30} height={30} className="invert-0 mr-4"></Image>
        </a>
        <button class="border border-white rounded-full font-bold px-8 py-2 mr-4 hover:border-green-300 " href="/statistics">Sign In</button>
        
      </div>
    </header>
  );
};

export default Navbar;
