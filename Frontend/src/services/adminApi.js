import axios from "axios";

const API = "http://localhost:3000/api/admin";

// Get all doctors
export const getDoctors = (token) => {
  return axios.get(`${API}/doctors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Verify a doctor
export const verifyDoctor = (id, token) => {
  return axios.put(
    `${API}/verify/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};