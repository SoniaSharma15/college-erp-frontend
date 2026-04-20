import { useState } from "react";
import axios from "../../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Loader2, AlertCircle } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      localStorage.clear();

      const res = await axios.post("/auth/login", form);

      const { token, user } = res.data;

      // 🔥 SAVE
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 🔥 SAFE ROLE EXTRACT
      const role = user?.roles?.[0] || user?.role;

      // 🔥 REDIRECT FIX
      if (role === "SUPER_ADMIN") {
        navigate("/superadmin");
      } else if (role === "COLLEGE_ADMIN") {
        navigate("/admin");
      } else if (role === "FACULTY") {
        navigate("/faculty"); // ✅ FIXED
      } else if (role === "STUDENT") {
        navigate("/student");
      } else {
        navigate("/"); // fallback
      }

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Please enter your details</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 ml-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                name="email"
                type="email"
                required
                className="w-full pl-10 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                name="password"
                type="password"
                required
                className="w-full pl-10 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;