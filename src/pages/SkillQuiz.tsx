import { useState } from "react";

type Scores = {
  developer: number;
  analyst: number;
  designer: number;
  manager: number;
};

const questions = [
  { q: "Do you like coding?", type: "developer" },
  { q: "Do you enjoy data analysis?", type: "analyst" },
  { q: "Are you creative?", type: "designer" },
  { q: "Do you like leadership?", type: "manager" },
  { q: "Do you enjoy problem-solving?", type: "developer" },
  { q: "Do you like numbers?", type: "analyst" },
];

export default function SkillQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>({
    developer: 0,
    analyst: 0,
    designer: 0,
    manager: 0,
  });

  const handleAnswer = (type: keyof Scores) => {
    setScores({ ...scores, [type]: scores[type] + 1 });
    setStep(step + 1);
  };

  const getResult = () => {
    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  };

  if (step >= questions.length) {
    const result = getResult();

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-blue-200">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">

          <h1 className="text-3xl font-bold mb-4">
            💼 Best Role: {result}
          </h1>

          <button
            onClick={() => window.location.reload()}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200">

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg">

        <h2 className="text-sm text-gray-500 mb-2">
          {step + 1} / {questions.length}
        </h2>

        <h1 className="text-2xl font-bold mb-6">
          {questions[step].q}
        </h1>

        <div className="space-y-4">
          <button
            onClick={() => handleAnswer(questions[step].type as keyof Scores)}
            className="w-full bg-purple-500 text-white p-3 rounded-xl"
          >
            Yes
          </button>

          <button
            onClick={() => setStep(step + 1)}
            className="w-full bg-gray-200 p-3 rounded-xl"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}