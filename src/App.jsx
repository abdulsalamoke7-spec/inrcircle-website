import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Pillars from "./components/Pillars";
import InrCircleNights from "./components/InrCircleNights";
import FeaturedCollection from "./components/FeaturedCollection";
import Footer from "./components/Footer";
import SEO from "./components/SEO";

import Join from "./pages/Join";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ProductPage from "./pages/ProductPage";

function HomePage() {
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

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/join"
        element={<Join />}
      />

      <Route
        path="/signin"
        element={<SignIn />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/admin"
        element={<Admin />}
      />

      <Route
        path="/product/:id"
        element={<ProductPage />}
      />
    </Routes>
  );
}

export default App;
