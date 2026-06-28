import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "/api/auth/login",
        formData
      );

      localStorage.setItem(
        "inrcircleUser",
        JSON.stringify(data)
      );

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid credentials"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-light mb-2">
          Welcome Back
        </h1>

        <p className="text-white/60 mb-8">
          Sign in to your account.
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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-white/60">
          New here?{" "}
          <Link
            to="/join"
            className="text-white"
          >
            Join the InrCircle
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;