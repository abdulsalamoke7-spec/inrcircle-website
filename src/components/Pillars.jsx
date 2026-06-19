function Pillars() {
  return (
    <section className="pt-16 pb-24 px-6 bg-[#F5F2F1]">
      <div className="max-w-7xl mx-auto">

        <p className="uppercase tracking-[0.4em] text-sm text-[#C4AEAD]">
          Our Pillars
        </p>

        <h2 className="mt-8 text-4xl md:text-5xl font-bold">
          Built Around Three Ideas
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-20">

          <div className="bg-[#111111] rounded-3xl p-10 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
            <h3 className="text-3xl font-bold text-white">
              Culture
            </h3>

            <p className="mt-6 text-white/70 leading-relaxed">
              Curated experiences that bring people together through
              music, fashion and shared moments.
            </p>
          </div>

          <div className="bg-[#111111] rounded-3xl p-10 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
            <h3 className="text-3xl font-bold text-white">
              Community
            </h3>

            <p className="mt-6 text-white/70 leading-relaxed">
              Building meaningful relationships and creating spaces
              where people genuinely belong.
            </p>
          </div>

          <div className="bg-[#111111] rounded-3xl p-10 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
            <h3 className="text-3xl font-bold text-white">
              Creativity
            </h3>

            <p className="mt-6 text-white/70 leading-relaxed">
              Providing opportunities for expression, collaboration
              and creative growth.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Pillars;