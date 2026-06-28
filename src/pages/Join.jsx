import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Join() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    dateOfBirth: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        formData
      );

      localStorage.setItem(
        "inrcircleUser",
        JSON.stringify(data)
      );

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-light mb-2">
          Join the InrCircle
        </h1>

        <p className="text-white/60 mb-8">
          Become part of the community.
        </p>

        {error && (
          <div className="mb-4 border border-red-500 p-3 rounded">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-white/20 rounded"
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-white/20 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-white/20 rounded"
            required
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number (Optional)"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-white/20 rounded"
          />

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-white/20 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-white/20 rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black rounded"
          >
            {loading
              ? "Creating Account..."
              : "Join the InrCircle"}
          </button>
        </form>

        <p className="mt-6 text-white/60">
          Already a member?{" "}
          <Link
            to="/signin"
            className="text-white"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Join;