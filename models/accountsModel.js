import mongoose from "mongoose";

// criação do modelo
const accountSchema = mongoose.Schema({
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    validate(balance) {
      if (balance < 0)
        throw new Error(
          "Saldo negativo, deposite algum valor na sua conta para poder continuar fazer transações"
        );
    },
  }
});

//definindo o modelo criado acima
const accountsModel = mongoose.model("Accounts", accountSchema, "Accounts");

export { accountsModel };
