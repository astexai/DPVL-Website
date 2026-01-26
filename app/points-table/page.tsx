'use client'

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FooterGrad from "@/components/footergrad"
import Pointstable from "@/components/pointstable"
import Image from "next/image"
import Heroo from "@/components/herosection"

export default function Page() {
  const stats = [
    "Super Raids",
    "Raid Points",
    "All Out Points",
    "Super Tackles",
    "Tackle Points",
    "High 5s",
    "Successful Raids",
  ]

  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <Navbar />

      <Heroo
        title="POINTS TABLE"
        subtitle="The league that fuels ambition, celebrates skill, and brings volleyball to life."
      />

      {/* ===== MARQUEE START ===== */}
      <div className="relative w-full h-16 md:h-20 bg-[#f3f4f6] overflow-hidden border-y border-gray-200">
        
        {/* background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50" />
          <Image
            src="/assets/.jpg"
            alt="Texture"
            fill
            className="object-cover opacity-5 mix-blend-multiply"
          />
        </div>
        <Image
            src="/assets/.jpg"
            alt="Texture"
            fill
            className="object-cover opacity-5 mix-blend-multiply"
          />

      </div>

      
      <Pointstable />
      <FooterGrad />
      <Footer />
    </main>
  )
}
