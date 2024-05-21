import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Welcome to the Blood Donation Application",
  });
});

app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
