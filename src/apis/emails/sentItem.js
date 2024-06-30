import axios from "axios";
import { backendUrl } from "../constants";

export const getSentEmails = async (page = 1, limit = 10) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${backendUrl}emails/sentItems`, {
      headers: { Authorization: token },
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
