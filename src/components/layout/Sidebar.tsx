import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, GraduationCap, Briefcase, Upload, Map } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = user?.role?.toLowerCase();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive(path)
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-800"
    }`;

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col">
      <h2 className="text-xl font-bold mb-8">Career AI</h2>

      <div className="flex flex-col gap-2">

        {/* 🏫 SCHOOL MENU */}
        {role === "school" && (
          <>
            <Link to="/" className={linkClass("/")}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>

            <Link to="/quiz" className={linkClass("/quiz")}>
              <BookOpen size={18} /> Quiz
            </Link>

            <Link to="/courses" className={linkClass("/courses")}>
              <BookOpen size={18} /> Courses
            </Link>

            <Link to="/colleges" className={linkClass("/colleges")}>
              <GraduationCap size={18} /> Colleges
            </Link>
          </>
        )}

        {/* 🎓 COLLEGE MENU */}
        {role === "college" && (
          <>
            <Link to="/college-dashboard" className={linkClass("/college-dashboard")}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>

            <Link to="/resume" className={linkClass("/resume")}>
              <Upload size={18} /> Resume
            </Link>

            <Link to="/jobs" className={linkClass("/jobs")}>
              <Briefcase size={18} /> Jobs
            </Link>

            <Link to="/roadmap" className={linkClass("/roadmap")}>
              <Map size={18} /> Roadmap
            </Link>
          </>
        )}

      </div>
    </div>
  );
}