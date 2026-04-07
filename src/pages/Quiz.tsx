import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Brain,
  TrendingUp,
  BookOpen,
  Award,
  Target,
  User,
  LogOut,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

type Scores = {
  engineering: number;
  medicine: number;
  arts: number;
  commerce: number;
  science: number;
};

const questions = [
  { question: "Do you enjoy solving logical problems?", type: "engineering" },
  { question: "Are you interested in healthcare?", type: "medicine" },
  { question: "Do you like creativity (design/writing)?", type: "arts" },
  { question: "Do you enjoy business & finance?", type: "commerce" },
  { question: "Do you like science experiments?", type: "science" },
  { question: "Do you enjoy coding?", type: "engineering" },
  { question: "Do you like helping people medically?", type: "medicine" },
  { question: "Do you like analyzing data?", type: "science" },
];

const skillOptions = ["Java", "Python", "Design", "Communication", "Leadership"];
const interestOptions = ["AI", "Business", "Healthcare", "Design", "Finance"];

export default function CollegeDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [showProfile, setShowProfile] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Quiz states
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>({
    engineering: 0,
    medicine: 0,
    arts: 0,
    commerce: 0,
    science: 0,
  });

  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [customSkill, setCustomSkill] = useState("");
  const [customInterest, setCustomInterest] = useState("");

  // Profile logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Quiz handling
  const handleAnswer = (type: keyof Scores) => {
    setScores({ ...scores, [type]: scores[type] + 1 });
    setStep(step + 1);
  };

  const toggleItem = (item: string, list: string[], setList: any) => {
    if (!item) return;
    if (list.includes(item)) setList(list.filter((i) => i !== item));
    else setList([...list, item]);
  };

  const getResult = () => Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

  const saveProfile = async () => {
    try {
      await API.put("/auth/profile", { skills, interests });
      const oldUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...oldUser, skills, interests }));
    } catch (err) {
      console.error("Error saving profile", err);
    }
  };

  // 🚀 Handle Quick Actions navigation
  const actions = [
    { title: "Upload Resume", icon: <Upload />, color: "from-blue-500 to-purple-600", route: "/resume" },
    { title: "Skill Analysis", icon: <Brain />, color: "from-indigo-500 to-purple-600", route: "/skill-quiz" },
    { title: "Roadmap", icon: <TrendingUp />, color: "from-pink-500 to-red-500", route: "/roadmap" },
    { title: "Startup Ideas", icon: <BookOpen />, color: "from-blue-400 to-purple-600", route: "/startup" },
  ];

  // ------------------- RENDER QUIZ RESULT -------------------
  if (step > questions.length) {
    const result = getResult();
    useEffect(() => {
      saveProfile();
    }, []);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200 p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl w-full space-y-6">
          <h1 className="text-3xl font-bold text-center">🎯 Your Career Path</h1>
          <p className="text-center text-xl">
            Best Stream:
            <span className="text-blue-600 font-bold ml-2 capitalize">{result}</span>
          </p>

          <div>
            <h2 className="font-semibold mb-2">🛠 Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="bg-blue-100 px-3 py-1 rounded-full">{s}</span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">🎯 Interests</h2>
            <div className="flex flex-wrap gap-2">
              {interests.map((s, i) => (
                <span key={i} className="bg-green-100 px-3 py-1 rounded-full">{s}</span>
              ))}
            </div>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Restart 🔄
          </button>
        </div>
      </div>
    );
  }

  // ------------------- RENDER QUESTIONS -------------------
  if (step < questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-xl">
          <p className="text-sm text-gray-500 mb-2">
            Question {step + 1} / {questions.length}
          </p>
          <h1 className="text-2xl font-bold mb-6">{questions[step].question}</h1>

          <div className="space-y-4">
            <button
              onClick={() => handleAnswer(questions[step].type as keyof Scores)}
              className="w-full p-4 bg-blue-500 text-white rounded-xl"
            >
              Yes
            </button>

            <button
              onClick={() => setStep(step + 1)}
              className="w-full p-4 bg-gray-200 rounded-xl"
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ------------------- RENDER SKILLS/INTEREST SELECTION -------------------
  return (
    <div className="space-y-10 p-6">

      {/* HERO + PROFILE */}
      <div className="relative rounded-3xl p-8 bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-xl flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Welcome {user?.name || "Student"} 🎓
          </h1>
          <p className="text-white/80">
            Upgrade your skills & explore your future 🚀
          </p>
        </div>

        <div className="relative">
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-xl cursor-pointer"
          >
            <User />
            <span className="font-semibold">{user?.name}</span>
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

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ scale: 1.07 }}
              onClick={() => navigate(card.route)}
              className={`p-6 rounded-2xl text-white shadow-lg cursor-pointer bg-gradient-to-r ${card.color}`}
            >
              <div className="mb-4">{card.icon}</div>
              <h2 className="text-lg font-semibold">{card.title}</h2>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SKILLS SELECTION */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="font-semibold">Select Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skillOptions.map((s) => (
            <button
              key={s}
              onClick={() => toggleItem(s, skills, setSkills)}
              className={`px-3 py-1 rounded-full ${skills.includes(s) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <input
          value={customSkill}
          onChange={(e) => setCustomSkill(e.target.value)}
          placeholder="Add custom skill"
          className="mt-2 w-full p-2 border rounded"
        />
        <button
          onClick={() => {
            setSkills([...skills, customSkill]);
            setCustomSkill("");
          }}
          className="mt-2 text-sm text-blue-500"
        >
          + Add Skill
        </button>
      </div>

      {/* INTERESTS SELECTION */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="font-semibold">Select Interests</h2>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((s) => (
            <button
              key={s}
              onClick={() => toggleItem(s, interests, setInterests)}
              className={`px-3 py-1 rounded-full ${interests.includes(s) ? "bg-green-500 text-white" : "bg-gray-200"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <input
          value={customInterest}
          onChange={(e) => setCustomInterest(e.target.value)}
          placeholder="Add custom interest"
          className="mt-2 w-full p-2 border rounded"
        />
        <button
          onClick={() => {
            setInterests([...interests, customInterest]);
            setCustomInterest("");
          }}
          className="mt-2 text-sm text-green-500"
        >
          + Add Interest
        </button>
      </div>

      <button
        onClick={() => {
          setStep(step + 1);
          saveProfile();
        }}
        className="w-full bg-purple-500 text-white py-2 rounded-lg"
      >
        Finish 🚀
      </button>
    </div>
  );
}
