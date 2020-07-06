import express from "express";
import { accountsModel } from "../models/accountsModel.js";

const app = express();

app.patch("/:contaOrigem/:contaDestino", async (req, res) => {
  try {
    const operacaoOrigem = await accountsModel.findOneAndUpdate(
      {
        conta: req.params.contaOrigem,
      },
      { $inc: { balance: -req.body.balance } }
    );

    const operacaoDestino = await accountsModel.findOneAndUpdate(
      {
        conta: req.params.contaDestino,
      },
      { $inc: { balance: +req.body.balance } }
    );

    if (operacaoOrigem.agencia !== operacaoDestino.agencia) {
      try {
        const tarifaOitoReais = await accountsModel.findOneAndUpdate(
          {
            conta: req.params.contaOrigem,
          },
          { $inc: { balance: -8 } }
        );

        const accountOrigem = await accountsModel.find(
          {
            conta: req.params.contaOrigem,
          },
          { _id: 0, balance: 1 }
        );
        res.send({ saldoContaOrigem: accountOrigem[0].balance });
      } catch (error) {
        res
          .status(400)
          .send({ messege: "Erro no if da transferencia", errorType: error });
      }
    }

    const accountOrigem = await accountsModel.find(
      {
        conta: req.params.contaOrigem,
      },
      { _id: 0, balance: 1 }
    );
    res.send({ saldoContaOrigem: accountOrigem[0].balance });

  } catch (error) {
    res
      .status(400)
      .send({ messege: "Erro ao realizar a transferência", erro: error });
  }
});
// teste vscod
export { app as transferenciaRouter };
