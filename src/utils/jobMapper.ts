export const getJobsFromSkills = (skills: string[]) => {
  const jobs: string[] = [];

  if (skills.includes("python")) {
    jobs.push("Data Analyst", "ML Engineer");
  }

  if (skills.includes("react")) {
    jobs.push("Frontend Developer");
  }

  if (skills.includes("sql")) {
    jobs.push("Database Developer");
  }

  return jobs;
};