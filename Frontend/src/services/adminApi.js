import axios from "axios";

const API = "http://localhost:3000/api/admin";
export const getDoctors = (token) => {
    axios.get(`{API}/doctors`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}