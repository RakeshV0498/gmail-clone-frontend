import axios from "axios";
import { backendUrl } from "../constants";

const token = localStorage.getItem("token");

export const getAllEmails = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${backendUrl}emails/all`, {
      headers: { Authorization: token },
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
