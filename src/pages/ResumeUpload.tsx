import { useState } from "react";

export default function ResumeUpload() {
  const [skills, setSkills] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");

  const keywords = [
    "python",
    "react",
    "node",
    "sql",
    "machine learning",
    "excel",
    "data analysis",
    "java",
    "c++",
    "javascript",
    "html",
    "css",
    "mongodb",
  ];

  // 🎯 JOB MAPPING
  const jobMap: any = {
    "python": ["Data Analyst", "ML Engineer"],
    "machine learning": ["ML Engineer", "AI Engineer"],
    "react": ["Frontend Developer"],
    "node": ["Backend Developer"],
    "javascript": ["Frontend Developer"],
    "sql": ["Data Analyst"],
    "excel": ["Business Analyst"],
    "data analysis": ["Data Analyst"],
    "java": ["Backend Developer"],
  };

  const extractSkills = (text: string) => {
    const found = keywords.filter((k) =>
      text.toLowerCase().includes(k)
    );

    setSkills(found);
  };

  const handleFile = async (file: File) => {
    setFileName(file.name);
    const text = await file.text();
    extractSkills(text);
  };

  // 🎯 GENERATE JOBS
  const getJobs = () => {
    const jobs = new Set<string>();

    skills.forEach((skill) => {
      if (jobMap[skill]) {
        jobMap[skill].forEach((job: string) => jobs.add(job));
      }
    });

    return Array.from(jobs);
  };

  const jobs = getJobs();

  return (
    <div className="space-y-10">

      {/* 🔥 HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Resume Analyzer 🚀
        </h1>
        <p className="text-blue-100">
          Upload your resume and discover your career path instantly
        </p>
      </div>

      {/* 📄 UPLOAD CARD */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center">

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 hover:border-blue-500 transition">

          <p className="text-gray-500 mb-3">
            Drag & drop your resume or click to upload
          </p>

          <input
            type="file"
            accept=".txt"
            onChange={(e) =>
              handleFile(e.target.files?.[0] as File)
            }
            className="mx-auto"
          />

          {fileName && (
            <p className="mt-4 text-sm text-gray-600">
              📄 {fileName}
            </p>
          )}
        </div>
      </div>

      {/* 🧠 SKILLS */}
      {skills.length > 0 && (
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Detected Skills 🧠
          </h2>

          <div className="flex flex-wrap gap-3">
            {skills.map((s, i) => (
              <span
                key={i}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 💼 JOB SUGGESTIONS */}
      {jobs.length > 0 && (
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6">
            Recommended Career Paths 💼
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {jobs.map((job, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border hover:shadow-xl transition bg-gradient-to-br from-gray-50 to-white"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {job}
                </h3>

                <p className="text-gray-500 text-sm mb-4">
                  Based on your skills, you can explore this role.
                </p>

                {/* <button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90"
                  onClick={() => window.location.href = "/roadmap"}
                >
                  View Roadmap →
                </button> */}
              </div>
            ))}

          </div>
        </div>
      )}

      {/* ❌ EMPTY */}
      {fileName && skills.length === 0 && (
        <div className="text-center text-gray-500">
          No skills detected 😕 Try a better resume
        </div>
      )}

    </div>
  );
}
