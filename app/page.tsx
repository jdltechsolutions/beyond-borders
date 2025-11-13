import AboutSection from "@/components/About";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/Services";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
    </div>
  );
}
