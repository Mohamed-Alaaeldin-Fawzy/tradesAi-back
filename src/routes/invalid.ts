import express from "express";
import { asyncErrorHandler } from "../util/asyncErrorHandler";

const router = express.Router();

export const invalidRouter = () => {
  router.get(
    "*",
    asyncErrorHandler(async (_req, res) => {
      res
        .status(404)
        .send("Invalid route please only send requests to known routes");
    })
  );
  return router;
};
