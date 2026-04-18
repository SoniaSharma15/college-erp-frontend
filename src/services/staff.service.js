import axios from "../services/axiosInstance";

export const createStaff = (data) =>
  axios.post("/staff/register", data);

export const getAllStaff = () =>
  axios.get("/staff");

export const updateStaff = (id, data) =>
  axios.put(`/staff/${id}`, data);

export const deleteStaff = (id) =>
  axios.delete(`/staff/${id}`);