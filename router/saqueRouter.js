import express from "express";
import { accountsModel } from "../models/accountsModel.js";

const app = express();

app.patch("/:agencia/:conta", async (req, res) => {
  try {
    let somaBalance = req.body.balance + 1
    const account = await accountsModel.find(
      {
        agencia: req.params.agencia,
        conta: req.params.conta, 
      }
    );

    if (!account) {
      throw "Conta inexistente, por favor verifique... ";
    }

    if (somaBalance > account[0].balance) {
      return res.status(400).send('Saldo indiponível')
    }

    const updateAccount = await accountsModel.findOneAndUpdate(
      {
        agencia: req.params.agencia,
        conta: req.params.conta,
      },
      { $inc: { balance: -somaBalance } },
      { new: true }
    );
    const eu = updateAccount.balance;

    res.json(eu)

  } catch (error) {
    res.status(500).send(error);
  }
});

export { app as saqueRouter };
