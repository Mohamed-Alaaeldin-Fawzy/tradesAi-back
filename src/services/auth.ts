import axios from "axios";
import dotenv from "dotenv";
import { setTokens } from "./tokenManager";

dotenv.config();

const API_URL = process.env.BASE_URL;

export const authenticate = async (): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/auth/jwt/token`, {
      email: process.env.TRADELOCKER_EMAIL,
      password: process.env.TRADELOCKER_PASSWORD,
      server: process.env.TRADELOCKER_SERVER,
    });

    const { accessToken, refreshToken, expireDate } = response.data;
    const expiryTime = new Date(expireDate).getTime();

    setTokens(accessToken, refreshToken, expiryTime);
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Unable to fetch access token");
  }
};
