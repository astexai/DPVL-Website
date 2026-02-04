import ContactSection from "@/components/Contact";
import Footer from "@/components/footer";
import FooterGrad from "@/components/footergrad";
import Heroo from "@/components/herosection";
import Navbar from "@/components/navbar";

export default function ContactUs()
{
    return <div className="">
        <Navbar/>
        <div>
            <Heroo
        title="Contact us"
      
        />
        <ContactSection/>
        <FooterGrad/>
        <Footer/>
        </div>
        
    </div>
}