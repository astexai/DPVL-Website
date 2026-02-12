import React from 'react';
import Image from 'next/image';

const Philosophy = () => {
  return (
    <section className="relative w-full py-16 px-6 text-white font-sans overflow-hidden">
        
        {/* Background Image */}
        <Image
            src={"/assets/bg/Fixtures.png"}
            alt='BG'
            fill
            className='object-cover'

        />
        
        {/* Dark Overlay (Optional - helps text pop) */}
        <div className="absolute inset-0 z-0"></div>

        {/* CONTENT WRAPPER - Added 'relative' and 'z-10' here */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
            
            {/* Header */}
            <div className="relative mb-12">
                <h2 className="font-norch text-5xl md:text-7xl uppercase tracking-wider relative z-10">
                    PHILOSOPHY
                </h2>
                {/* Pink Underline */}
                <div className="absolute -bottom-2 left-0 right-0 h-1.5 bg-[#d65db1] mx-auto w-full max-w-[200px]"></div>
            </div>

            {/* Intro Text */}
            <div className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed font-medium mb-10">
                <p>
                    Delhi has always been a melting pot of talent, ambition, and spirit. Yet, despite the city’s
                    passion for sports, volleyball has remained on the sidelines.
                    <br />
                    DPVL is here to change that narrative.
                </p>
                <p className="italic text-white/90">
                    We believe sports is not just recreation — it is culture, career, and community.
                </p>
            </div>

            {/* Three Pillars Title */}
            <h3 className="text-2xl md:text-2xl font-bold mb-12">
                The league stands on three cultural pillars:
            </h3>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl mb-16">
                
                {/* INSPIRATION */}
                <div className="flex flex-col items-center gap-4">
                    <h4 className="font-norch text-3xl text-white border-b-2 border-[#d65db1] pb-1 tracking-wide">
                        INSPIRATION
                    </h4>
                    <p className="text-lg">
                        Empowering youth to dream<br/> beyond limits.
                    </p>
                </div>

                {/* CELEBRATION */}
                <div className="flex flex-col items-center gap-4">
                    <h4 className="font-norch text-3xl text-white border-b-2 border-[#d65db1] pb-1 tracking-wide">
                        CELEBRATION
                    </h4>
                    <p className="text-lg">
                        Making volleyball an inclusive, mass-participation celebration of fitness and energy.
                    </p>
                </div>

                {/* REPRESENTATION */}
                <div className="flex flex-col items-center gap-4">
                    <h4 className="font-norch text-3xl text-white border-b-2 border-[#d65db1] pb-1 tracking-wide">
                        REPRESENTATION
                    </h4>
                    <p className="text-lg">
                        Providing Delhi’s athletes a professional stage to shine.
                    </p>
                </div>

            </div>

            {/* Closing Statement */}
            <p className="max-w-4xl mx-auto text-lg md:text-xl leading-relaxed font-medium mb-16">
                Through DPVL, we aim to turn volleyball into a household sport — giving Delhi’s athletes
                the recognition they deserve and fans the experience they crave.
            </p>

            {/* Bottom Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {/* Philosophy Image 1 */}
                <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                    <Image 
                        src="/assets/others/Philosophy1.jpg" 
                        alt="Philosophy 1" 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Philosophy Image 2 */}
                <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                    <Image 
                        src="/assets/others/Philosophy2.jpg" 
                        alt="Philosophy 2" 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Philosophy Image 3 */}
                <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                    <Image 
                        src="/assets/others/Philosophy3.jpg" 
                        alt="Philosophy 3" 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>

        </div>
    </section>
  );
};

export default Philosophy;