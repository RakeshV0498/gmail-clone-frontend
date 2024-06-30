import axios from "axios";
import { backendUrl } from "../constants";

const token = localStorage.getItem("token");

export const draftEmail = async (emailData) => {
  try {
    const response = await axios.post(
      `${backendUrl}emails/draftEmail`,
      emailData,
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDraftEmails = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${backendUrl}emails/drafts`, {
      headers: { Authorization: token },
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
