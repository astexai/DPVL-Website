import React from 'react';

export default function FooterGrad() {
  return (
    <div 
      className="w-full h-16 md:h-20 relative overflow-hidden" 
      style={{
        background: 'linear-gradient(90deg, #d66095 0%, #a259e6 100%)'
      }}
    >
   
      <svg
        className="absolute inset-0 w-full h-full mix-blend-overlay opacity-30"
        viewBox="0 0 1200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
   
        <path d="M-100 100 L200 0 L500 0 L200 100 Z" fill="white" />
  
        <path d="M300 100 L600 0 L900 0 L600 100 Z" fill="white" fillOpacity="0.6" />
        
  
        <path d="M700 100 L1000 0 L1300 0 L1000 100 Z" fill="white" />
   
        <path d="M100 100 L400 0 L450 0 L150 100 Z" fill="white" fillOpacity="0.3" />
      </svg>
      

      <div 
        className="absolute inset-0 w-full h-full" 
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 40%, transparent 60%)',
          mixBlendMode: 'soft-light'
        }} 
      />
    </div>
  );
}