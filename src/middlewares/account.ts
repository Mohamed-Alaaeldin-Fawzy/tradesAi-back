import { Request, Response, NextFunction } from "express";
import { getAccounts } from "../services/account";

export const attachAccountNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["Authorization"];
    const response = await getAccounts(token);
    req.headers["accNum"] = `${response?.accNum}`;
    next();
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
