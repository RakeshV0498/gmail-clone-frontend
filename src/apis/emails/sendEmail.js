import axios from "axios";
import { backendUrl } from "../constants";

export const sendEmail = async (emailData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${backendUrl}emails/sendEmail`,
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
