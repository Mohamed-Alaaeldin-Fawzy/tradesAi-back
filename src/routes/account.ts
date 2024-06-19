import { Router } from "express";
import { asyncErrorHandler } from "../util/asyncErrorHandler";
import { getAccountDetails } from "../services/account";

const router = Router();

router.get(
  "/account",
  asyncErrorHandler(async (req, res) => {
    const data = {
      token: req.headers["Authorization"],
      accNum: req.headers["accNum"],
    };
    const response = await getAccountDetails(data);
    res.status(200).json(response);
  })
);

export default router;
