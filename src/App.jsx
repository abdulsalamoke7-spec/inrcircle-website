import SEO from "./components/SEO";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Pillars from "./components/Pillars";
import InrCircleNights from "./components/InrCircleNights";
import FeaturedCollection from "./components/FeaturedCollection";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <SEO />

      <Navbar />
      <Hero />
      <About />
      <Pillars />
      <InrCircleNights />
      <FeaturedCollection />
      <Footer />
    </>
  );
}

export default App;