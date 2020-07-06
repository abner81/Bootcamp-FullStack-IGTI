import express from "express";
import { accountsModel } from "../models/accountsModel.js";

const app = express();

app.get("/", async (req, res) => {
  try {
    /* const account = await  accountsModel.find({}).distinct("agencia")
    
    const mapAccount = account.map(async (agencia) => {
      const result = await account.find({agencia}).sort({balance: -1})
      return result[0]
    })

    mapAccount = await Promise.all(mapAccount)

    mapAccount.map(async ({_id}) => {
      return await accountsModel.findOneAndUpdate(
        {_id: _id},
        {agencia: 99}
      )
    }) 

    const finalResult = await accountsModel.find({agencia: 99}) */
    const agencias = await accountsModel.find({}).distinct("agencia");

    let contas = agencias.map(async (agencia) => {
      var result = await accountsModel.find({ agencia }).sort({ balance: -1 });
      return result[0];
    });

    contas = await Promise.all(contas);

    contas.map(async ({ _id }) => {
      return await accountsModel.findOneAndUpdate({ _id: _id }, { agencia: 99 });
    });

    if (!contas) {
      throw new Error("Nenhuma conta atualizada");
    }
 
    const finalFind = await accountsModel.find({agencia: 99})
    res.send(finalFind);
  } catch (error) {
    res.status(400).send("erro na agencia private " + error);
  }
});

export { app as agenciaPrivateRouter };
