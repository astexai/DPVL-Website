import React from 'react';
import Image from 'next/image';

export default function FooterGrad() {
  return (
    <div className="relative w-screen ml-[50%] -translate-x-1/2 overflow-hidden">
      {/* Using <img> with w-full h-auto allows the container to 
        naturally expand its height based on the image's aspect ratio.
      */}
      <img 
        src="/assets/bg/Strip.png" // Replace with your actual image path
        alt="Footer Background"
        className="w-full h-auto block"
      />

      {/* Optional: If you still want the subtle pattern overlay from your 
        previous code, keep this div below. Otherwise, you can delete it.
      */}
      <div className="absolute inset-0 bg-white/5 pointer-events-none mix-blend-soft-light" />
    </div>
  );
}