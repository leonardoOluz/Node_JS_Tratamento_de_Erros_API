import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const resultadoLivro = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(resultadoLivro);

    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livrosPorId = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
      res.status(200).json(livrosPorId);

    } catch (error) {
      next(error);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      const livroNovo = await livro.save();
      res.status(201).send(livroNovo);

    } catch (error) {
      next(error);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    
    } catch (error) {
      next(error);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro removido com sucesso" });

    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;
      const livroPorEditora = await livros.find({ "editora": editora });
      res.status(200).send(livroPorEditora);
    
    } catch (error) {
      next(error);
    }
  };
}

export default LivroController;