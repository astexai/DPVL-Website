import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FooterGrad from "@/components/footergrad";
import Heroo from "@/components/herosection";
import Squad from "@/components/Squad";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  // Optional: pre-render all known team slugs if you keep a central teams list.
  // Return [] if you prefer on-demand rendering.
  return [];
}

export default async function TeamPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) return notFound();

  return (
    <main className="min-h-screen bg-zinc-50 font-sans">
      <Navbar />
      
        <Squad slug={slug} />
    
      <FooterGrad />
      <Footer />
    </main>
  );
}