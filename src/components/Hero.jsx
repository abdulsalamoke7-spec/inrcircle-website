import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero-image.png";

function Hero() {
const scrollToCollection = () => {
const section = document.getElementById("featured-collection");

```
if (section) {
  section.scrollIntoView({
    behavior: "smooth",
  });
}
```

};

return ( <section className="relative h-screen overflow-hidden"> <img
     src={heroImage}
     alt="InrCircle Community"
     className="absolute inset-0 w-full h-full object-cover"
   />

```
  <div className="absolute inset-0 bg-black/55" />

  <div className="relative z-10 h-full flex items-center justify-center">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <p className="uppercase tracking-[0.5em] text-sm text-white/70">
        Creative Collective • Abuja
      </p>

      <h1 className="mt-8 text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9]">
        BUILDING COMMUNITY
        <br />
        THROUGH CULTURE
      </h1>

      <p className="mt-8 text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
        InrCircle creates spaces where creativity, music and culture
        thrive through curated experiences, meaningful connections and
        unforgettable moments.
      </p>

      <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/join"
          className="px-10 py-5 bg-white text-black rounded-full font-semibold text-lg hover:scale-105 transition"
        >
          Join the Circle
        </Link>

        <button
          onClick={scrollToCollection}
          className="px-8 py-5 border border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition"
        >
          Featured Collection
        </button>
      </div>

      <p className="mt-6 text-white/60 text-sm">
        Free membership • Community access • Early event updates
      </p>
    </div>
  </div>
</section>

      );
}

export default Hero;
