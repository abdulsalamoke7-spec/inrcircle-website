import nightsImage from "../assets/images/inrcircle-nights.png";

function InrCircleNights() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      <img
        src={nightsImage}
        alt="InrCircle Nights"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 min-h-screen flex items-center">

        <div className="max-w-7xl mx-auto px-6 w-full">

          <p className="uppercase tracking-[0.4em] text-sm text-[#C4AEAD]">
            Signature Experience
          </p>

          <h2 className="mt-8 text-5xl md:text-7xl font-bold text-white leading-tight">
            InrCircle
            <br />
            Nights
          </h2>

          <p className="mt-8 max-w-3xl text-lg text-white/75 leading-relaxed">
            A party night designed around atmosphere, experience and
            community. Every edition is curated to bring together
            creatives, students, music lovers and culture enthusiasts
            in unique spaces across Abuja.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">

            <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:scale-105 transition">
              Coming Soon
            </button>

            <button className="px-8 py-4 border border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition">
              Follow Updates
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default InrCircleNights;