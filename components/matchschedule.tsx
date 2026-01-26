'use client';
import Image from 'next/image';

// Mock Data for the matches
const matches = [
  { id: 'MATCH 4', t1: 'TEAM 1', t2: 'TEAM 2', stadium: 'Stadium Name', time: '00:00 - 00:00' },
  { id: 'MATCH 5', t1: 'TEAM 1', t2: 'TEAM 2', stadium: 'Stadium Name', time: '00:00 - 00:00' },
  { id: 'MATCH 5', t1: 'TEAM 1', t2: 'TEAM 2', stadium: 'Stadium Name', time: '00:00 - 00:00' },
  { id: 'MATCH 4', t1: 'TEAM 1', t2: 'TEAM 2', stadium: 'Stadium Name', time: '00:00 - 00:00' },
  { id: 'MATCH 5', t1: 'TEAM 1', t2: 'TEAM 2', stadium: 'Stadium Name', time: '00:00 - 00:00' },
  { id: 'MATCH 5', t1: 'TEAM 1', t2: 'TEAM 2', stadium: 'Stadium Name', time: '00:00 - 00:00' },
];

export default function MatchSchedule() {
  return (
    <section className="relative w-full py-16 px-4 md:px-8 bg-[#3b3bb7] overflow-hidden">
      
      
      <div className="absolute inset-0 w-full h-full z-0">

        <div className="absolute inset-0 " />
        
    
        <Image
          src="/assets/bg/InfoBg.png"
          alt="Texture"
          fill
          className="object-fit rotate-180"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        <div className="flex flex-col items-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold uppercase text-white mb-2 tracking-tighter" style={{ fontFamily: 'sans-serif' }}>
            Match Schedule
          </h2>
 
          <div className="w-24 h-1 bg-[#d9534f] shadow-lg" />
        </div>

     
        <div className="w-full bg-[#e8eaf6] rounded-lg shadow-2xl overflow-hidden border-4 border-[#e8eaf6]/50">
          
          {matches.map((match, index) => (
            <div 
              key={index} 
              className={`
                group relative flex flex-col md:flex-row items-center justify-between 
                p-6 md:py-5 md:px-8 gap-4 md:gap-0
                bg-white hover:bg-gray-50 transition-colors
                ${index !== matches.length - 1 ? 'border-b-4 border-[#3b3bb7]/20' : ''}
              `}
            >
              
             
              <div className="w-full md:w-[15%] flex justify-center md:justify-start">
                <div className="flex items-center h-full">
                  <span className="font-black text-xl md:text-2xl uppercase text-black tracking-tight">
                    {match.id}
                  </span>
             
                  <div className="hidden md:block h-10 w-[3px] bg-[#3b3bb7] ml-auto mr-4"></div>
                </div>
              </div>


              <div className="w-full md:w-[40%] flex items-center justify-center gap-4 md:gap-8">
                
            
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-800 uppercase text-sm md:text-base">{match.t1}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-[8px] flex items-center justify-center font-bold text-gray-500">TBD</div>
                </div>

                <div className="text-2xl md:text-3xl font-black italic text-[#3b3bb7] transform -skew-x-12">
                  VS
                </div>

             
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-[8px] flex items-center justify-center font-bold text-gray-500">TBD</div>
                  <span className="font-bold text-gray-800 uppercase text-sm md:text-base">{match.t2}</span>
                </div>

              </div>

        
              <div className="w-full md:w-[30%] flex justify-center md:justify-start relative">
       
                 <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[3px] bg-[#3b3bb7]"></div>
                 
                 <div className="flex flex-col items-center md:items-start md:pl-8 text-center md:text-left">
                    <span className="font-bold text-gray-800 text-sm md:text-base leading-tight">
                      {match.stadium}
                    </span>
                    <span className="text-gray-500 text-xs md:text-sm font-medium">
                      (Match: {match.time})
                    </span>
                 </div>
              </div>


              <div className="w-full md:w-[15%] flex justify-center md:justify-end mt-2 md:mt-0">
                <div className="relative w-16 h-8 md:w-20 md:h-10">
                  <Image 
                    src="/assets/logo.jpg" 
                    alt="League Logo" 
                    fill 
                    className="object-contain opacity-80"
                  />
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}