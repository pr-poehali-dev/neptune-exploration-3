import ShaderBackground from "@/components/ShaderBackground"
import HeroContent from "@/components/HeroContent"
import PulsingCircle from "@/components/PulsingCircle"
import Header from "@/components/Header"
import ProductsSection from "@/components/ProductsSection"
import ContactsSection from "@/components/ContactsSection"
import ChatWidget from "@/components/ChatWidget"

const Index = () => {
  return (
    <>
      <ShaderBackground>
        <Header />
        <div className="min-h-screen relative">
          <HeroContent />
          <PulsingCircle />
        </div>
      </ShaderBackground>
      <div className="bg-white/60 dark:bg-zinc-950/80 backdrop-blur-sm">
        <ProductsSection />
        <ContactsSection />
      </div>
      <ChatWidget />
    </>
  )
}

export default Index