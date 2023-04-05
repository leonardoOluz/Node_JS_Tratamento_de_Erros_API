import mongoose from "mongoose";

mongoose.connect(process.env.STRING_CONEXAO);

let db = mongoose.connection;

export default db;