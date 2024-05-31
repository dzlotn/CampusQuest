import { Inter } from "next/font/google";
import Navbar from './navbar';
import Footer from './footer';
import "./globals.css";
import PerfectScrollbar from 'perfect-scrollbar';


const inter = Inter({ subsets: ["latin"] });
 // Import required modules
   const express = require('express');
   const passport = require('passport');
   const LocalStrategy = require('passport-local').Strategy;

   // Initialize Express app
   const app = express();

   // Configure Passport.js
   passport.use(new LocalStrategy(
     function(username, password, done) {
       // Replace this with your actual user authentication logic
       if (username === 'user' && password === 'password') {
         return done(null, { id: 1, username: 'user' });
       } else {
         return done(null, false, { message: 'Incorrect username or password' });
       }
     }
   ));

   // Initialize Passport.js middleware
   app.use(passport.initialize());

   // Other app configurations and routes...

   // Start the server
   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });


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
