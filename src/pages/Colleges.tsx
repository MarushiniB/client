import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { colleges } from "../data/colleges";

export default function Colleges() {
  const [stream, setStream] = useState("all");
  const [region, setRegion] = useState("all");
  //const navigate = useNavigate();
  const [selectedCollege, setSelectedCollege] = useState<any>(null);

  const filtered = colleges.filter((c) => {
    return (
      (stream === "all" || c.stream === stream) &&
      (region === "all" || c.region === region)
    );
  });

  return (
    <div className="space-y-8">

      {/* 🔥 HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Explore Colleges 🎓</h1>
        <p className="text-gray-500">
          Find the best colleges based on your interests
        </p>
      </div>

      {/* 🎛️ FILTERS */}
      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl shadow">

        <select
          onChange={(e) => setStream(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Streams</option>
          <option value="engineering">Engineering</option>
          <option value="medical">Medical</option>
          <option value="arts">Arts</option>
          <option value="commerce">Commerce</option>
          <option value="science">Science</option>
        </select>

        <select
          onChange={(e) => setRegion(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Regions</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="West">West</option>
          <option value="Central">Central</option>
        </select>

      </div>

      {/* 🏫 COLLEGE CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {filtered.map((college, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer border border-gray-100"
          >
            {/* Title */}
            <h2 className="text-xl font-semibold mb-1">
              {college.name}
            </h2>

            {/* Location */}
            <p className="text-gray-500 text-sm mb-3">
              📍 {college.district} • {college.region}
            </p>

            {/* Stream Badge */}
            <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium mb-3 capitalize">
              {college.stream}
            </span>

            {/* Courses */}
            <div className="flex flex-wrap gap-2">
              {college.courses.map((course, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {course}
                </span>
              ))}
            </div>

            {/* CTA */}
<button
  onClick={() => setSelectedCollege(college)}
  className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition"
>
  View Details →
</button>
          </div>
        ))}

      </div>
      {selectedCollege && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

    {/* CARD */}
    <div className="bg-white w-[90%] max-w-3xl rounded-2xl shadow-2xl p-6 space-y-6 animate-fadeIn">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">
            {selectedCollege.name}
          </h2>
          <p className="text-gray-500 text-sm">
            📍 {selectedCollege.district} • {selectedCollege.region}
          </p>
        </div>

        <button
          onClick={() => setSelectedCollege(null)}
          className="text-red-500 text-lg font-bold"
        >
          ✖
        </button>
      </div>

      {/* ABOUT */}
      <div>
        <h3 className="font-semibold mb-1">About</h3>
        <p className="text-gray-600 text-sm">
          {selectedCollege.description || "No description available"}
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 text-center">

        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-xs text-gray-500">Fees</p>
          <p className="font-semibold">
            {selectedCollege.fees || "N/A"}
          </p>
        </div>

        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-xs text-gray-500">Rating</p>
          <p className="font-semibold">
            ⭐ {selectedCollege.rating || "N/A"}
          </p>
        </div>

        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-xs text-gray-500">Placement</p>
          <p className="font-semibold">
            {selectedCollege.placement || "N/A"}
          </p>
        </div>

      </div>

      {/* COURSES */}
      <div>
        <h3 className="font-semibold mb-2">Courses</h3>
        <div className="flex flex-wrap gap-2">
          {selectedCollege.courses.map((c: string, i: number) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* FACILITIES */}
      <div>
        <h3 className="font-semibold mb-2">Facilities</h3>
        <div className="flex flex-wrap gap-2">
          {(selectedCollege.facilities || []).map((f: string, i: number) => (
            <span
              key={i}
              className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* RECRUITERS */}
      <div>
        <h3 className="font-semibold mb-2">Top Recruiters</h3>
        <div className="flex flex-wrap gap-2">
          {(selectedCollege.recruiters || []).map((r: string, i: number) => (
            <span
              key={i}
              className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs"
            >
              {r}
            </span>
          ))}
        </div>
      </div>

    </div>
  </div>
)}

      {/* ❌ EMPTY STATE */}
      {filtered.length === 0 && (
        <div className="text-center text-gray-500">
          No colleges found 😕
        </div>
      )}
    </div>
  );
}