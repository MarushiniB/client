import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Rocket, Landmark, Trophy } from "lucide-react";

export default function StartupIdeas() {
  const [popupContent, setPopupContent] = useState<string | null>(null);

  // ✅ STARTUP IDEAS
  const ideas = [
    {
      name: "EdTech App",
      desc: "A platform to improve learning experiences using interactive lessons, quizzes, and AI-powered suggestions for students. Can target schools, colleges, or online learners."
    },
    {
      name: "AgriTech Platform",
      desc: "Technology to support farmers with crop insights, weather data, and marketplaces for selling produce directly to buyers."
    },
    {
      name: "Local Job Portal",
      desc: "A platform connecting job seekers to local employers with curated opportunities and skill-based matching."
    },
    {
      name: "Healthcare App",
      desc: "A solution for telemedicine, appointment booking, patient records, and health tracking, targeting clinics and patients."
    },
    {
      name: "AI Chatbot",
      desc: "An intelligent assistant for businesses to automate customer support and improve engagement using AI and NLP."
    },
    {
      name: "E-commerce Solution",
      desc: "A platform to help small businesses sell products online with features like inventory management, payments, and delivery tracking."
    },
    {
      name: "Travel Planner",
      desc: "An app to plan trips, manage bookings, suggest itineraries, and provide travel recommendations based on preferences."
    }
  ];

  // ✅ STEPS TO STARTUP
  const steps = [
    {
      name: "Find a problem to solve",
      desc: "Identify real-world problems you are passionate about. Observe your surroundings, talk to people, and understand pain points."
    },
    {
      name: "Validate your idea",
      desc: "Test your idea with potential users. Collect feedback, surveys, and conduct small experiments to ensure demand."
    },
    {
      name: "Build MVP",
      desc: "Create a minimum viable product to showcase the core functionality. Focus on essential features to launch quickly."
    },
    {
      name: "Launch & improve",
      desc: "Release your MVP to a small audience, monitor usage, gather feedback, and iterate to improve the product."
    },
    {
      name: "Get funding / scale",
      desc: "Once your product gains traction, seek funding from investors or accelerators to scale operations."
    }
  ];

  // ✅ GOVERNMENT SCHEMES
  const schemes = [
    {
      name: "Startup India",
      desc: "A government initiative to promote startups through easier compliance, funding support, and mentorship programs."
    },
    {
      name: "MSME Registration",
      desc: "Enables small businesses to gain formal recognition, access financial benefits, and avail schemes for growth."
    },
    {
      name: "Mudra Loan",
      desc: "Government-backed loans for startups and small businesses without requiring collateral, supporting initial operations."
    },
    {
      name: "Atal Innovation Mission",
      desc: "Encourages innovation and entrepreneurship through incubators, accelerators, and funding programs."
    }
  ];

  // ✅ HACKATHONS
  const hackathons = [
    {
      name: "Smart India Hackathon",
      desc: "A nationwide initiative to provide students with a platform to solve real-life problems using technology."
    },
    {
      name: "College Hackathons",
      desc: "Organized by colleges or clubs to encourage creativity, teamwork, and solving practical coding challenges."
    },
    {
      name: "Online Coding Challenges",
      desc: "Participate in online competitions to improve coding skills, problem-solving, and gain recognition in tech communities."
    }
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
              onClick={() => openPopup(idea.name, idea.desc)}
            >
              {idea.name}
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
              onClick={() => openPopup(step.name, step.desc)}
            >
              {step.name}
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
            onClick={() => openPopup("Tip", item)}
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
              onClick={() => openPopup(s.name, s.desc)}
            >
              {s.name}
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
              onClick={() => openPopup(h.name, h.desc)}
            >
              🔥 {h.name}
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
            className="bg-white p-8 rounded-3xl shadow-xl max-w-3xl w-full max-h-[80vh] overflow-auto"
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
