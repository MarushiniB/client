import { useState } from "react";
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

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>({
    engineering: 0,
    medicine: 0,
    arts: 0,
    commerce: 0,
    science: 0,
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

  // 🎯 RESULT PAGE
if (step > questions.length) {
  const result = getResult();

  // ✅ SAVE TO BACKEND + LOCALSTORAGE
  const saveData = async () => {
    try {
      await API.put("/auth/profile", {
        skills,
        interests,
      });

      // ✅ update localStorage also (instant UI update)
      const oldUser = JSON.parse(localStorage.getItem("user") || "{}");

      const updatedUser = {
        ...oldUser,
        skills,
        interests,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error saving profile", err);
    }
  };

  // 🔥 CALL SAVE ON LOAD
  saveData();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl w-full space-y-6">

        <h1 className="text-3xl font-bold text-center">
          🎯 Your Career Path
        </h1>

        <p className="text-center text-xl">
          Best Stream:
          <span className="text-blue-600 font-bold ml-2 capitalize">
            {result}
          </span>
        </p>

        <div>
          <h2 className="font-semibold mb-2">🛠 Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="bg-blue-100 px-3 py-1 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">🎯 Interests</h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((s, i) => (
              <span key={i} className="bg-green-100 px-3 py-1 rounded-full">
                {s}
              </span>
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

  // 🧠 QUESTIONS
  if (step < questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-xl">

          <p className="text-sm text-gray-500 mb-2">
            Question {step + 1} / {questions.length}
          </p>

          <h1 className="text-2xl font-bold mb-6">
            {questions[step].question}
          </h1>

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

  // 🧠 SKILLS + INTEREST PAGE
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200 p-6">

      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-xl w-full space-y-6">

        <h1 className="text-2xl font-bold text-center">
          🎯 Final Step
        </h1>

        {/* SKILLS */}
        <div>
          <h2 className="font-semibold mb-2">Select Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((s) => (
              <button
                key={s}
                onClick={() => toggleItem(s, skills, setSkills)}
                className={`px-3 py-1 rounded-full ${
                  skills.includes(s)
                    ? "bg-blue-500 text-white"
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

        {/* INTERESTS */}
        <div>
          <h2 className="font-semibold mb-2">Select Interests</h2>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((s) => (
              <button
                key={s}
                onClick={() => toggleItem(s, interests, setInterests)}
                className={`px-3 py-1 rounded-full ${
                  interests.includes(s)
                    ? "bg-green-500 text-white"
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
          onClick={() => setStep(step + 1)}
          className="w-full bg-purple-500 text-white py-2 rounded-lg"
        >
          Finish 🚀
        </button>
      </div>
    </div>
  );
}