import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Hero />
      <Contact />
      <Footer />
    </div>
  );
}