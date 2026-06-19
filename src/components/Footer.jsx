import {
  FaInstagram,
  FaTiktok,
  FaSnapchatGhost,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#111111] text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 gap-16">

          <div>

            <p className="uppercase tracking-[0.4em] text-sm text-[#C4AEAD]">
              InrCircle
            </p>

            <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
              Building Community
              <br />
              Through Culture.
            </h2>

            <p className="mt-6 text-white/60 max-w-md leading-relaxed">
              A creative collective creating spaces where music,
              culture and creativity thrive through curated
              experiences, meaningful connections and unforgettable
              moments.
            </p>

          </div>

          <div className="flex flex-col md:items-end">

            <div>

              <p className="uppercase tracking-[0.3em] text-sm text-white/40">
                Connect
              </p>

              <div className="flex gap-6 mt-8 text-2xl">

                <a
                  href="https://instagram.com/inrcircle.ng"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#C4AEAD] transition"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://www.tiktok.com/@inrcircle?_r=1&_t=ZS-97B4GFeNdAa"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#C4AEAD] transition"
                >
                  <FaTiktok />
                </a>

                <a
                  href="https://snapchat.com/t/SUMBFU4B"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#C4AEAD] transition"
                >
                  <FaSnapchatGhost />
                </a>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-20 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-white/40">

          <p>
            © 2026 InrCircle. All rights reserved.
          </p>

          <p>
            Abuja, Nigeria
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;