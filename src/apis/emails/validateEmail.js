import axios from "axios";
import { backendUrl } from "../constants";

export const validateEmail = async (emails) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `${backendUrl}emails/validateEmail/${emails}`,
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error validating email:", error);
    throw error;
  }
};
