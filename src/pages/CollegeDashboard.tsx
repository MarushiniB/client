import { motion } from "framer-motion";
import {
  Upload,
  Brain,
  TrendingUp,
  BookOpen,
  Award,
  BarChart3,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CollegeDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleNavigate = (title: string) => {
    if (title === "Upload Resume") navigate("/resume");
    if (title === "Skill Analysis") navigate("/skill-quiz");
    if (title === "Roadmap") navigate("/roadmap");
    if (title === "Startup Ideas") navigate("/startup");
  };

  const actions = [
    { title: "Upload Resume", icon: <Upload />, color: "from-blue-500 to-purple-600" },
    { title: "Skill Analysis", icon: <Brain />, color: "from-indigo-500 to-purple-600" },
    { title: "Roadmap", icon: <TrendingUp />, color: "from-pink-500 to-red-500" },
    { title: "Startup Ideas", icon: <BookOpen />, color: "from-blue-400 to-purple-600" },
  ];

  const skills = user?.skills || ["React", "Python"];
  const interests = user?.interests || ["AI", "Finance"];

  return (
    <div className="space-y-10">

      {/* 🔥 HERO */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold mb-2">
          Welcome {user?.name || "Student"} 🎓
        </h1>
        <p className="text-white/80">
          Upgrade your skills, explore jobs & build your future 🚀
        </p>
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Skills", value: skills.length, icon: <Award />, key: "skills" },
          { label: "Interests", value: interests.length, icon: <Target />, key: "interests" },
          // { label: "Jobs Applied", value: "5", icon: <TrendingUp />, key: "jobs" },
          // { label: "Progress", value: "65%", icon: <BarChart3 />, key: "progress" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveModal(stat.key)}
            className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4 cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 text-white">
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <h2 className="text-xl font-bold">{stat.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🚀 QUICK ACTIONS */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ scale: 1.07 }}
              onClick={() => handleNavigate(card.title)}
              className={`p-6 rounded-2xl text-white shadow-lg cursor-pointer bg-gradient-to-r ${card.color}`}
            >
              <div className="mb-4">{card.icon}</div>
              <h2 className="text-lg font-semibold">{card.title}</h2>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 💡 SKILLS SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          🚀 Skills You Can Learn
        </h2>

        <div className="flex flex-wrap gap-2">
          {[
            "Python",
            "Java",
            "React",
            "Node.js",
            "SQL",
            "Machine Learning",
            "Excel",
            "Data Analysis",
          ].map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* 💼 JOB ROLES */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          💼 Popular Job Roles
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            "Data Scientist",
            "Web Developer",
            "AI Engineer",
            "Business Analyst",
          ].map((job, i) => (
            <div
              key={i}
              className="p-4 border rounded-xl hover:bg-purple-50 transition"
            >
              {job}
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 ENTREPRENEUR */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          🚀 Entrepreneurship
        </h2>

        <ul className="space-y-2 text-gray-600">
          <li>✔ Smart India Hackathon</li>
          <li>✔ Startup India</li>
          <li>✔ College E-Cell Events</li>
        </ul>
      </div>

      {/* 📘 EXAMS */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          📘 Exams & Opportunities
        </h2>

        <ul className="space-y-2 text-gray-600">
          <li>✔ TCS NQT</li>
          <li>✔ Infosys Certification</li>
          <li>✔ Government Exams</li>
        </ul>
      </div>

      {/* 🔥 MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-2 right-3 text-gray-500"
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4 capitalize">
              {activeModal}
            </h2>

            {activeModal === "skills" && (
              <div className="flex flex-wrap gap-2">
                {skills.map((s: string, i: number) => (
                  <span key={i} className="bg-purple-100 px-3 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            )}

            {activeModal === "interests" && (
              <div className="flex flex-wrap gap-2">
                {interests.map((s: string, i: number) => (
                  <span key={i} className="bg-green-100 px-3 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            )}

            {activeModal === "jobs" && <p>Applied to 5 jobs 🚀</p>}
            {activeModal === "progress" && <p>You are 65% career ready 🎯</p>}
          </div>
        </div>
      )}

    </div>
  );
}
