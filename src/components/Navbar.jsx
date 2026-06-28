import { Link } from "react-router-dom";
import logo from "../assets/logos/InrCircleLogo.png";

function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("inrcircleUser")
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="backdrop-blur-md bg-black/5">
        <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
          <img
            src={logo}
            alt="InrCircle"
            className="h-12 cursor-pointer"
            onClick={scrollToTop}
          />

          {!user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/signin"
                className="border border-white px-5 py-2 rounded-full text-sm text-white hover:bg-white hover:text-black transition"
              >
                Sign In
              </Link>

              <Link
                to="/join"
                className="bg-white text-black px-5 py-2 rounded-full text-sm hover:opacity-90 transition"
              >
                Join
              </Link>
            </div>
          ) : user.role === "admin" ? (
            <Link
              to="/admin"
              className="border border-white px-5 py-2 rounded-full text-sm text-white hover:bg-white hover:text-black transition"
            >
              Admin Dashboard
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="border border-white px-5 py-2 rounded-full text-sm text-white hover:bg-white hover:text-black transition"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;