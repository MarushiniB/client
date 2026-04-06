import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

type Scores = {
  developer: number;
  analyst: number;
  designer: number;
  manager: number;
};

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
  "AWS", "Docker"
];

const interestOptions = [
  "Artificial Intelligence", "Web Development", "App Development",
  "Cyber Security", "Blockchain", "Data Science",
  "Business", "Finance", "Marketing",
  "Healthcare", "Design", "Gaming",
  "Entrepreneurship", "Startups", "Robotics"
];

export default function SkillQuiz() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [result, setResult] = useState("");

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

  const getResult = () => {
    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  };

  const toggleItem = (item: string, list: string[], setList: any) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // SAVE DATA
  useEffect(() => {
    if (step > questions.length) {
      const res = getResult();
      setResult(res);

      const saveData = async () => {
        try {
          await API.put("/auth/profile", {
            skills,
            interests,
          });

          const oldUser = JSON.parse(localStorage.getItem("user") || "{}");

          localStorage.setItem(
            "user",
            JSON.stringify({ ...oldUser, skills, interests })
          );
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

          <h1 className="text-2xl font-bold mb-6">
            {questions[step].q}
          </h1>

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

          <h1 className="text-2xl font-bold text-center">
            🎯 Select Skills & Interests
          </h1>

          {/* SKILLS */}
          <div>
            <h2 className="font-semibold mb-2">🛠 Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleItem(s, skills, setSkills)}
                  className={`px-3 py-1 rounded-full ${
                    skills.includes(s)
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200"
                  }`}
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
          </div>

          {/* INTERESTS */}
          <div>
            <h2 className="font-semibold mb-2">🎯 Interests</h2>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleItem(s, interests, setInterests)}
                  className={`px-3 py-1 rounded-full ${
                    interests.includes(s)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
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
          </div>

          <button
            onClick={() => setStep(step + 1)}
            className="w-full bg-purple-600 text-white py-3 rounded-lg"
          >
            Finish 🚀
          </button>
        </div>
      </div>
    );
  }

  // RESULT PAGE
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 p-6">

      <div className="max-w-6xl mx-auto space-y-8">

        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <h1 className="text-4xl font-bold mb-3">
            🎯 Your Career Result
          </h1>

          <span className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-2xl capitalize">
            {result}
          </span>
        </div>

        {/* SKILLS + INTERESTS */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow">
            <h2 className="font-semibold mb-3">🛠 Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="bg-blue-100 px-3 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow">
            <h2 className="font-semibold mb-3">🎯 Interests</h2>
            <div className="flex flex-wrap gap-2">
              {interests.map((s, i) => (
                <span key={i} className="bg-green-100 px-3 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ROADMAP BUTTON */}
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
