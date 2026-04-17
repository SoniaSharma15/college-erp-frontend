import { useState } from "react";
import axios from "../../../services/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.roles[0];

      if (role === "SUPER_ADMIN") {
        navigate("/superadmin");
      } else if (role === "COLLEGE_ADMIN") {
        navigate("/admin");
      }

    } catch (err) {
      console.log(err);  // 👈 ye add karo
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 border rounded w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-2"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={handleChange}
        />

        <button className="w-full bg-blue-500 text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;