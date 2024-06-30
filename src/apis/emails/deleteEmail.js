import axios from "axios";
import { backendUrl } from "../constants";

const token = localStorage.getItem("token");

export const deleteEmail = async (emailId) => {
  try {
    const response = await axios.delete(
      `${backendUrl}emails/delete/${emailId}`,
      { headers: { Authorization: token } }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
