import axios from "axios";
import { backendUrl } from "../constants";

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${backendUrl}reset-password/${token}`, {
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
