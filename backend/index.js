import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initConnection, db } from "./mongo.js";
import restaurants from "./api/restaurants.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/restaurants", restaurants);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

const port = process.env.PORT || 3000;
dotenv.config();

initConnection();
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
