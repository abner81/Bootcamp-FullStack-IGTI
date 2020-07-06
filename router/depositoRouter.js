import express from "express";
import { accountsModel } from '../models/accountsModel.js'

const app = express();

app.patch('/:agencia/:conta', async (req, res) => {
  try {
    const account = await accountsModel.findOneAndUpdate(
      {agencia: req.params.agencia, conta: req.params.conta}, 
      {$inc: req.body},
      {new: true}
    );
    if (!account) {
      throw ("Conta inexistente, por favor verifique... ");
    }
    const findAccount = await accountsModel.find(
      { agencia: req.params.agencia, conta: req.params.conta },
      { _id: 0, balance: 1 }
    );

    res.send(findAccount)
  } catch (error) {
    res.status(500).send(error)
  }
})

export { app as depositoRouter };
