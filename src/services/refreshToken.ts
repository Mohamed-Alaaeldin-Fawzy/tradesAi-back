import axios from "axios";
import { setTokens, getRefreshToken } from "./tokenManager";
import dotenv from "dotenv";

dotenv.config();
const API_URL = process.env.BASE_URL;

export const refreshAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/auth/jwt/refresh`, {
      refreshToken: getRefreshToken(),
    });

    const { accessToken, refreshToken, expireDate } = response.data;
    const expiryTime = new Date(expireDate).getTime();

    setTokens(accessToken, refreshToken, expiryTime);

    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Unable to refresh access token");
  }
};
