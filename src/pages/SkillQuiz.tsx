import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

type Scores = {
  developer: number;
  analyst: number;
  designer: number;
  manager: number;
};

type Role = {
  name: string;
  requiredSkills: string[];
  relatedInterests: string[];
};

const roles: Role[] = [
  {
    name: "MERN Developer",
    requiredSkills: ["JavaScript", "React", "Node.js", "HTML", "CSS", "MongoDB"],
    relatedInterests: ["Web Development", "App Development"],
  },
  {
    name: "Data Scientist",
    requiredSkills: ["Python", "SQL", "Machine Learning", "Deep Learning"],
    relatedInterests: ["Data Science", "Artificial Intelligence"],
  },
  {
    name: "UI/UX Designer",
    requiredSkills: ["Figma", "UI Design", "UX Research", "Photoshop"],
    relatedInterests: ["Design", "Gaming"],
  },
  {
    name: "Healthcare Analyst",
    requiredSkills: ["Python", "SQL", "Data Analysis"],
    relatedInterests: ["Healthcare", "Data Science"],
  },
  {
    name: "Product Manager",
    requiredSkills: ["Leadership", "Communication", "Critical Thinking"],
    relatedInterests: ["Business", "Startups", "Marketing"],
  },
];

const questions = [
  { q: "Do you enjoy coding?", type: "developer" },
  { q: "Do you like solving logical problems?", type: "developer" },
  { q: "Do you enjoy data analysis?", type: "analyst" },
  { q: "Do you like working with numbers?", type: "analyst" },
  { q: "Are you creative?", type: "designer" },
  { q: "Do you like UI/UX design?", type: "designer" },
  { q: "Do you like leadership?", type: "manager" },
  { q: "Do you enjoy managing teams?", type: "manager" },
];

const skillOptions = [
  "Java", "Python", "C++", "JavaScript", "React", "Node.js",
  "HTML", "CSS", "MongoDB", "SQL", "Machine Learning",
  "Deep Learning", "UI Design", "UX Research", "Figma",
  "Photoshop", "Communication", "Leadership", "Teamwork",
  "Problem Solving", "Critical Thinking", "Cloud Computing",
  "AWS", "Docker",
];

const interestOptions = [
  "Artificial Intelligence", "Web Development", "App Development",
  "Cyber Security", "Blockchain", "Data Science",
  "Business", "Finance", "Marketing",
  "Healthcare", "Design", "Gaming",
  "Entrepreneurship", "Startups", "Robotics",
];

export default function SkillQuiz() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>({
    developer: 0,
    analyst: 0,
    designer: 0,
    manager: 0,
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [customInterest, setCustomInterest] = useState("");

  const handleAnswer = (type: keyof Scores) => {
    setScores({ ...scores, [type]: scores[type] + 1 });
    setStep(step + 1);
  };

  const toggleItem = (item: string, list: string[], setList: any) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const getRoleMatches = (skills: string[], interests: string[]) => {
    return roles
      .map((role) => {
        const matchedSkills = role.requiredSkills.filter((s) => skills.includes(s));
        const matchedInterests = role.relatedInterests.filter((i) => interests.includes(i));
        const missingSkills = role.requiredSkills.filter((s) => !skills.includes(s));
        return { role: role.name, matchedSkills, matchedInterests, missingSkills };
      })
      .sort(
        (a, b) =>
          b.matchedSkills.length +
          b.matchedInterests.length -
          (a.matchedSkills.length + a.matchedInterests.length)
      );
  };

  // SAVE DATA
  useEffect(() => {
    if (step > questions.length) {
      const saveData = async () => {
        try {
          await API.put("/auth/profile", { skills, interests });
          const oldUser = JSON.parse(localStorage.getItem("user") || "{}");
          localStorage.setItem("user", JSON.stringify({ ...oldUser, skills, interests }));
        } catch (err) {
          console.error(err);
        }
      };
      saveData();
    }
  }, [step]);

  // QUESTIONS PAGE
  if (step < questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-xl">
          <p className="text-sm text-gray-500 mb-2">
            Question {step + 1} / {questions.length}
          </p>
          <h1 className="text-2xl font-bold mb-6">{questions[step].q}</h1>
          <div className="space-y-4">
            <button
              onClick={() => handleAnswer(questions[step].type as keyof Scores)}
              className="w-full p-4 bg-purple-500 text-white rounded-xl"
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

  // SKILLS PAGE
  if (step === questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl w-full space-y-6">
          <h1 className="text-2xl font-bold text-center">🎯 Select Skills & Interests</h1>

          {/* SKILLS */}
          <div>
            <h2 className="font-semibold mb-2">🛠 Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleItem(s, skills, setSkills)}
                  className={`px-3 py-1 rounded-full transition ${
                    skills.includes(s)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-purple-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <input
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && customSkill.trim()) {
                  toggleItem(customSkill.trim(), skills, setSkills);
                  setCustomSkill("");
                }
              }}
              placeholder="Add custom skill and press Enter"
              className="mt-2 w-full p-2 border rounded"
            />
          </div>

          {/* INTERESTS */}
          <div>
            <h2 className="font-semibold mb-2">🎯 Interests</h2>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((i) => (
                <button
                  key={i}
                  onClick={() => toggleItem(i, interests, setInterests)}
                  className={`px-3 py-1 rounded-full transition ${
                    interests.includes(i)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-300"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
            <input
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && customInterest.trim()) {
                  toggleItem(customInterest.trim(), interests, setInterests);
                  setCustomInterest("");
                }
              }}
              placeholder="Add custom interest and press Enter"
              className="mt-2 w-full p-2 border rounded"
            />
          </div>

          <button
            onClick={() => setStep(step + 1)}
            className="w-full bg-purple-600 text-white py-3 rounded-lg mt-4"
          >
            Finish 🚀
          </button>
        </div>
      </div>
    );
  }

  // RESULT PAGE
  const roleMatches = getRoleMatches(skills, interests);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <h1 className="text-4xl font-bold mb-3">🎯 Career Recommendations</h1>
          <p className="text-gray-700">
            Based on your skills and interests, these roles might suit you:
          </p>
        </div>

        {/* ROLES */}
        <div className="grid md:grid-cols-2 gap-6">
          {roleMatches.map((r, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow">
              <h2 className="font-bold text-xl mb-2">{r.role}</h2>
              <p>✅ Skills matched: {r.matchedSkills.join(", ") || "None"}</p>
              <p>🎯 Interests matched: {r.matchedInterests.join(", ") || "None"}</p>
              {r.missingSkills.length > 0 && (
                <p className="text-red-500 mt-1">
                  ⚠ Missing skills: {r.missingSkills.join(", ")}
                </p>
              )}
              {r.matchedInterests.length === 0 && (
                <p className="text-yellow-600 mt-1">
                  💡 You could try this role if you are interested in {roles.find(role => role.name === r.role)?.relatedInterests.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* BACK TO ROADMAP BUTTON */}
        <div className="text-center">
          <button
            onClick={() => navigate("/roadmap")}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg"
          >
            🚀 View Roadmap
          </button>
        </div>
      </div>
    </div>
  );
}
