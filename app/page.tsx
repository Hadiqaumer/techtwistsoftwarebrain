import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Modules, Wall } from "@/components/Modules";
import { About } from "@/components/About";
import { Control, Faq, ItSolutions, Process, Testimonials, Why } from "@/components/Sections";
import Contact from "@/components/Contact";
import Cta from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top">
      <Navbar />
      <main id="main">
        <Hero />
        <About/>
        <Modules />
        <Wall />
        <Why />
        <Control />
        <ItSolutions />
        <Cta />
        <Process />
        {/* <Testimonials /> */}
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
