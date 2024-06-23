import axios from "axios";
import { backendUrl } from "../constants";

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${backendUrl}forgot-password`, {
      email,
    });
    return await response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
