//imports
import express from "express";
import mongoose from "mongoose";
import { depositoRouter } from './router/depositoRouter.js'
import { saqueRouter } from './router/saqueRouter.js'
import { saldoRouter } from './router/saldoRouter.js'
import { deleteRouter } from './router/deleteRouter.js'
import { transferenciaRouter } from './router/transferenciaRouter.js'
import { mediaBalanceRouter } from "./router/mediaBalanceRouter.js";
import { saldosCrescentesRouter } from "./router/saldosCrescentesRouter.js";
import { saldosDecrescentesRouter } from "./router/saldosDecrescentesRouter.js";
import { agenciaPrivateRouter } from "./router/agenciaPrivateRouter.js";
import "dotenv/config";

mongooseConect();
// conexão com mongodb
async function mongooseConect() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERDB}:${process.env.PWDDB}@cluster-abner.euhog.gcp.mongodb.net/My-bank-api?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })

    console.log("SUCESSO - Mongoose conectado ao mongoDb");
  } catch (err) {
    console.log("erro na conecção com o MongoDb", err);
  }
}

const app = express();

app.use(express.json());
app.use('/deposito', depositoRouter);
app.use('/saque', saqueRouter);
app.use('/saldo', saldoRouter);
app.use('/delete', deleteRouter);
app.use('/transferencia', transferenciaRouter);
app.use('/media', mediaBalanceRouter);
app.use('/saldosCrescentes', saldosCrescentesRouter);
app.use('/saldosDecrescentes', saldosDecrescentesRouter);
app.use('/agenciaPrivate', agenciaPrivateRouter);



app.listen(process.env.PORT, () => console.log("API pronta"));
