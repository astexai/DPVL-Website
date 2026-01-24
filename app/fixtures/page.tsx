import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FooterGrad from "@/components/footergrad"
import Heroo from "@/components/herosection"
import MatchSchedule from "@/components/matchschedule"


const page = () => {
  return (
     <main className="min-h-screen bg-zinc-50 font-sans">
     <Navbar />
      <Heroo title="FIXTURES" subtitle="The league that fuels ambition, celebrates skill, and brings volleyball to life." />
      <MatchSchedule />
      <FooterGrad />
      <Footer />
    </main>
  )
}

export default page
