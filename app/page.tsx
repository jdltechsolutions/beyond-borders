import AboutSection from "@/components/About";
import Ourclients from "@/components/Clients";
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
      <Ourclients />
    </div>
  );
}
