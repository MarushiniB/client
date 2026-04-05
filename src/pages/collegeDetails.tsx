import { useParams } from "react-router-dom";
import { colleges } from "../data/colleges";

export default function CollegeDetails() {
  const { name } = useParams();

  const college = colleges.find(
    (c) => c.name === name
  );

  if (!college) {
    return <div>College not found</div>;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">{college.name}</h1>
        <p className="text-gray-500">
          📍 {college.district} • {college.region}
        </p>
      </div>

      {/* ABOUT */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-2">About</h2>
        <p className="text-gray-600">
          {college.description || "No description available"}
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Fees</p>
          <h2 className="font-bold text-xl">
            {college.fees || "N/A"}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Rating</p>
          <h2 className="font-bold text-xl">
            ⭐ {college.rating || "N/A"}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Placement</p>
          <h2 className="font-bold text-xl">
            {college.placement || "N/A"}
          </h2>
        </div>

      </div>

      {/* COURSES */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Courses</h2>

        <div className="flex flex-wrap gap-2">
          {college.courses.map((c, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-600 px-3 py-1 rounded"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* FACILITIES */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Facilities</h2>

        <ul className="list-disc ml-5 text-gray-600">
          {college.facilities?.map((f, i) => (
            <li key={i}>{f}</li>
          )) || <li>No data</li>}
        </ul>
      </div>

      {/* RECRUITERS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Top Recruiters 💼</h2>

        <div className="flex flex-wrap gap-2">
          {(college.recruiters || []).map((r, i) => (
            <span
              key={i}
              className="bg-green-100 text-green-600 px-3 py-1 rounded"
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* WHY CHOOSE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Why Choose This College 🎯</h2>

        <ul className="list-disc ml-5 text-gray-600 space-y-1">
          <li>Strong academic reputation</li>
          <li>Good placement records</li>
          <li>Experienced faculty</li>
          <li>Modern infrastructure</li>
        </ul>
      </div>

      {/* CONTACT */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Contact 📞</h2>

        <p className="text-gray-600">
          Website:{" "}
          <span className="text-blue-500 underline">
            www.{college.name.replace(/\s/g, "").toLowerCase()}.edu
          </span>
        </p>

        <p className="text-gray-600 mt-2">
          Email: info@college.com
        </p>
      </div>

    </div>
  );
}