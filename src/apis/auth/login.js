import axios from "axios";
import { backendUrl } from "../constants";

export const userSignIn = async (loginData) => {
  try {
    const response = await axios.post(`${backendUrl}login`, loginData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
