'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import FooterGrad from '@/components/footergrad'
import Heroo from '@/components/herosection'
import { CiImageOn } from 'react-icons/ci'

/* -------------------- Types -------------------- */
type Category = string

type GalleryImage = {
  id: number
  category: Category
  src: string
}

/* -------------------- Data -------------------- */
const galleryImages: GalleryImage[] = [
  { id: 1, category: 'Opening Ceremony', src: '/assets/opening/image1.jpg' },
  { id: 2, category: 'Opening Ceremony', src: '/assets/opening/image2.jpg' },
  { id: 3, category: 'Opening Ceremony', src: '/assets/opening/image3.jpg' },
  { id: 4, category: 'Opening Ceremony', src: '/assets/opening/image4.jpg' },
  { id: 5, category: 'Opening Ceremony', src: '/assets/opening/image5.jpg' },
  { id: 6, category: 'Opening Ceremony', src: '/assets/opening/image6.jpg' },
  { id: 7, category: 'Opening Ceremony', src: '/assets/opening/image7.jpg' },
]

const categories: Category[] = [
  'Opening Ceremony',
  'Auction',
  'Trophy Launch',
  'Match Day',
]

/* -------------------- Helpers -------------------- */
const getEmptyStateText = (category: string) => ({
  title: `${category} Images Coming Soon`,
  desc: `Moments from the ${category.toLowerCase()} will be available here soon. Stay tuned for official updates and highlights.`,
})

/* -------------------- Component -------------------- */
export default function Page() {
  const [activeFilter, setActiveFilter] =
    useState<Category>('Opening Ceremony')

  const filteredImages = galleryImages.filter(
    (img) => img.category === activeFilter
  )

  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <Navbar />

      <Heroo
        title="GALLERY"
        subtitle="The league that fuels ambition, celebrates skill, and brings volleyball to life."
      />

      <section className="relative w-full min-h-screen pt-12 pb-20">
        {/* Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/assets/bg/Gallery.png"
            alt="Gallery Background"
            fill
            className="object-cover"
          />
          <FooterGrad variant="cropped" height={20} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 w-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-8 py-2.5 rounded-full text-base md:text-lg font-medium tracking-wide transition-all duration-300
                  ${
                    activeFilter === category
                      ? 'bg-[#D159A3] text-white shadow-lg border border-[#3d3db5] scale-105'
                      : 'bg-transparent text-white border-2 border-[#D159A3] hover:bg-white/10'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full animate-fadeIn">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative group w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-white/10"
              >
                <Image
                  src={image.src}
                  alt={image.category}
                  fill
                  loading='lazy'
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
            ))}

            {/* Auto Empty State */}
            {filteredImages.length === 0 && (
              <div className="col-span-full mt-20 flex items-center justify-center py-16">
                <div className="w-full max-w-3xl flex flex-col items-center text-center px-6">
                  <div className="w-20 h-20 rounded-full border border-white/40 flex items-center justify-center mb-6">
                    <CiImageOn className="w-8 h-8 text-white/60" />
                  </div>

                  <h3 className="text-white text-2xl md:text-3xl font-semibold mb-3">
                    {getEmptyStateText(activeFilter).title}
                  </h3>

                  <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl">
                    {getEmptyStateText(activeFilter).desc}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <FooterGrad />
      <Footer />
    </main>
  )
}
