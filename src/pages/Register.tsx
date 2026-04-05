import { useState } from "react";
import { registerUser } from "../services/authService";
import { GraduationCap, Sparkles } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "school",
  });

const handleRegister = async () => {
  try {
    const res = await registerUser(form);

    console.log("REGISTER RESPONSE:", res);  // 🔥 ADD THIS

    localStorage.setItem("user", JSON.stringify(res.user));
    localStorage.setItem("token", res.token);

    alert("Registered Successfully!");

    if (res.user.role === "school") {
      navigate("/");
    } else {
      navigate("/college-dashboard");
    }

  } catch (err: any) {
    alert(err.response?.data?.msg || "Registration failed");
  }
};

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT DESIGN */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-blue-700 text-white p-10">
        <GraduationCap size={60} className="mb-6" />

        <h1 className="text-4xl font-bold mb-4 text-center">
          Start Your Journey 🚀
        </h1>

        <p className="text-lg text-center max-w-md">
          Join the platform and explore courses, careers, and opportunities.
        </p>

        <Sparkles size={30} className="mt-8" />
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Create Account
          </h2>

          {/* NAME */}
          <input
            className="w-full mb-3 p-3 border rounded-lg"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

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
            className="w-full mb-4 p-3 border rounded-lg"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* ROLE SELECT (FIXED) */}
          <select
            value={form.role} // ✅ IMPORTANT FIX
            className="w-full mb-6 p-3 border rounded-lg"
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="school">School Student</option>
            <option value="college">College Student</option>
          </select>

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Register
          </button>

          {/* LOGIN LINK */}
          <p className="text-center mt-4 text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}