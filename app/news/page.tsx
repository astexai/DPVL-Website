import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FooterGrad from "@/components/footergrad"
import Heroo from "@/components/herosection"
import { FaChevronRight, FaArrowRight } from "react-icons/fa"
import Image from "next/image"
import { newsItems } from "@/data/news"
import Link from "next/link"

const page = () => {

  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <Navbar />

      <Heroo
        title="NEWS"
        subtitle="The league that fuels ambition, celebrates skill, and brings volleyball to life."
      />

      <FooterGrad variant="cropped" height={20} />

      <section className="relative w-full py-16 px-4 md:px-8 bg-[#3b3bb7] overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/assets/bg/InfoBg.png"
            alt="Background Texture"
            fill
            className="object-cover opacity-80 mix-blend-overlay rotate-180"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Heading */}
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-10">
            <div className="flex items-center gap-2">
              <h2 className="text-5xl md:text-7xl font-norch uppercase text-white  tracking-wide">
                Latest News
              </h2>
              <FaChevronRight className="text-[#d66095] text-2xl md:text-4xl mt-1" />
            </div>
            <div className="mr-10 md:mr-0 w-40 md:w-60 h-1 bg-[#D159A3] mt-2" />
          </div>

          {/* Card Wrapper */}
          <div className="relative w-full rounded-3xl p-6 md:p-10 overflow-hidden border border-white/10 shadow-2xl">

            {/* Inner Texture */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/bg/LatestNews.png"
                alt="Inner Texture"
                fill
                className="object-cover"
              />
            </div>

            {/* News Grid */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newsItems.map((item) => (
  <Link
    key={item.id}
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden shadow-lg cursor-pointer bg-black block"
  >
    <Image
      src={item.image}
      alt={item.title}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 scale-112"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

    <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 flex flex-col justify-end h-full">
      <p className="text-white text-sm md:text-base font-medium leading-snug">
        {item.title.replace("DPVL ", "")}
      </p>

      <div className="self-end mt-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
        <FaArrowRight className="text-white text-lg" />
      </div>
    </div>
  </Link>
))}

            </div>

          </div>
        </div>
      </section>

      <FooterGrad />
      <Footer />
    </main>
  )
}

export default page
