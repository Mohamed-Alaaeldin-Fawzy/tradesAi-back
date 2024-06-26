import { Router } from "express";
import {
  getTradableInstrumentList,
  getTradableInstrumentDetails,
  placeOrder,
  getPositions,
} from "../services/order";
import { asyncErrorHandler } from "../util/asyncErrorHandler";

const router = Router();

router.post(
  "/place-order",
  asyncErrorHandler(async (req, res) => {
    const response = await placeOrder(req);
    console.log(response);
    res.status(200).json(response);
  })
);

router.get(
  "/",
  asyncErrorHandler(async (req, res) => {
    const data = {
      token: req.headers["Authorization"],
      accNum: req.headers["accNum"],
    };
    const result = await getTradableInstrumentList(data);
    res.status(200).json({ success: true, data: result });
  })
);

router.post(
  "/dataBar",
  asyncErrorHandler(async (req, res) => {
    const tradableInstrumentId = req.body.tradableInstrumentId;
    const routeId = req.body.routeId;
    const data = {
      token: req.headers["Authorization"],
      accNum: req.headers["accNum"],
      routeId,
      tradableInstrumentId,
    };
    const result = await getTradableInstrumentDetails(data);
    res.status(200).json({ success: true, data: result });
  })
);
router.get(
  "/positions",
  asyncErrorHandler(async (req, res) => {
    const data = {
      token: req.headers["Authorization"],
      accNum: req.headers["accNum"],
    };
    const result = await getPositions(data);
    res.status(200).json({ success: true, data: result });
  })
);

export default router;
