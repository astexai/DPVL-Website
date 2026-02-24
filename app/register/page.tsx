import Footer from "@/components/footer";
import FooterGrad from "@/components/footergrad";
import Heroo from "@/components/herosection";
import Navbar from "@/components/navbar";
import RegisterFormFallBack from "@/components/Register-FallBack";
import RegisterForm from "@/components/RegisterForm";

export default function Register()
{
    return <div>
        <Navbar/>
        <Heroo title="Registration"/>
        <RegisterForm/>
        <FooterGrad/>
        <Footer/>
    </div>
}