// src/features/admin/adminAPI.js

import axiosInstance from "../../services/axiosInstance";

// COURSE
export const createCourseAPI = (data) =>
  axiosInstance.post("/courses", data);

export const getCoursesAPI = () =>
  axiosInstance.get("/courses");

// BRANCH
export const createBranchAPI = (data) =>
  axiosInstance.post("/branches", data);

export const getBranchesByCourseAPI = (courseId) =>
  axiosInstance.get(`/branches/${courseId}`);