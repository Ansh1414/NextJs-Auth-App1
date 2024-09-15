
import localFont from "next/font/local";
import "./globals.css";
import HamburgerMenuIcon from "@/components/HamburgerMenuIcon.jsx";
import { Toaster } from 'react-hot-toast';
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

const RootLayout=({ children }) =>{
 
  return (
    <StoreProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Toaster />
            <div className="flex">
                  {/* Sidebar */}
                  <HamburgerMenuIcon/>
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
