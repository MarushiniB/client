import API from "./api";

export const getColleges = async () => {
  const res = await API.get("/colleges");
  return res.data;
};