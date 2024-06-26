import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const API_URL = process.env.BASE_URL;
const accountId = process.env.TRADELOCKER_ACCOUNT_NUMBER;

export const placeOrder = async (req: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/trade/accounts/${accountId}/orders`,
      req.body,
      {
        headers: {
          Authorization: req.headers["Authorization"],
          accNum: req.headers["accNum"],
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw new Error("Unable to place order");
  }
};

// Get the list of the instruments that are available for trading with the specified account.
export const getTradableInstrumentList = async (data: any): Promise<void> => {
  try {
    const response = await axios.get(
      `${API_URL}/trade/accounts/${accountId}/instruments`,
      {
        headers: {
          Authorization: data.token,
          accNum: data.accNum,
        },
      }
    );

    return response.data.d.instruments;
  } catch (error) {
    console.error("Error fetching account instruments categories:", error);
    throw new Error("Unable to fetch account instruments categories");
  }
};

// Get detailed instrument settings, such as lot steps and sizes, quoting currency, trade session id, etc.
export const getTradableInstrumentDetails = async (
  data: any
): Promise<void> => {
  const now = new Date();
  const prev = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());

  try {
    const response = await axios.get(`${API_URL}/trade/history`, {
      headers: {
        Authorization: data.token,
        accNum: data.accNum,
      },
      params: {
        routeId: data.routeId,
        barType: "BID",
        tradableInstrumentId: data.tradableInstrumentId,
        from: prev.getTime(),
        resolution: "1D",
        to: now.getTime(),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching account instrument data:", error);
    throw new Error("Unable to fetch account instrument data");
  }
};
export const getPositions = async (data: any): Promise<void> => {
  try {
    const response = await axios.get(
      `${API_URL}/trade/accounts/${accountId}/positions`,
      {
        headers: {
          Authorization: data.token,
          accNum: data.accNum,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching account positions:", error);
    throw new Error("Unable to fetch account positions");
  }
};
