import express from "express";
import { accountsModel } from "../models/accountsModel.js";

const app = express();

app.delete("/:agencia/:conta", async (req, res) => {
  try {
    const account = await accountsModel.findOneAndDelete(
      { agencia: req.params.agencia, conta: req.params.conta }
    )
    if (!account) {
      throw "Conta inexistente, por favor verifique... ";
    } 
      const find = await accountsModel.countDocuments({agencia: req.params.agencia})
      res.send({Agencias: find});

  } catch (error) {
    res.status(300).send(error);
  }
});

export { app as deleteRouter };
