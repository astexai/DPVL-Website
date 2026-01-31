import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import LatestVideos from "./latestvideos";
import Image from "next/image";
import Link from "next/link";

export default function ScheduleCard() {
return (
<div>
<section
className="relative z-30 w-full rounded-xl md:rounded-[85px] pb-16 px-4 md:px-0"
style={{
backgroundImage: "url('/assets/bg/LatestVideo.png')",
backgroundSize: "cover",
backgroundPosition: "center",
}}
>
{/* CARD WRAPPER */}
<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] max-w-3xl z-20 pt-20 md:pt-0">

{/* 🔒 HEIGHT UNCHANGED */}
<div className="relative h-65 md:h-67 rounded-xl overflow-hidden border-[3px] border-[#D159A3] shadow-2xl">

{/* Background */}
<Image
src="/assets/bg/Schedule.png"
alt="Schedule Background"
fill
priority
className="object-cover"
/>

{/* CONTENT */}
<div className="relative z-10 h-full flex flex-col justify-center items-center text-white font-bebas py-3 px-4">

{/* Teams Section - Left and Right */}
<div className="w-full flex items-center justify-between px-4">

{/* Team 1 with Label */}
<div className="flex flex-col items-center gap-2">
<span className="text-lg md:text-2xl tracking-widest uppercase font-bold">TEAM 1</span>
<div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center text-black text-xl md:text-3xl font-bold shadow-lg">
TBD
</div>
</div>

{/* Team 2 with Label */}
<div className="flex flex-col items-center gap-2">
<span className="text-lg md:text-2xl tracking-widest uppercase font-bold">TEAM 2</span>
<div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center text-black text-xl md:text-3xl font-bold shadow-lg">
TBD
</div>
</div>
</div>

{/* VS Image - Centered and Separate */}
<div className="absolute top-[50px] md:top-[25px] left-1/2 -translate-x-1/2">
<Image
src="/assets/others/Vs.png"
alt="VS"
width={80}
height={80}
priority

/>
</div>

{/* DATE & VENUE */}
<div className="absolute flex flex-col items-center top-33 gap-1 text-md md:text-lg tracking-wide text-center mt-3">
<div className="flex items-center gap-2">
<FaCalendarAlt className="text-md" />
<span>JUNE 13, 2025</span>
</div>
<div className="flex items-center gap-2">
<FaMapMarkerAlt className="text-md" />
<span>VENUE EXAMPLE</span>
</div>
<Link href="/fixtures" className="">
<button className="relative bg-[#d66095] hover:bg-[#b54a7b] text-white px-4 py-1.5 rounded-md text-xs md:text-lg uppercase tracking-wide shadow-lg transition">
Match schedule
</button>
</Link>
</div>

{/* BUTTON */}


</div>
</div>
</div>

<LatestVideos />
</section>
</div>
);
}