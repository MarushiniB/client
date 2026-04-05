import { useState } from "react";

type Role = {
  title: string;
  stream: string;
  skills: string[];
  steps: string[];
  tools: string[];
  salary: string;
};

const roles: Role[] = [
  // 💻 ENGINEERING / IT
  {
    title: "Software Developer",
    stream: "engineering",
    skills: ["JavaScript", "React", "Node.js", "DSA"],
    steps: [
      "Learn programming basics",
      "Build projects",
      "Learn frameworks (React/Node)",
      "Practice DSA",
      "Apply for jobs"
    ],
    tools: ["VS Code", "GitHub", "Postman"],
    salary: "₹4L - ₹20L"
  },
  {
    title: "Data Scientist",
    stream: "engineering",
    skills: ["Python", "ML", "Statistics", "SQL"],
    steps: [
      "Learn Python",
      "Study statistics",
      "Learn ML algorithms",
      "Work on datasets",
      "Build portfolio"
    ],
    tools: ["Python", "Jupyter", "TensorFlow"],
    salary: "₹6L - ₹25L"
  },
  {
    title: "AI Engineer",
    stream: "engineering",
    skills: ["Python", "Deep Learning", "AI Models"],
    steps: [
      "Learn Python",
      "Understand ML",
      "Deep Learning",
      "Build AI apps"
    ],
    tools: ["PyTorch", "TensorFlow"],
    salary: "₹8L - ₹30L"
  },
  // 🏥 MEDICAL
  {
    title: "Doctor",
    stream: "medical",
    skills: ["Biology", "Diagnosis", "Patient Care"],
    steps: ["Clear NEET", "MBBS degree", "Internship", "Specialization"],
    tools: ["Medical Labs", "Clinical Tools"],
    salary: "₹6L - ₹30L"
  },
  {
    title: "Nurse",
    stream: "medical",
    skills: ["Patient Care", "Medical Knowledge"],
    steps: ["Nursing course", "Hospital training", "Get license"],
    tools: ["Hospital Systems"],
    salary: "₹2L - ₹8L"
  },
  // 🎨 ARTS
  {
    title: "Graphic Designer",
    stream: "arts",
    skills: ["Photoshop", "Creativity", "UI Design"],
    steps: ["Learn design basics", "Practice tools", "Build portfolio", "Freelance or job"],
    tools: ["Figma", "Photoshop"],
    salary: "₹3L - ₹12L"
  },
  {
    title: "Content Writer",
    stream: "arts",
    skills: ["Writing", "SEO", "Creativity"],
    steps: ["Improve writing", "Start blogging", "Learn SEO", "Apply for jobs"],
    tools: ["Grammarly", "WordPress"],
    salary: "₹2L - ₹10L"
  },
  // 💼 COMMERCE
  {
    title: "Chartered Accountant",
    stream: "commerce",
    skills: ["Accounting", "Finance", "Tax"],
    steps: ["CA Foundation", "CA Intermediate", "Articleship", "CA Final"],
    tools: ["Tally", "Excel"],
    salary: "₹6L - ₹25L"
  },
  {
    title: "Investment Banker",
    stream: "commerce",
    skills: ["Finance", "Analysis"],
    steps: ["BCom/MBA", "Internships", "Finance skills"],
    tools: ["Excel", "Power BI"],
    salary: "₹10L - ₹40L"
  },
  // 🔬 SCIENCE
  {
    title: "Research Scientist",
    stream: "science",
    skills: ["Research", "Analysis"],
    steps: ["BSc", "MSc", "PhD", "Research work"],
    tools: ["Lab Tools"],
    salary: "₹5L - ₹20L"
  },
  {
    title: "Biotechnologist",
    stream: "science",
    skills: ["Biology", "Lab Work"],
    steps: ["Biotech degree", "Lab training", "Research"],
    tools: ["Lab Equipment"],
    salary: "₹4L - ₹15L"
  },
  // 🚀 EXTRA ROLES
  {
    title: "UI/UX Designer",
    stream: "engineering",
    skills: ["Figma", "UX Thinking"],
    steps: ["Learn UI", "Build designs", "Portfolio"],
    tools: ["Figma"],
    salary: "₹5L - ₹18L"
  },
  {
    title: "Cybersecurity Analyst",
    stream: "engineering",
    skills: ["Networking", "Security"],
    steps: ["Learn basics", "Certifications", "Practice"],
    tools: ["Kali Linux"],
    salary: "₹6L - ₹20L"
  },
  {
    title: "Teacher",
    stream: "arts",
    skills: ["Teaching", "Communication"],
    steps: ["Degree", "B.Ed", "Teaching"],
    tools: ["Classroom tools"],
    salary: "₹2L - ₹8L"
  },
  {
    title: "Entrepreneur",
    stream: "all",
    skills: ["Leadership", "Business"],
    steps: ["Idea", "Build product", "Scale"],
    tools: ["Startup tools"],
    salary: "Unlimited 🚀"
  }
];

// ------------------------
// Modern Tab Component
// ------------------------
function RoadmapTabs({ role }: { role: Role }) {
  const [activeTab, setActiveTab] = useState<"Skills" | "Steps" | "Tools" | "Salary">("Skills");
  const tabs = ["Skills", "Steps", "Tools", "Salary"] as const;

  return (
    <div className="mt-4">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-200 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-center font-semibold transition
              ${activeTab === tab
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg shadow-md"
                : "text-gray-500 hover:text-blue-600"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="bg-gray-50 rounded-b-lg p-4 min-h-[150px]">
        {activeTab === "Skills" && (
          <div className="flex flex-wrap gap-2">
            {role.skills.map((s, i) => (
              <span key={i} className="bg-blue-100 px-3 py-1 rounded-full">
                {s}
              </span>
            ))}
          </div>
        )}
        {activeTab === "Steps" && (
          <ol className="list-decimal ml-5 text-gray-700 space-y-1">
            {role.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        )}
        {activeTab === "Tools" && (
          <div className="flex flex-wrap gap-2">
            {role.tools.map((t, i) => (
              <span key={i} className="bg-green-100 px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        )}
        {activeTab === "Salary" && (
          <p className="text-gray-800 font-semibold text-lg">{role.salary}</p>
        )}
      </div>
    </div>
  );
}

// ------------------------
// Main Roadmap Component
// ------------------------
export default function Roadmap() {
  const [selected, setSelected] = useState<Role | null>(null);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Career Roadmaps 🚀</h1>

      {/* ROLE GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role, i) => (
          <div
            key={i}
            className="relative group bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition border border-gray-100 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <h2 className="text-xl font-semibold mb-1 group-hover:text-blue-600 transition">
              {role.title}
            </h2>
            <p className="text-sm text-gray-500 mb-3 capitalize">{role.stream}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {role.skills.slice(0, 3).map((s, idx) => (
                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{s}</span>
              ))}
            </div>

            <p className="text-sm text-gray-600 mb-4">💰 {role.salary}</p>

            <button
              onClick={() => setSelected(role)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg transform group-hover:scale-105 transition"
            >
              View Roadmap →
            </button>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-100 to-purple-100 blur-2xl transition pointer-events-none -z-10"></div>
          </div>
        ))}
      </div>

      {/* DETAILS MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-2xl p-6 rounded-2xl shadow-xl space-y-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selected.title}</h2>
              <button onClick={() => setSelected(null)} className="text-red-500 font-semibold">  ✖</button>
            </div>

            {/* Modern Tabs */}
            <RoadmapTabs role={selected} />
          </div>
        </div>
      )}
    </div>
  );
}