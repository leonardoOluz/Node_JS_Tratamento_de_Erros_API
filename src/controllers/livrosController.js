import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res) => {
    try {
      const resultadoLivro = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(resultadoLivro);

    } catch (error) {
      res, status(500).json({ message: "Erro interno" });
    }
  };

  static listarLivroPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const livrosPorId = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
      res.status(200).json(livrosPorId);
    } catch (error) {
      res.status(500).json({ message: "Erro interno" });
    }
  };

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new livros(req.body);
      const livroNovo = await livro.save();
      res.status(201).send(livroNovo);
    } catch (error) {
      res.status(500).send({ message: "falha ao cadastrar livro." });
    }
  };

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      res.status(500).send({ message: "Erro interno" });
    }
  };

  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (error) {
      res.status(500).send({ message: "Erro interno" });
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    try {
      const editora = req.query.editora;
      const livroPorEditora = await livros.find({ "editora": editora });
      res.status(200).send(livroPorEditora);
    } catch (error) {
      res.status(200).send({ message: "Erro interno" });
    }
  };

}

export default LivroController;