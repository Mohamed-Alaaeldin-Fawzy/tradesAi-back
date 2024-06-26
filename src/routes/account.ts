import { Router } from "express";
import { asyncErrorHandler } from "../util/asyncErrorHandler";
import { getAccountDetails, getAccountPositions } from "../services/account";

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
router.get(
  "/positions",
  asyncErrorHandler(async (req, res) => {
    const data = {
      token: req.headers["Authorization"],
      accNum: req.headers["accNum"],
    };
    const response = await getAccountPositions(data);
    res.status(200).json(response);
  })
);

export default router;
