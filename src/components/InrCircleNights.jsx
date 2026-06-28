import { useEffect, useState } from "react";
import axios from "axios";
import nightsImage from "../assets/images/inrcircle-nights.webp";

function InrCircleNights() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("/api/events");
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <section
      id="inrcircle-nights"
      className="relative min-h-screen overflow-hidden"
    >
      <img
        src={nightsImage}
        alt="InrCircle Nights"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full py-24">
          <p className="uppercase tracking-[0.4em] text-sm text-[#C4AEAD]">
            Signature Experience
          </p>

          <h2 className="mt-8 text-5xl md:text-7xl font-bold text-white leading-tight">
            InrCircle
            <br />
            Nights
          </h2>

          <p className="mt-8 max-w-3xl text-lg text-white/75 leading-relaxed">
            A party night designed around atmosphere, experience and community.
            Every edition is curated to bring together creatives, students,
            music lovers and culture enthusiasts in unique spaces across Abuja.
          </p>

          {/* Events */}
          {events.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="border border-white/20 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm"
                >
                  {event.eventImage && (
                    <img
                      src={event.eventImage}
                      alt={event.name}
                      className="w-full h-48 object-cover"
                    />
                  )}

                  <div className="p-5">
                    {/* Badges */}
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {event.featured && (
                        <span className="text-xs border border-white/60 text-white/80 px-2 py-0.5 rounded-full">
                          Featured
                        </span>
                      )}
                      {event.comingSoon && (
                        <span className="text-xs border border-[#C4AEAD] text-[#C4AEAD] px-2 py-0.5 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-white">
                      {event.name}
                    </h3>

                    {event.venue && (
                      <p className="mt-1 text-white/60 text-sm">{event.venue}</p>
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

                    <div className="mt-4">
                      {event.ticketLink ? (
                        <a
                          href={event.ticketLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:scale-105 transition"
                        >
                          Buy Tickets
                        </a>
                      ) : (
                        <span className="inline-block px-6 py-2 border border-white/30 text-white/50 rounded-full text-sm">
                          Tickets Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* No events yet — show original CTA */
            <div className="mt-12 flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:scale-105 transition">
                Coming Soon
              </button>

              <a
                href="https://instagram.com/inrcircle.ng"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 border border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition"
              >
                Follow Updates
              </a>
            </div>
          )}

          {/* Always show Follow Updates when events exist */}
          {events.length > 0 && (
            <div className="mt-8">
              <a
                href="https://instagram.com/inrcircle.ng"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 border border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition inline-block"
              >
                Follow Updates
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default InrCircleNights;
