import { Inter } from "next/font/google";
import Navbar from './navbar';
import Footer from './footer';
import "./globals.css";
import PerfectScrollbar from 'perfect-scrollbar';


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        {/* <Footer /> */}
      </body>
        
    </html>
    
  );
}
