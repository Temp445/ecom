import React from "react";
import CustomerCare from "@/assets/icons/CustomerCare.png"
import Mail from "@/assets/icons/Mail.png"
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full shadow-md bg-white border border-gray-200">
      <div className="container mx-auto px-4 xl:px-6 2xl:px-10 py-0.5 flex items-center justify-between">
        <div className="flex gap-3 text-xs" >
      <Image src={Mail} alt=""  width={16} height={16} />  hydraulic@gmail.com
        </div>


        <div className="flex items-center space-x-2 text-[#2E2E2E] font-medium text-xs">
            <div className="flex flex-col text-right">
            <span className="text-xs text-[#6B6B6B]">Helpline</span>
             <Link href="tel:+919876543210" className="text-xs border-b border-transparent hover:border-[#2E2E2E] hover:border-b-1 transition-all duration-300">
            +91 98765 43210
            </Link>
            </div>
         <Image src={CustomerCare} alt="Customer Care" width={28} height={28} />
       
        </div>
      </div>
    </header>
  );
};

export default Header;
