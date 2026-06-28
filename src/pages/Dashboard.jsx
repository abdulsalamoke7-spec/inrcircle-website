import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";

import heroImage from "../assets/dashboard/member-hero.webp";
import journalCover from "../assets/journal/journal-cover.webp";
import volunteerBanner from "../assets/volunteer/volunteer-banner.webp";
import eventsBanner from "../assets/events/events-banner.webp";
import collectionsBanner from "../assets/collections/collections-banner.webp";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("inrcircleUser");

    if (!storedUser) {
      navigate("/signin");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");

        const sortedProducts = [
          ...data.filter((product) => product.featured),
          ...data.filter((product) => !product.featured),
        ];

        setProducts(sortedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("/api/events");

        const sortedEvents = [
          ...data.filter((e) => e.featured),
          ...data.filter((e) => !e.featured),
        ];

        setEvents(sortedEvents);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
    fetchEvents();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("inrcircleUser");
    navigate("/");
  };

  const selectTab = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  if (!user) return null;

  const navButtonClass = (tab) =>
    `block w-full text-left px-3 py-2 rounded-lg transition ${
      activeTab === tab
        ? "bg-white text-black"
        : "text-white/50 hover:text-white"
    }`;

  // Helper: format date nicely
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6 md:space-y-8">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <img
                src={heroImage}
                alt="InrCircle"
                className="w-full h-[220px] md:h-[420px] object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl md:text-5xl font-light mb-2">
                Welcome back,
                <br className="md:hidden" /> {user.fullName}
              </h2>

              <p className="text-white/60">Community. Culture. Connection.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl mb-2">Membership</h3>
                <p className="text-white/60">Active Member</p>
              </div>

              <div className="border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl mb-2">Upcoming Events</h3>
                {events.length === 0 ? (
                  <p className="text-white/60">No events scheduled yet.</p>
                ) : (
                  <p className="text-white/60">
                    {events.length} event{events.length !== 1 ? "s" : ""}{" "}
                    coming up.{" "}
                    <button
                      onClick={() => selectTab("events")}
                      className="underline text-white/80 hover:text-white transition"
                    >
                      View all
                    </button>
                  </p>
                )}
              </div>

              <div className="border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl mb-2">Community Access</h3>
                <p className="text-white/60">Enabled</p>
              </div>
            </div>
          </div>
        );

      case "events":
        return (
          <div className="space-y-6">
            <img
              src={eventsBanner}
              alt="Events"
              className="w-full h-[220px] md:h-[350px] object-cover rounded-3xl"
            />

            <h2 className="text-3xl md:text-5xl font-light">Events</h2>

            {events.length === 0 ? (
              <p className="text-white/60">
                Upcoming events, experiences and community gatherings will
                appear here.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="border border-white/10 rounded-3xl overflow-hidden"
                  >
                    {event.eventImage ? (
                      <img
                        src={event.eventImage}
                        alt={event.name}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-white/5 flex items-center justify-center text-white/30 text-sm">
                        No Image
                      </div>
                    )}

                    <div className="p-6">
                      {/* Badges */}
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {event.featured && (
                          <span className="text-xs border border-white px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                        {event.comingSoon && (
                          <span className="text-xs border border-white/40 text-white/60 px-2 py-1 rounded-full">
                            Coming Soon
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-light">{event.name}</h3>

                      {event.venue && (
                        <p className="mt-1 text-white/60">{event.venue}</p>
                      )}

                      {event.comingSoon ? (
                        <p className="mt-2 text-white/40 text-sm">
                          Date to be announced
                        </p>
                      ) : (
                        <p className="mt-2 text-white/50 text-sm">
                          {event.eventDate && formatDate(event.eventDate)}
                          {event.eventTime && ` · ${event.eventTime}`}
                        </p>
                      )}

                      {event.description && (
                        <p className="mt-3 text-white/60 text-sm leading-relaxed line-clamp-3">
                          {event.description}
                        </p>
                      )}

                      <div className="mt-5">
                        {event.ticketLink ? (
                          <a
                            href={event.ticketLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block border border-white px-6 py-2 rounded-full text-sm hover:bg-white hover:text-black transition"
                          >
                            Buy Tickets
                          </a>
                        ) : (
                          <span className="inline-block border border-white/20 text-white/40 px-6 py-2 rounded-full text-sm">
                            Tickets Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "collections":
        return (
          <div className="space-y-6">
            <img
              src={collectionsBanner}
              alt="Collections"
              className="w-full h-[220px] md:h-[350px] object-cover rounded-3xl"
            />

            <div>
              <h2 className="text-3xl md:text-5xl font-light">Collections</h2>

              <p className="text-white/60 mt-3">
                Explore featured pieces from InrCircle.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-white/30 transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover"
                  />

                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl">{product.name}</h3>

                      {product.featured && (
                        <span className="text-xs border border-white px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="text-white/60 mt-2">
                      ₦{Number(product.price).toLocaleString()}
                    </p>

                    <p className="text-white/50 mt-3 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "volunteer":
        return (
          <div className="space-y-6">
            <img
              src={volunteerBanner}
              alt="Volunteer"
              className="w-full h-[220px] md:h-[350px] object-cover rounded-3xl"
            />

            <h2 className="text-3xl md:text-5xl font-light">Volunteer</h2>

            <p className="text-white/60">
              Join the team behind InrCircle events.
            </p>
          </div>
        );

      case "journal":
        return (
          <div className="space-y-6">
            <img
              src={journalCover}
              alt="Inside the Circle"
              className="w-full h-[220px] md:h-[350px] object-cover rounded-3xl"
            />

            <h2 className="text-3xl md:text-5xl font-light">
              Inside the Circle
            </h2>

            <p className="text-white/60">
              Stories, culture, updates and creative perspectives.
            </p>
          </div>
        );

      case "settings":
        return (
          <div>
            <h2 className="text-3xl md:text-5xl font-light mb-6">Settings</h2>

            <div className="border border-white/10 rounded-2xl p-6">
              <p>
                <strong>Name:</strong> {user.fullName}
              </p>

              <p className="mt-2">
                <strong>Username:</strong> {user.username}
              </p>

              <p className="mt-2">
                <strong>Email:</strong> {user.email}
              </p>

              <p className="mt-2">
                <strong>Role:</strong> {user.role}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="md:hidden flex items-center justify-between p-5 border-b border-white/10">
        <h1 className="text-xl font-light">InrCircle</h1>

        <button onClick={() => setSidebarOpen(true)}>
          <FaBars size={22} />
        </button>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-black border-r border-white/10 z-50
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-2xl font-light">InrCircle</h1>

            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => selectTab("home")}
              className={navButtonClass("home")}
            >
              Home
            </button>

            <button
              onClick={() => selectTab("events")}
              className={navButtonClass("events")}
            >
              Events
            </button>

            <button
              onClick={() => selectTab("collections")}
              className={navButtonClass("collections")}
            >
              Collections
            </button>

            <button
              onClick={() => selectTab("volunteer")}
              className={navButtonClass("volunteer")}
            >
              Volunteer
            </button>

            <button
              onClick={() => selectTab("journal")}
              className={navButtonClass("journal")}
            >
              Inside the Circle
            </button>

            <button
              onClick={() => selectTab("settings")}
              className={navButtonClass("settings")}
            >
              Settings
            </button>
          </nav>

          <div className="mt-auto">
            <p className="text-sm text-white/50">Signed in as</p>

            <p className="mt-1">@{user.username}</p>

            <button
              onClick={logoutHandler}
              className="mt-6 border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="md:ml-72 p-5 md:p-10">{renderContent()}</main>
    </div>
  );
}

export default Dashboard;
