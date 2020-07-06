import express from "express";
import { accountsModel } from "../models/accountsModel.js";

const app = express();

app.get('/:agenciaOne', async (req, res) => {
  try {
    const num = parseInt(req.params.agenciaOne, 10)
    const account = await accountsModel.aggregate([
      {$match: {agencia: num}},
      {$group: {_id: null, media: {$avg: "$balance"}}}
    ])
    res.send({mediaSalario: account[0].media})
  } catch (error) {
    res.status(400).send('erro no mediaBalance ' + error)
  }
})

export { app as mediaBalanceRouter };