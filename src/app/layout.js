

import localFont from "next/font/local";
import "./globals.css";
import MovieHeader from "@/components/movieHeader.jsx";
import { StoreProvider } from "@/store/storeProvider";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Sharma Next App",
  description: "Sharma Next App",
};
console.log('inside layout');

const RootLayout=({ children }) =>{
  
  return (
    <StoreProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="flex w-full absolute z-50">
              
              <MovieHeader/>

            </div>
            <div className="flex">
                  {/* Main content */}
                  <div className="flex-1">
                    {children}
                  </div>
            </div>
          </body>
        </html>
    </StoreProvider>
    
    
  );
}
export default RootLayout//wrapper.withRedux(RootLayout)
