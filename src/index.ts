import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { createServer } from "http";
import { errorHandler } from "./middlewares/errorHandler";
import { invalidRouter } from "./routes/invalid";
import { attachAccessToken } from "./middlewares/auth";
import orderRoutes from "./routes/order";
import accountDetailsRoute from "./routes/account";
import { authenticate } from "./services/auth";
import { attachAccountNumber } from "./middlewares/account";

dotenv.config();

const app = express();

const server = createServer(app);

app.use(cors());

app.use(compression());

app.use(bodyParser.json());

app.use(cookieParser());

app.use(attachAccessToken);

app.use(attachAccountNumber);

app.use("/", accountDetailsRoute);

app.use("/trades", orderRoutes);

app.use("/", invalidRouter());

app.use(errorHandler);

const startServer = async () => {
  try {
    await authenticate();
    server.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
