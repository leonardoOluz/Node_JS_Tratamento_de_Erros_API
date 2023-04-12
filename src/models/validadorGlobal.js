import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor !== "",
  message: ({path}) => `campo ${path} em branco foi fornecido.`
});
