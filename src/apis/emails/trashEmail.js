import axios from "axios";
import { backendUrl } from "../constants";

const token = localStorage.getItem("token");

export const moveToTrash = async (emailId) => {
  try {
    const response = await axios.patch(
      `${backendUrl}emails/trash/${emailId}`,
      {},
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getTrashEmails = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${backendUrl}emails/trash`, {
      headers: { Authorization: token },
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
