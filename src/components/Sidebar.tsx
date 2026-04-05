import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Briefcase,
  Upload,
  Map,
  Brain,
} from "lucide-react";

export default function Sidebar({ role }: { role: string }) {

  const schoolMenu = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Quiz", path: "/quiz", icon: <Brain size={18} /> },
    { name: "Courses", path: "/courses", icon: <BookOpen size={18} /> },
    { name: "Colleges", path: "/colleges", icon: <GraduationCap size={18} /> },
  ];

  const collegeMenu = [
    { name: "Dashboard", path: "/college-dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Skill Quiz", path: "/skill-quiz", icon: <Brain size={18} /> },
    { name: "Resume", path: "/resume", icon: <Upload size={18} /> },
    { name: "Start up ideas", path: "/startup", icon: <Briefcase size={18} /> },
    { name: "Roadmap", path: "/roadmap", icon: <Map size={18} /> },
  ];

  const menu = role === "college" ? collegeMenu : schoolMenu;

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-gray-900 to-black text-white p-5">

      <h1 className="text-2xl font-bold mb-8">Career</h1>

      <div className="space-y-2">
        {menu.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition 
              ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}