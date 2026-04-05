import API from "./api";

export const loginUser = async (data: any) => {
  const res = await API.post("/auth/login", data);

  // ✅ store token immediately
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};

export const registerUser = async (data: any) => {
  const res = await API.post("/auth/register", data);

  // ✅ store token after register also
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};

// ✅ NEW: get profile
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const updateProfile = async (data: any) => {
  const token = localStorage.getItem("token");

  const res = await API.put("/auth/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};