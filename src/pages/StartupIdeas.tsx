import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Rocket, Landmark, Trophy } from "lucide-react";

export default function StartupIdeas() {
  const [popupContent, setPopupContent] = useState<string | null>(null);

  const ideas = [
    "EdTech App",
    "AgriTech Platform",
    "Local Job Portal",
    "Healthcare App",
    "AI Chatbot",
    "E-commerce Solution",
    "Travel Planner",
  ];

  const steps = [
    "💡 Find a problem to solve",
    "🔍 Validate your idea (ask people)",
    "🛠 Build MVP (basic version)",
    "📈 Launch & improve",
    "💰 Get funding / scale",
  ];

  const schemes = [
    "Startup India",
    "MSME Registration",
    "Mudra Loan",
    "Atal Innovation Mission",
  ];

  const hackathons = [
    "Smart India Hackathon",
    "College Hackathons",
    "Online Coding Challenges",
  ];

  const openPopup = (title: string, content: string) => {
    setPopupContent(`${title}\n\n${content}`);
  };

  return (
    <div className="space-y-10 p-6 max-w-6xl mx-auto">

      {/* HERO */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 rounded-3xl shadow-xl text-center">
        <h1 className="text-4xl font-bold mb-2">Startup Ideas 💡</h1>
        <p className="text-white/80 text-lg">
          Learn how to build your own startup step by step 🚀
        </p>
      </div>

      {/* 💡 TRENDING IDEAS */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Lightbulb /> Trending Startup Ideas
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ideas.map((idea, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg cursor-pointer"
              onClick={() => openPopup("Startup Idea", idea)}
            >
              {idea}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🚀 HOW TO START */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Rocket /> How to Start a Startup
        </h2>
        <ul className="space-y-3 text-gray-600">
          {steps.map((step, i) => (
            <li
              key={i}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => openPopup("Step to Start", step)}
            >
              {step}
            </li>
          ))}
        </ul>
      </div>

      {/* ⚠️ IMPORTANT THINGS */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          ⚠️ Important Things to Know
        </h2>
        {[
          "Start small, don’t aim perfect at first",
          "Focus on solving real problems",
          "Learn basic business & marketing",
          "Failure is normal — keep improving",
          "Work in a team if possible",
        ].map((item, i) => (
          <p
            key={i}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded text-gray-600"
            onClick={() => openPopup("Important Tip", item)}
          >
            ✔ {item}
          </p>
        ))}
      </div>

      {/* 🏛 GOVERNMENT SCHEMES */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Landmark /> Government Schemes (India 🇮🇳)
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {schemes.map((s, i) => (
            <div
              key={i}
              className="p-4 border rounded-xl hover:bg-purple-50 cursor-pointer transition"
              onClick={() => openPopup("Govt Scheme", s)}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* 🏆 HACKATHONS */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Trophy /> Hackathons & Opportunities
        </h2>
        <ul className="space-y-3 text-gray-600">
          {hackathons.map((h, i) => (
            <li
              key={i}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => openPopup("Hackathon", h)}
            >
              🔥 {h}
            </li>
          ))}
        </ul>
      </div>

      {/* POPUP MODAL */}
      {popupContent && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setPopupContent(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Details</h2>
            <pre className="text-gray-700 whitespace-pre-wrap">{popupContent}</pre>
            <button
              className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl hover:opacity-90 transition"
              onClick={() => setPopupContent(null)}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
