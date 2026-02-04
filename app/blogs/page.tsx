'use client'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FooterGrad from "@/components/footergrad"
import Heroo from "@/components/herosection"
import Image from "next/image"
import Link from "next/link"
import { blogPosts } from "@/data/blogs"

const page = () => {

  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
     <Navbar />
       <Heroo title="BLOGS"/>
      <section className="relative w-full py-20 px-4 md:px-8 overflow-hidden bg-[#d66095]">
      
  
      <div className="absolute inset-0 w-full h-full z-0">
      
        <div className="absolute inset-0 bg-gradient-to-br opacity-80 from-[#d66095] via-[#a259e6] to-[#6a1b9a]" />
        
   
        <Image
          src="/assets/bg/Blog.png"
          alt="Background Texture"
          fill
          className=""
        />
        
      
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          
          {blogPosts.map((post, index) => (
            <div 
              key={index}
              className="w-full max-w-sm bg-[#3b3bb7] rounded-xl p-4 flex flex-col items-center text-center shadow-2xl hover:-translate-y-2 transition-transform duration-300 border border-white/10"
            >
              
        
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-6">
                <Image
                  src={post.image} 
                  alt="Volleyball Action"
                  fill
                  className="object-cover"
                />
              </div>

              <p className="
  text-white text-lg font-medium leading-snug px-2
  line-clamp-3
  min-h-[4.5rem]
  mb-8
">
  {post.title}
</p>


           
              <Link href={`/blogs/${post.slug}`}>
              <button className="bg-[#d66095] hover:bg-[#c2185b] text-white text-sm font-bold uppercase py-2 px-8 rounded-full shadow-lg transition-colors duration-300 tracking-wider">
                Read Here
              </button>
</Link>
            </div>
          ))}

        </div>
      </div>
    </section>
      <FooterGrad />
      <Footer />
    </main>
  )
}

export default page
