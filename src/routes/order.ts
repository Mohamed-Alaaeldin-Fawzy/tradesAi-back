import { Router } from "express";
import {
  getTradableInstrumentList,
  getTradableInstrumentDetails,
  placeOrder,
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

router.get(
  "/details/:tradableInstrumentId",
  asyncErrorHandler(async (req, res) => {
    const tradableInstrumentId = req.params.tradableInstrumentId;
    const routeId = req.query.routeId;
    const locale = req.query.locale;
    const data = {
      token: req.headers["Authorization"],
      accNum: req.headers["accNum"],
      routeId,
      locale,
      tradableInstrumentId,
    };
    const result = await getTradableInstrumentDetails(data);
    res.status(200).json({ success: true, data: result });
  })
);

export default router;
