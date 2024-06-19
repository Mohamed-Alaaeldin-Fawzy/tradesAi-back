import { Request, Response, NextFunction } from "express";
import { getAccessToken, isTokenExpired } from "../services/tokenManager";
import { refreshAccessToken } from "../services/refreshToken";

export const attachAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (isTokenExpired()) {
      const newAccessToken = await refreshAccessToken();
      req.headers["Authorization"] = `Bearer ${newAccessToken}`;
    } else {
      req.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    }
    next();
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
