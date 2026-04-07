import { motion } from "framer-motion";
import {
  Brain,
  BookOpen,
  School,
  Upload,
  TrendingUp,
  User,
  Target,
  Award,
  BarChart3,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = user?.role?.toLowerCase();

  const [showProfile, setShowProfile] = useState(false);

  // 🔥 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 🚀 NAVIGATION HANDLER
  const handleNavigate = (title: string) => {
    if (title === "Take Quiz") navigate("/quiz");
    if (title === "Explore Courses") navigate("/courses");
    if (title === "Find Colleges") navigate("/colleges");
    if (title === "Upload Resume") navigate("/resume");
    if (title === "Skill Analysis") navigate("/skill-quiz");
    if (title === "Roadmap") navigate("/roadmap");
    
    if (title === "Startup Ideas") navigate("/startup");
  };

  const cards =
    role === "school"
      ? [
          { title: "Take Quiz", icon: <Brain />, color: "from-blue-500 to-indigo-600" },
          { title: "Explore Courses", icon: <BookOpen />, color: "from-green-500 to-emerald-600" },
          { title: "Find Colleges", icon: <School />, color: "from-purple-500 to-pink-600" },
        ]
      : [
          { title: "Upload Resume", icon: <Upload />, color: "from-blue-500 to-purple-600" },
          { title: "Skill Analysis", icon: <Brain />, color: "from-indigo-500 to-purple-600" },
          { title: "Find Jobs", icon: <TrendingUp />, color: "from-pink-500 to-red-500" },
          { title: "Startup Ideas", icon: <BookOpen />, color: "from-blue-400 to-purple-600" },
        ];

  return (
    <div className="space-y-10">

      {/* 🔥 HERO SECTION */}
      <div className="relative rounded-3xl p-8 bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-xl">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-lg"></div>

        <div className="relative z-10 flex justify-between items-center flex-wrap gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome {user?.name || "Student"} 👋
            </h1>
            <p className="text-white/80">
              Your personalized career guidance platform 🚀
            </p>
          </div>

          {/* PROFILE */}
          <div className="relative">
            <div
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-xl cursor-pointer"
            >
              <User />
              <span className="font-semibold">
                {role === "college" ? "" : ""}
              </span>
            </div>

            {showProfile && (
             <div className="absolute right-0 mt-2 bg-white text-black rounded-xl shadow-lg p-4 w-64 z-50">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <p className="text-xs mt-1 capitalize">{user?.role}</p>

                <button
                  onClick={handleLogout}
                  className="mt-3 flex items-center gap-2 text-red-500 hover:text-red-600"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🌐 ABOUT PLATFORM */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-3">About This Platform 🚀</h2>
        <p className="text-gray-600">
          This AI-powered career guidance platform helps students explore the right
          career paths based on their interests and skills. You can discover courses,
          find top colleges, analyze your skills, and plan your future step by step.
        </p>

        <ul className="mt-4 space-y-2 text-gray-600">
          <li>🎯 Personalized career recommendations</li>
          <li>📚 Explore 100+ courses across streams</li>
          <li>🏫 Find top colleges </li>
          <li>📈 Track your progress & growth</li>
        </ul>
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          // { label: "Courses Viewed", value: "12", icon: <BookOpen /> },
          { label: "Skills Learned", value: user?.skills?.length || "0", icon: <Award /> },
          { label: "Interests", value: user?.interests?.length || "0", icon: <Target /> },
          // { label: "Opportunities", value: "24", icon: <TrendingUp /> },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <h2 className="text-xl font-bold">{stat.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🚀 ACTION CARDS */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ scale: 1.07 }}
              onClick={() => handleNavigate(card.title)}
              className={`relative p-6 rounded-2xl text-white shadow-lg cursor-pointer bg-gradient-to-r ${card.color} overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition"></div>

              <div className="relative z-10">
                <div className="mb-4">{card.icon}</div>
                <h2 className="text-lg font-semibold">{card.title}</h2>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 📈 PROGRESS */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 /> Your Progress
        </h2>

        <div className="space-y-4">
          {[
            { name: "Career Exploration", value: 70 },
            { name: "Skill Development", value: 50 },
            { name: "Job Readiness", value: 30 },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.name}</span>
                <span>{item.value}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 📊 INSIGHTS + ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* INSIGHTS */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp /> Career Insights
          </h2>

          <ul className="space-y-3 text-gray-600">
            <li>🔥 AI & Data Science booming</li>
            <li>💻 Software jobs high demand</li>
            <li>🏥 Healthcare stable growth</li>
            <li>📊 Business & Finance rising</li>
          </ul>
        </div>

        {/* ACTIVITY */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Recent Activity
          </h2>

          <ul className="space-y-3 text-gray-600">
            <li>✔ Logged in</li>
            <li>✔ Viewed Courses</li>
            <li>✔ Checked Colleges</li>
            <li>✔ Exploring Career Paths</li>
          </ul>
        </div>
      </div>

    </div>
  );
}
