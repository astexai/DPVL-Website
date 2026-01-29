'use client';
import React from 'react';

const messages = [
	'Welcome to the Official Website of Delhi Pro Volleyball League (DPVL)',
	'Welcome to the Official Website of Delhi Pro Volleyball League (DPVL)',
	'Welcome to the Official Website of Delhi Pro Volleyball League (DPVL)',
	'Welcome to the Official Website of Delhi Pro Volleyball League (DPVL)',
	'Welcome to the Official Website of Delhi Pro Volleyball League (DPVL)',
	'Welcome to the Official Website of Delhi Pro Volleyball League (DPVL)',
];

const Headline: React.FC = () => {
	return (
		<div className="relative w-full overflow-hidden border-b-2 border-white" style={{background: 'linear-gradient(90deg, #4b3bb7 0%, #3b3bb7 100%)'}}>
			<div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{zIndex:1}} />
			<div className="whitespace-nowrap flex items-center h-10" style={{position:'relative',zIndex:2}}>
				<div className="w-full">
					<div className="marquee flex items-center">
						{messages.map((msg, idx) => (
							<React.Fragment key={idx}>
								<span className="text-white text-[18px] md:text-[20px] font-normal px-4">{msg}</span>
								{idx !== messages.length-1 && (
									<span className="inline-block align-middle mx-2">
										<span className="w-3 h-3 bg-[#D159A3] rounded-full inline-block" />
									</span>
								)}
							</React.Fragment>
						))}
					</div>
				</div>
			</div>
			<style>{`
				.marquee {
					display: inline-flex;
					animation: marquee-x 25s linear infinite;
				}
				@keyframes marquee-x {
					0% { transform: translateX(0); }
					100% { transform: translateX(-50%); }
				}
			`}</style>
		</div>
	);
};

export default Headline;
