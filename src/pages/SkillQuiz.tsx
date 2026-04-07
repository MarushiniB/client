// Inside SkillQuiz component:

const [selectedAnswer, setSelectedAnswer] = useState<"yes" | "no" | null>(null);

// handle quiz answer
const handleAnswer = (type: keyof Scores, answer: "yes" | "no") => {
  setSelectedAnswer(answer);
  if (answer === "yes") {
    setScores({ ...scores, [type]: scores[type] + 1 });
  }
  setTimeout(() => {
    setStep(step + 1);
    setSelectedAnswer(null); // reset highlight for next question
  }, 200); // short delay so highlight is visible
};

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
            onClick={() => handleAnswer(questions[step].type as keyof Scores, "yes")}
            className={`w-full p-4 rounded-xl transition ${
              selectedAnswer === "yes" ? "bg-purple-500 text-white" : "bg-gray-200"
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer(questions[step].type as keyof Scores, "no")}
            className={`w-full p-4 rounded-xl transition ${
              selectedAnswer === "no" ? "bg-purple-500 text-white" : "bg-gray-200"
            }`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

// RESULT PAGE
const roleMatches = getRoleMatches(skills, interests);
const topRoles = roleMatches
  .sort(() => 0.5 - Math.random()) // shuffle to avoid same always
  .slice(0, Math.floor(Math.random() * 3) + 2); // pick 2-4 random roles

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
        {topRoles.map((r, i) => (
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
    </div>
  </div>
);
