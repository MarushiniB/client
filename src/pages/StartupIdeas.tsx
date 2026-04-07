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

  const mainSections = [
    { title: "Trending Ideas 💡", icon: <Lightbulb />, content: ideas },
    { title: "How to Start 🚀", icon: <Rocket />, content: steps },
    { title: "Govt Schemes 🏛", icon: <Landmark />, content: schemes },
    { title: "Hackathons 🏆", icon: <Trophy />, content: hackathons },
  ];

  return (
    <div className="space-y-10 p-6 max-w-6xl mx-auto">

      {/* HERO */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 rounded-3xl shadow-xl text-center">
        <h1 className="text-4xl font-bold mb-2">Startup Ideas 💡</h1>
        <p className="text-white/80 text-lg">
          Learn how to build your own startup step by step 🚀
        </p>
      </div>

      {/* MAIN SECTIONS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainSections.map((sec, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-3xl shadow-lg cursor-pointer hover:shadow-2xl transition flex flex-col items-center justify-center text-center"
            onClick={() =>
              setPopupContent(`${sec.title}\n\n${sec.content.join("\n")}`)
            }
          >
            <div className="text-4xl mb-3">{sec.icon}</div>
            <h3 className="font-semibold text-lg">{sec.title}</h3>
            <p className="text-gray-500 text-sm mt-2">
              Click to view details
            </p>
          </motion.div>
        ))}
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
