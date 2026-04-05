import API from "./api";

export const submitQuiz = async (answers: string[]) => {
  const res = await API.post("/quiz", { answers });
  return res.data;
};