import express from "express";
import { accountsModel } from "../models/accountsModel.js";

const app = express();

app.get("/:agencia/:conta", async (req, res) => {
  try {
    const account = await accountsModel.find(
      { agencia: req.params.agencia, conta: req.params.conta },
      {_id: 0, balance: 1}
    );
      if (!account) {
        throw "Conta inexistente, por favor verifique... ";
      }

    res.send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { app as saldoRouter };
