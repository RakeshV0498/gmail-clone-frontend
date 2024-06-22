import axios from "axios";
import { backendUrl } from "../constants.js";

export const userSignUp = async (userData) => {
  try {
    const response = await axios.post(`${backendUrl}register`, userData);
    return await response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
