import logo from "../assets/logos/InrCircleLogo.png";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">

      <div className="backdrop-blur-md bg-black/5">

        <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">

          <img
            src={logo}
            alt="InrCircle"
            className="h-12"
          />

          <button className="border border-white px-5 py-2 rounded-full text-sm text-white hover:bg-white hover:text-black transition">
            InrCircle Nights
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;