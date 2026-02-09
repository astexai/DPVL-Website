import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { blogPosts } from "@/data/blogs";
import Heroo from "@/components/herosection";
import FooterGrad from "@/components/footergrad";
import "./blog-post.css";

// Define the proper type for your blog posts
type BlogPost = {
  title: string;
  slug: string;
  image: string;
  content: string;
};

export async function generateStaticParams() {
  if (!Array.isArray(blogPosts)) return [];

  const invalid = blogPosts.filter((p) => typeof p.slug !== "string" || p.slug.trim() === "");
  if (invalid.length) {
    // eslint-disable-next-line no-console
    console.warn(`[generateStaticParams] ${invalid.length} blog post(s) missing/invalid slug`, invalid.map(b => b.title ?? b));
  }

  return blogPosts
    .filter((p) => typeof p.slug === "string" && p.slug.trim() !== "")
    .map((p) => ({ slug: p.slug as string }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug) as BlogPost | undefined;
  
  if (!post) return notFound();

  // FIXED: Use only post.content since that's the property that exists
  const htmlContent = typeof post.content === "string" ? post.content : "";

  // Check if content has enough h2 sections before splitting
  let beforeImage = "";
  let afterFirstH2 = "";
  let afterImage = "";

  if (htmlContent.includes('<h2>')) {
    const contentParts = htmlContent.split('<h2>');
    
    // Introduction (content before first h2)
    beforeImage = contentParts[0] || "";
    
    // First 2 h2 sections (indices 1 and 2)
    if (contentParts.length >= 3) {
      afterFirstH2 = '<h2>' + contentParts.slice(1, 3).join('<h2>');
      afterImage = contentParts.length > 3 ? '<h2>' + contentParts.slice(3).join('<h2>') : "";
    } else {
      // If fewer than 3 h2 sections, just show all after first h2
      afterFirstH2 = '<h2>' + contentParts.slice(1).join('<h2>');
      afterImage = "";
    }
  } else {
    // If no h2 tags at all, use the full content
    beforeImage = htmlContent;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
      <Navbar />
      <Heroo
        title={post.title ?? "Blog"}
        titleClassName="text-xl md:text-4xl lg:text-6xl md:max-w-2xl max-w-xl  leading-tight mx-auto -ml-2 md:-mr-0 mr-25 md:-ml-4"
      />

      <article className="max-w-4xl mx-auto px-6 py-16">
        
        {/* Introduction */}
        {beforeImage && (
          <div 
            className="blog-content intro-section" 
            dangerouslySetInnerHTML={{ __html: beforeImage }} 
          />
        )}

        {/* First sections */}
        {afterFirstH2 && (
          <div 
            className="blog-content" 
            dangerouslySetInnerHTML={{ __html: afterFirstH2 }} 
          />
        )}

        {/* Featured Image with Caption */}
        {post.image && (
          <figure className="my-16 -mx-6 md:mx-0">
            <div className="relative w-full h-[350px] md:h-[550px] rounded-none md:rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={post.image}
                alt={post.title ?? "Blog post image"}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <figcaption className="text-center mt-4 text-sm text-gray-500 px-6 md:px-0">
              Delhi Pro Volleyball League - Where Champions Rise
            </figcaption>
          </figure>
        )}

        {/* Remaining content */}
        {afterImage && (
          <div 
            className="blog-content" 
            dangerouslySetInnerHTML={{ __html: afterImage }} 
          />
        )}
        
        {/* Back button with nice styling */}
        <div className="mt-16 pt-10 border-t-2 border-gray-200">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-3 px-6 py-3 bg-[#3B3BB7] text-white font-semibold rounded-lg hover:bg-[#2A2A8A] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to All Blogs</span>
          </Link>
        </div>
      </article>

      <FooterGrad />
      <Footer />
    </main>
  );
}