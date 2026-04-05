import { useState } from "react";
import { loginUser } from "../services/authService";
import { GraduationCap, Sparkles } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

const handleLogin = async () => {
  try {
    const res = await loginUser(form);

    console.log("LOGIN RESPONSE:", res);
localStorage.setItem("user", JSON.stringify(res.user));
localStorage.setItem("token", res.token);
    alert("Login Successful!");

    const role = res.user.role;

    if (role === "college") {
      navigate("/college-dashboard");
    } else if (role === "student") {
      navigate("/dashboard");
    } else if (role === "school") {
      navigate("/"); // or school dashboard if you have one
    } else if (role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/");
    }

  } catch (err: any) {
    alert(err.response?.data?.msg || "Login failed");
  }
};

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT DESIGN */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-purple-700 text-white p-10">
        <GraduationCap size={60} className="mb-6" />

        <h1 className="text-4xl font-bold mb-4 text-center">
          Welcome Back 🎓
        </h1>

        <p className="text-lg text-center max-w-md">
          Continue your journey and explore opportunities tailored for you.
        </p>

        <Sparkles size={30} className="mt-8" />
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Login
          </h2>

          {/* EMAIL */}
          <input
            className="w-full mb-3 p-3 border rounded-lg"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* PASSWORD */}
          <input
            type="password"
            className="w-full mb-6 p-3 border rounded-lg"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

          {/* REGISTER LINK */}
          <p className="text-center mt-4 text-gray-500">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}