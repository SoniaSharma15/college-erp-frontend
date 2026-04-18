import API from "../../../../../services/axiosInstance";

// Save Notice

export const createNotice = async (data) => {

  try {

    const response = await API.post(
      "/notices",
      data
    );

    return response.data;

  } catch (error) {

    console.error(
      "Create Notice Error:",
      error
    );

    throw error;

  }

};


export const getAllNotices = async () => {

  const res = await API.get("/notices");

  return res.data;

};