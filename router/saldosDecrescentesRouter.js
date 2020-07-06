import express from "express";
import { accountsModel } from "../models/accountsModel.js";

const app = express();

app.get("/:limitNumber", async (req, res) => {
  try {
    const num = parseInt(req.params.limitNumber, 10);
    const account = await accountsModel.find().sort({ balance: -1, name: 1 }).limit(num);
    res.send(account);
  } catch (error) {
    res.status(400).send("erro no saldos crescentes " + error);
  }
});

export { app as saldosDecrescentesRouter };
