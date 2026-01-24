import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Socials()
{
    return <div>
           <div className="hidden md:flex flex-col gap-5 absolute right-0 top-1/2 -translate-y-1/2 z-30
  bg-linear-to-b from-[#3331C2] to-black
  backdrop-blur-sm py-6 px-3 rounded-l-2xl
  border-l border-white/10 shadow-2xl text-white"
>
  <FaInstagram/>
  <FaFacebook />
  <FaWhatsapp />
  <FaXTwitter />
</div>
    </div>
}