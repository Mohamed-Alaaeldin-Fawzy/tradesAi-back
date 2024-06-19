import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.BASE_URL;

export const getAccountDetails = async (data: any): Promise<void> => {
  try {
    const response = await axios.get(`${API_URL}/trade/accounts`, {
      headers: {
        Authorization: data.token,
        accNum: data.accNum,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching account config:", error);
    throw new Error("Unable to fetch account config");
  }
};

export const getAccounts = async (token: any): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/auth/jwt/all-accounts`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data.accounts[0];
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Unable to fetch access token");
  }
};
