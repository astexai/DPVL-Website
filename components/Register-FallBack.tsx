

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const RegisterFormFallBack: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-3 md:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header - Kept Exactly the Same */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-7xl font-norch uppercase text-[#3B3BB7] mb-2 tracking-wide text-center">
            Player Registration
          </h2>
          <div className="md:w-90 w-20 h-1 bg-[#D159A3]" />
        </div>

        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[500px]">
          <div className="grid lg:grid-cols-2 h-full">
            
            {/* LEFT - Coming Soon Content (Replaces Form) */}
            <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center h-full">
              
              {/* Icon / Graphic */}
              <div className="mb-6 p-4 bg-indigo-50 rounded-full">
                <svg 
                  className="w-16 h-16 text-[#3B3BB7]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.5" 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#3B3BB7] mb-4">
                Registration Opening Soon
              </h2>
              
              <div className="w-16 h-1 bg-[#D159A3] mb-6 rounded-full" />

              <p className="text-gray-600 text-lg md:text-xl max-w-md leading-relaxed mb-8">
                We are currently preparing for the upcoming season of the Delhi Pro Volleyball League. The registration portal will be live shortly.
              </p>

              <div className="space-y-4 w-full max-w-xs">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm font-semibold text-gray-500">
                    Stay tuned for updates
                  </p>
                </div>
                
                <Link 
                  href="/"
                  className="block w-full py-3.5 bg-[#3b3bb7] text-white font-bold rounded-lg hover:bg-[#2a2a8a] transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99]"
                >
                  Back to Home
                </Link>
              </div>
            </div>

            {/* RIGHT - Image (Kept Exactly the Same) */}
            <div className="relative bg-gradient-to-br from-[#3b3bb7] to-[#D159A3] min-h-[300px] lg:min-h-full hidden md:block">
              <Image
                src="/assets/bg/Register.jpg"
                alt="DPVL"
                fill
                className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterFormFallBack;