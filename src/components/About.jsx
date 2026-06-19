function About() {
  return (
    <section className="py-24 px-6 bg-[#F5F2F1]">
      <div className="max-w-7xl mx-auto">

        <p className="uppercase tracking-[0.4em] text-sm text-[#C4AEAD]">
          About InrCircle
        </p>

        <h2 className="mt-8 text-4xl md:text-6xl font-bold leading-tight max-w-5xl">
          More than a brand. A creative collective built around
          culture, creativity and shared experiences.
        </h2>

        <div className="mt-12 grid md:grid-cols-2 gap-12">

          <p className="text-lg leading-relaxed text-black/70">
            InrCircle exists to build community by creating spaces
            where creativity, music and culture thrive through
            curated events, collaborations and meaningful
            connections.
          </p>

          <p className="text-lg leading-relaxed text-black/70">
            From InrCircle Nights to future creative initiatives,
            our goal is simple: bring together people who care
            about culture, expression and community.
          </p>

        </div>

        <div className="mt-24 h-px bg-black/20"></div>

      </div>
    </section>
  );
}

export default About;