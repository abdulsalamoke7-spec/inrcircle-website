import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Admin() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    instagramLink: "",
    category: "",
    featured: false,
  });

  const [eventForm, setEventForm] = useState({
    name: "",
    description: "",
    eventImage: "",
    venue: "",
    eventDate: "",
    eventTime: "",
    comingSoon: false,
    ticketLink: "",
    featured: false,
  });

  const [eventImagePreview, setEventImagePreview] = useState("");
  const eventFileInputRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("inrcircleUser");

    if (!storedUser) {
      navigate("/signin");
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser.role !== "admin") {
      navigate("/dashboard");
      return;
    }

    setUser(parsedUser);

    fetchProducts();
    fetchEvents();
  }, [navigate]);

  // ─── Products ────────────────────────────────────────────────────────────────

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (file) => {
    try {
      setUploading(true);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        try {
          const { data } = await axios.post("/api/upload", {
            image: reader.result,
          });

          setProductForm((prev) => ({ ...prev, image: data.imageUrl }));
          setImagePreview(data.imageUrl);
          alert("Image uploaded successfully");
        } catch (error) {
          console.log(error);
          alert("Upload failed");
        }

        setUploading(false);
      };
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProductForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const createProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/products", productForm);

      setProductForm({
        name: "",
        description: "",
        price: "",
        image: "",
        instagramLink: "",
        category: "",
        featured: false,
      });

      setImagePreview("");
      fetchProducts();
      alert("Product Added");
    } catch (error) {
      console.log(error);
      alert("Failed to create product");
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
  };

  // ─── Events ──────────────────────────────────────────────────────────────────

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get("/api/events");
      setEvents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadEventImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      try {
        const { data } = await axios.post("/api/upload", {
          image: reader.result,
        });

        setEventForm((prev) => ({ ...prev, eventImage: data.imageUrl }));
        setEventImagePreview(data.imageUrl);
      } catch (error) {
        console.log(error);
        alert("Event image upload failed");
      }
    };
  };

  const createEvent = async () => {
    try {
      await axios.post("/api/events", eventForm);

      setEventForm({
        name: "",
        description: "",
        eventImage: "",
        venue: "",
        eventDate: "",
        eventTime: "",
        comingSoon: false,
        ticketLink: "",
        featured: false,
      });

      setEventImagePreview("");
      if (eventFileInputRef.current) eventFileInputRef.current.value = "";
      fetchEvents();
      alert("Event Created");
    } catch (error) {
      console.log(error);
      alert("Failed to create event");
    }
  };

  const deleteEvent = async (id) => {
    const confirmDelete = window.confirm("Delete this event?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.log(error);
      alert("Failed to delete event");
    }
  };

  // ─── UI Helpers ──────────────────────────────────────────────────────────────

  if (!user) return null;

  const navClass = (tab) =>
    `block w-full text-left px-3 py-2 rounded-lg transition ${
      activeTab === tab
        ? "bg-white text-black"
        : "text-white/50 hover:text-white"
    }`;

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="grid md:grid-cols-4 gap-6">
            <div className="border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg mb-2">Products</h3>
              <p className="text-4xl">{products.length}</p>
            </div>

            <div className="border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg mb-2">Events</h3>
              <p className="text-4xl">{events.length}</p>
            </div>
          </div>
        );

      case "products":
        return (
          <div className="space-y-10">
            <div className="border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl mb-6">Add Product</h2>

              <form onSubmit={createProduct} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={productForm.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-black border border-white/20 rounded"
                  required
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  value={productForm.description}
                  onChange={handleChange}
                  className="w-full p-3 bg-black border border-white/20 rounded"
                  rows="4"
                  required
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={productForm.price}
                  onChange={handleChange}
                  className="w-full p-3 bg-black border border-white/20 rounded"
                  required
                />

                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="border border-white px-5 py-3 rounded-xl"
                  >
                    {uploading ? "Uploading..." : "Choose Image"}
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadImage(file);
                    }}
                  />

                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl border border-white/10"
                    />
                  )}
                </div>

                <input
                  type="text"
                  name="instagramLink"
                  placeholder="Instagram Post Link"
                  value={productForm.instagramLink}
                  onChange={handleChange}
                  className="w-full p-3 bg-black border border-white/20 rounded"
                  required
                />

                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={productForm.category}
                  onChange={handleChange}
                  className="w-full p-3 bg-black border border-white/20 rounded"
                />

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={productForm.featured}
                    onChange={handleChange}
                  />
                  Featured Product
                </label>

                <button
                  type="submit"
                  disabled={uploading || !productForm.image}
                  className="bg-white text-black px-6 py-3 rounded-xl disabled:opacity-40"
                >
                  {uploading ? "Uploading..." : "Add Product"}
                </button>
              </form>
            </div>

            <div className="border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl mb-6">Existing Products</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="border border-white/10 rounded-2xl overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
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

                      <p className="mt-2 text-white/60">₦{product.price}</p>
                      <p className="mt-2 text-white/50">{product.category}</p>

                      <div className="mt-5 flex gap-3">
                        <a
                          href={product.instagramLink}
                          target="_blank"
                          rel="noreferrer"
                          className="border border-white px-4 py-2 rounded-lg"
                        >
                          Instagram
                        </a>

                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="border border-red-500 text-red-500 px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "events":
        return (
          <div className="space-y-10">
            {/* ── Add Event Form ─────────────────────────────────────────── */}
            <div className="border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl mb-6">Add Event</h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Event Name"
                  value={eventForm.name}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, name: e.target.value })
                  }
                  className="w-full p-3 bg-black border border-white/20 rounded"
                />

                <textarea
                  placeholder="Description"
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, description: e.target.value })
                  }
                  rows="4"
                  className="w-full p-3 bg-black border border-white/20 rounded"
                />

                {/* Image Upload */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => eventFileInputRef.current.click()}
                    className="border border-white px-5 py-3 rounded-xl"
                  >
                    Choose Event Image
                  </button>

                  <input
                    ref={eventFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={uploadEventImage}
                  />

                  {eventImagePreview && (
                    <img
                      src={eventImagePreview}
                      alt="Event Preview"
                      className="w-full h-64 object-cover rounded-xl border border-white/10"
                    />
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Venue"
                  value={eventForm.venue}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, venue: e.target.value })
                  }
                  className="w-full p-3 bg-black border border-white/20 rounded"
                />

                <input
                  type="url"
                  placeholder="Ticket Link (optional)"
                  value={eventForm.ticketLink}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, ticketLink: e.target.value })
                  }
                  className="w-full p-3 bg-black border border-white/20 rounded"
                />

                {/* Date & Time — hidden when Coming Soon */}
                {!eventForm.comingSoon && (
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={eventForm.eventDate}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, eventDate: e.target.value })
                      }
                      className="w-full p-3 bg-black border border-white/20 rounded"
                    />

                    <input
                      type="time"
                      value={eventForm.eventTime}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, eventTime: e.target.value })
                      }
                      className="w-full p-3 bg-black border border-white/20 rounded"
                    />
                  </div>
                )}

                {/* Checkboxes */}
                <div className="flex items-center gap-8 pt-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={eventForm.comingSoon}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          comingSoon: e.target.checked,
                          eventDate: e.target.checked ? "" : eventForm.eventDate,
                          eventTime: e.target.checked ? "" : eventForm.eventTime,
                        })
                      }
                    />
                    Coming Soon
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={eventForm.featured}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, featured: e.target.checked })
                      }
                    />
                    Featured
                  </label>
                </div>

                <button
                  onClick={createEvent}
                  disabled={!eventForm.name}
                  className="bg-white text-black px-6 py-3 rounded-xl disabled:opacity-40"
                >
                  Create Event
                </button>
              </div>
            </div>

            {/* ── Existing Events ────────────────────────────────────────── */}
            <div className="border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl mb-6">Existing Events</h2>

              {events.length === 0 ? (
                <p className="text-white/40">No events yet.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {events.map((event) => (
                    <div
                      key={event._id}
                      className="border border-white/10 rounded-2xl overflow-hidden"
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

                      <div className="p-5">
                        {/* Badges */}
                        <div className="flex gap-2 mb-3 flex-wrap">
                          {event.featured && (
                            <span className="text-xs border border-white px-2 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                          {event.comingSoon && (
                            <span className="text-xs border border-yellow-400 text-yellow-400 px-2 py-1 rounded-full">
                              Coming Soon
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl">{event.name}</h3>

                        {event.venue && (
                          <p className="mt-1 text-white/60">{event.venue}</p>
                        )}

                        {event.comingSoon ? (
                          <p className="mt-1 text-yellow-400/80 text-sm">
                            Date TBC
                          </p>
                        ) : (
                          <p className="mt-1 text-white/50 text-sm">
                            {event.eventDate && (
                              <span>
                                {new Date(event.eventDate).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            )}
                            {event.eventTime && (
                              <span> · {event.eventTime}</span>
                            )}
                          </p>
                        )}

                        <p className="mt-2 text-white/40 text-xs">
                          {event.ticketLink ? (
                            <a
                              href={event.ticketLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-white/60 underline"
                            >
                              Ticket link set
                            </a>
                          ) : (
                            "Tickets Coming Soon"
                          )}
                        </p>

                        <div className="mt-5">
                          <button
                            onClick={() => deleteEvent(event._id)}
                            className="border border-red-500 text-red-500 px-4 py-2 rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="border border-white/10 rounded-2xl p-6">
            <p className="text-white/60">Coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-72 border-r border-white/10 p-6">
        <h1 className="text-2xl font-light mb-10">InrCircle Admin</h1>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={navClass("overview")}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={navClass("products")}
          >
            Products
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={navClass("users")}
          >
            Users
          </button>

          <button
            onClick={() => setActiveTab("events")}
            className={navClass("events")}
          >
            Events
          </button>

          <button
            onClick={() => setActiveTab("volunteers")}
            className={navClass("volunteers")}
          >
            Volunteers
          </button>

          <button
            onClick={() => setActiveTab("journal")}
            className={navClass("journal")}
          >
            Journal
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        <h1 className="text-5xl font-light mb-8">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h1>

        {renderContent()}
      </main>
    </div>
  );
}

export default Admin;
