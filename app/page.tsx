import AboutSection from "@/components/About";
import Ourclients from "@/components/Clients";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PhotoGallery from "@/components/Photos";
import ServicesSection from "@/components/Services";
import SignupSection from "@/components/SignupSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <Ourclients />
      <PhotoGallery />
      <SignupSection />
    </div>
  );
}
