import { motion } from "framer-motion";
import { Lightbulb, Rocket, Landmark, Trophy } from "lucide-react";

export default function StartupIdeas() {
  const ideas = [
    "EdTech App",
    "AgriTech Platform",
    "Local Job Portal",
    "E-commerce Startup",
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

  return (
    <div className="space-y-10">

      {/* 🔥 HERO */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold mb-2">
          Startup Ideas 💡
        </h1>
        <p className="text-white/80">
          Learn how to build your own startup step by step 🚀
        </p>
      </div>

      {/* 💡 IDEA CARDS */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Lightbulb /> Trending Startup Ideas
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ideas.map((idea, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg"
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
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>

      {/* ⚠️ RULES / THINGS TO KNOW */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          ⚠️ Important Things to Know
        </h2>

        <ul className="space-y-3 text-gray-600">
          <li>✔ Start small, don’t aim perfect at first</li>
          <li>✔ Focus on solving real problems</li>
          <li>✔ Learn basic business & marketing</li>
          <li>✔ Failure is normal — keep improving</li>
          <li>✔ Work in a team if possible</li>
        </ul>
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
              className="p-4 border rounded-xl hover:bg-purple-50 transition"
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
            <li key={i}>🔥 {h}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}