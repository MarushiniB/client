import { useState } from "react";

// ----------------------
// Courses Data
// ----------------------
type Course = {
  name: string;
  stream: string;
  level: "UG" | "PG" | "PhD" | "Integrated";
  duration: string;
  colleges: string[];
};

export const courses: Course[] = [
  // ENGINEERING
  { name: "CSE", stream: "engineering", level: "UG", duration: "4 Years", colleges: ["IIT Madras","Anna University","NIT Trichy"] },
  { name: "ECE", stream: "engineering", level: "UG", duration: "4 Years", colleges: ["IIT Madras","SRM University"] },
  { name: "Mechanical", stream: "engineering", level: "UG", duration: "4 Years", colleges: ["PSG Tech","Velammal Engineering College"] },
  { name: "Civil", stream: "engineering", level: "UG", duration: "4 Years", colleges: ["Government Engineering College"] },
  { name: "IT", stream: "engineering", level: "UG", duration: "4 Years", colleges: ["St Joseph Engineering College"] },
  { name: "AI & ML", stream: "engineering", level: "PG", duration: "2 Years", colleges: ["IIT Madras","Karunya University"] },
  { name: "Data Science", stream: "engineering", level: "PG", duration: "2 Years", colleges: ["VIT Vellore","Anna University"] },
  { name: "Cybersecurity", stream: "engineering", level: "PG", duration: "2 Years", colleges: ["SRM University"] },
  { name: "Software Engineering", stream: "engineering", level: "Integrated", duration: "5 Years", colleges: ["IIT Madras"] },
  { name: "Robotics", stream: "engineering", level: "PhD", duration: "3-5 Years", colleges: ["IIT Madras"] },

  // MEDICAL
  { name: "MBBS", stream: "medical", level: "UG", duration: "5.5 Years", colleges: ["Madras Medical College","Stanley Medical College"] },
  { name: "BDS", stream: "medical", level: "UG", duration: "4 Years", colleges: ["SRM Medical College","Saveetha Medical College"] },
  { name: "Nursing", stream: "medical", level: "UG", duration: "4 Years", colleges: ["Madras Medical College"] },
  { name: "MD", stream: "medical", level: "PG", duration: "3 Years", colleges: ["CMC Vellore"] },
  { name: "MS", stream: "medical", level: "PG", duration: "3 Years", colleges: ["CMC Vellore"] },
  { name: "Physiotherapy", stream: "medical", level: "UG", duration: "4 Years", colleges: ["Madras Medical College","Coimbatore Medical College"] },

  // ARTS & DESIGN
  { name: "BA History", stream: "arts", level: "UG", duration: "3 Years", colleges: ["Loyola College","Presidency College"] },
  { name: "BA English", stream: "arts", level: "UG", duration: "3 Years", colleges: ["MCC","Stella Maris"] },
  { name: "Graphic Design", stream: "arts", level: "UG", duration: "3 Years", colleges: ["Loyola College"] },
  { name: "UI/UX Design", stream: "arts", level: "PG", duration: "2 Years", colleges: ["Ethiraj College"] },
  { name: "Content Writing", stream: "arts", level: "PG", duration: "2 Years", colleges: ["Loyola College"] },
  { name: "Fine Arts", stream: "arts", level: "UG", duration: "3 Years", colleges: ["Stella Maris","Thiagarajar College"] },
  { name: "Photography", stream: "arts", level: "UG", duration: "3 Years", colleges: ["Fatima College"] },
  { name: "Fashion Design", stream: "arts", level: "UG", duration: "3 Years", colleges: ["Ethiraj College"] },
  { name: "Theater & Drama", stream: "arts", level: "UG", duration: "3 Years", colleges: ["Presidency College"] },
  { name: "Digital Media", stream: "arts", level: "PG", duration: "2 Years", colleges: ["Loyola College"] },

  // COMMERCE & MANAGEMENT
  { name: "BCom", stream: "commerce", level: "UG", duration: "3 Years", colleges: ["Loyola College","PSG College"] },
  { name: "BBA", stream: "commerce", level: "UG", duration: "3 Years", colleges: ["SRM University","Alagappa University"] },
  { name: "MBA", stream: "commerce", level: "PG", duration: "2 Years", colleges: ["VIT Business School","Anna University MBA"] },
  { name: "Finance", stream: "commerce", level: "PG", duration: "2 Years", colleges: ["Amrita Business School"] },
  { name: "Accounting", stream: "commerce", level: "PG", duration: "2 Years", colleges: ["Ethiraj College"] },

  // SCIENCE
  { name: "BSc Physics", stream: "science", level: "UG", duration: "3 Years", colleges: ["Loyola College","MCC"] },
  { name: "BSc Chemistry", stream: "science", level: "UG", duration: "3 Years", colleges: ["Presidency College"] },
  { name: "BSc Biology", stream: "science", level: "UG", duration: "3 Years", colleges: ["Stella Maris","Kongunadu College"] },
  { name: "MSc Physics", stream: "science", level: "PG", duration: "2 Years", colleges: ["Loyola College"] },
  { name: "MSc Chemistry", stream: "science", level: "PG", duration: "2 Years", colleges: ["MCC"] },

  // LAW & HUMANITIES
  { name: "BA LLB", stream: "law", level: "Integrated", duration: "5 Years", colleges: ["Dr Ambedkar Law College","Tamil Nadu Dr Ambedkar Law University"] },
  { name: "LLB", stream: "law", level: "UG", duration: "3 Years", colleges: ["Dr Ambedkar Law College"] },
  { name: "LLM", stream: "law", level: "PG", duration: "2 Years", colleges: ["Tamil Nadu Dr Ambedkar Law University"] },
  { name: "Political Science", stream: "law", level: "UG", duration: "3 Years", colleges: ["Presidency College","Loyola College"] },
  { name: "Sociology", stream: "law", level: "UG", duration: "3 Years", colleges: ["MCC"] },

  // FASHION & DESIGN
  { name: "Fashion Design", stream: "fashion", level: "UG", duration: "3 Years", colleges: ["National Institute of Fashion Technology"] },
  { name: "Textile Design", stream: "fashion", level: "UG", duration: "3 Years", colleges: ["NIFT","Ethiraj College"] },
  { name: "Accessory Design", stream: "fashion", level: "UG", duration: "3 Years", colleges: ["NIFT"] },
  { name: "Interior Design", stream: "fashion", level: "UG", duration: "3 Years", colleges: ["NIFT"] },
  { name: "Footwear Design", stream: "fashion", level: "UG", duration: "3 Years", colleges: ["NIFT"] },
];

// ----------------------
// Courses Component
// ----------------------
export default function Courses() {
  const streams = Array.from(new Set(courses.map(c => c.stream)));
  const [selectedStream, setSelectedStream] = useState<string>(streams[0]);

  const filteredCourses = courses.filter(c => c.stream === selectedStream);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Explore Courses 🎓</h1>

      {/* Stream Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {streams.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedStream(s)}
            className={`py-2 px-4 rounded-lg font-semibold transition
              ${selectedStream === s
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-xl"></div>

            <h2 className="text-xl font-semibold mb-1">{course.name}</h2>
            <p className="text-gray-500 mb-2">{course.level} • {course.duration}</p>

            {/* Colleges */}
            <div className="flex flex-wrap gap-2">
              {course.colleges.map((c, idx) => (
                <span key={idx} className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded">
                  {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}