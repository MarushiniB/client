import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Pages
import Dashboard from "../pages/Dashboard";
import CollegeDashboard from "../pages/CollegeDashboard";
import ResumeUpload from "../pages/ResumeUpload";
import Roadmap from "../pages/Roadmap";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Quiz from "../pages/Quiz";
import SkillQuiz from "../pages/SkillQuiz";
import Colleges from "../pages/Colleges";
import CollegeDetails from "../pages/collegeDetails";
import Courses from "../pages/Courses";
import StartupIdeas from "../pages/StartupIdeas";

// TEMP
// const Courses = () => <h1>Courses Page 📚</h1>;
const Jobs = () => <h1>Jobs 💼</h1>;

export default function AppRoutes() {
  return (
    <Routes>

      {/* 🔓 PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
<Route path="startup" element={<StartupIdeas />} />
      {/* 🔐 MAIN APP */}
      <Route path="/" element={<MainLayout />}>

        {/* DEFAULT */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* 🏫 SCHOOL */}
        <Route path="quiz" element={<Quiz />} />
        <Route path="courses" element={<Courses />} />
        <Route path="colleges" element={<Colleges />} />
        <Route path="college/:name" element={<CollegeDetails />} />

        {/* 🎓 COLLEGE */}
        <Route path="college-dashboard" element={<CollegeDashboard />} />
        <Route path="skill-quiz" element={<SkillQuiz />} />  {/* ✅ FIX */}
        <Route path="resume" element={<ResumeUpload />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="roadmap" element={<Roadmap />} />

      </Route>

    </Routes>
  );
}