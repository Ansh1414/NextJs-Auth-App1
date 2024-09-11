"use Client"
import Link from "next/link";
import Image from 'next/image';
export default function Home() {
  return (
   
    <>
    <div className="mx-auto max-w-7xl px-2 md:px-0">
  <div className="my-4">
    <h1 className="text-3xl font-bold">Our Team</h1>
    <p className="mt-2 text-gray-500">
      Hi every one 
      
    </p>
  </div>
  <div className="grid grid-cols-1 gap-[50px] md:grid-cols-2">
    <div className="flex flex-col items-center text-start">
      <div
        className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
      >
        <img
          src="/images/ankush.png"
          alt=""
          className="z-0 h-full w-full rounded-[10px] object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <h1 className="text-xl font-semibold text-white">Ankush Sharma</h1>
          <h6 className="text-base text-white">Frontend Backend Developer</h6>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center text-start">
      <div
        className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
        
      >
        <img
          src="/images/ankita.png"
          alt=""
          className="z-0 h-full w-full rounded-[10px] object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <h1 className="text-xl font-semibold text-white">Ankita Sharma</h1>
          <h6 className="text-base text-white">Marketing head</h6>
        </div>
      </div>
    </div>
    
    <Link href="/signup">Visit SignUp page</Link>
  </div>
</div>
    </>
  );
}
