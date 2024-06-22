import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import { notFound } from "./app/middleware/notFound";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Car-wash Server!!!");
});
app.use("/api", router);
// 404 Handler
app.use(notFound);

export default app;
