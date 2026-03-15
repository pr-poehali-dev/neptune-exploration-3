import ShaderBackground from "@/components/ShaderBackground"
import HeroContent from "@/components/HeroContent"
import PulsingCircle from "@/components/PulsingCircle"
import Header from "@/components/Header"
import ProductsSection from "@/components/ProductsSection"
import ContactsSection from "@/components/ContactsSection"

const Index = () => {
  return (
    <ShaderBackground>
      <Header />
      <div className="min-h-screen relative">
        <HeroContent />
        <PulsingCircle />
      </div>
      <ProductsSection />
      <ContactsSection />
    </ShaderBackground>
  )
}

export default Index