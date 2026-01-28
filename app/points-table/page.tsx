'use client'

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FooterGrad from "@/components/footergrad"
import Pointstable from "@/components/pointstable"
import Image from "next/image"
import Heroo from "@/components/herosection"
import AutoScrollComponent from "@/components/PointsScroll"

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
      <AutoScrollComponent/>
      <Pointstable />
      <FooterGrad />
      <Footer />
    </main>
  )
}
