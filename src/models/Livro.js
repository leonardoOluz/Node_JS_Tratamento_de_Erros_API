import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String,
      required: [true, "O título é obrigatório"]},
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "autores", 
      required: [true, "O(a) autor(a) é obrigatório"],
      autopopulate: { select: "nome" }
    },
    editora: {
      type: String, 
      required: [true, "O(a) autor(a) é obrigatório"],
      enum: {
        values: ["Casa do código", "Bookman", "Alura"],
        message: "A editora {VALUE} não é um valor permitido."
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor)=>{
          return valor >= 10 && valor <=5000;
        },
        message: "O numero de páginas deve estar entre 10 e 5000 Valor fornecido: {VALUE} "
      }      
    }
  }
);
livroSchema.plugin(autopopulate);
const livros= mongoose.model("livros", livroSchema);

export default livros;