'use client';
import Image from 'next/image';

const teams = [
  { id: 1, color: 'bg-[#ffc107]' },  
  { id: 2, color: 'bg-[#d67bb0]' }, 
  { id: 3, color: 'bg-[#e0cfa0]' }, 
  { id: 4, color: 'bg-[#d9534f]' }, 
  { id: 5, color: 'bg-[#311b92]' }, 
  { id: 6, color: 'bg-[#ffc107]' }, 
  { id: 7, color: 'bg-[#d67bb0]' }, 
  { id: 8, color: 'bg-[#e0cfa0]' }, 
  { id: 9, color: 'bg-[#e0cfa0]' }, 
  { id: 10, color: 'bg-[#d9534f]' }, 
];

export default function DpvlTeams() {
  return (
    <div className="w-full font-sans">
 
      <section className="relative w-full py-12 px-6 bg-[#f5f5f5] text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold uppercase text-black mb-2 tracking-tight" style={{ fontFamily: 'sans-serif' }}>
            DPVL TEAMS
          </h2>
  
          <div className="w-24 h-1 bg-[#1a237e] mb-6" />
          
          <p className="text-gray-700 text-sm md:text-lg font-medium italic">
            “Lorem ipsum dolor sit amet, consectetur”
          </p>
        </div>
      </section>

 
      <section className="relative w-full py-16 px-4 md:px-8 bg-[#3b3bb7] overflow-hidden">
        
      
        <div className="absolute inset-0 w-full h-full z-0">
        
          <div className="absolute inset-0 bg-gradient-to-b from-[#7b1fa2] via-[#3b3bb7] to-[#1a237e]" />
          
          <div 
            className="absolute inset-0 opacity-10"
            style={{ 
              backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 20px)' 
            }}
          />
     
          <Image
            src="/assets/footerimg.jpg" 
            alt="Texture"
            fill
            className="object-cover opacity-10 mix-blend-overlay"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
        
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 justify-items-center">
            
            {teams.map((team, index) => (
              <div 
                key={index}
                className={`
                  relative w-full aspect-square rounded-lg overflow-hidden shadow-2xl 
                  transition-transform duration-300 hover:scale-105 group cursor-pointer
                  ${team.color}
                `}
              >
           
                <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                  <Image
                    src="/assets/footerimg.jpg"
                    alt="Card Texture"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-20 rounded-full blur-xl" />

           
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="relative w-3/4 h-3/4 drop-shadow-lg">
       
                    <Image 
                      src="/assets/footerimg.jpg" 
                      alt="Team Mascot"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

     
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold uppercase tracking-wider text-sm md:text-lg">View Team</span>
                </div>

              </div>
            ))}

          </div>
        </div>

      </section>
    </div>
  );
}