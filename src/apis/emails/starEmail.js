import axios from "axios";
import { backendUrl } from "../constants";

const token = localStorage.getItem("token");

export const addStar = async (emailId, folder) => {
  // Only need emailId for patch request
  try {
    const response = await axios.patch(
      `${backendUrl}emails/addStar/${emailId}`, // Correct endpoint URL
      { folder },
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

export const getStarredEmails = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${backendUrl}emails/starred`, {
      headers: { Authorization: token },
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
