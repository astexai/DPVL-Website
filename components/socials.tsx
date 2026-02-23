import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Socials()
{
    return <div>
           <div className="hidden md:flex flex-col gap-5 absolute right-0 top-1/2 -translate-y-1/2 z-30
  bg-linear-to-b from-[#3331C2] to-black
  backdrop-blur-sm py-6 px-3 rounded-l-2xl
  border-l border-white/10 shadow-2xl text-white"
>
  <Link href={"https://instagram.com/delhiprovolleyball"}>
    <FaInstagram/>
  </Link>
<Link href={"https://www.facebook.com/profile.php?id=61585847188129"}>
 <FaFacebook /></Link>

 <Link href={"https://www.youtube.com/@DPVLofficial"}><FaYoutube /></Link>
<Link href={"https://www.linkedin.com/company/dpvl/"}><FaLinkedin/></Link>

</div>
    </div>
}