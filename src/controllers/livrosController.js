import { autores, livros } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

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
      if (livrosPorId !== null) {
        res.status(200).json(livrosPorId);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }

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
      const updateLivroPorId = await livros.findByIdAndUpdate(id, { $set: req.body });
      console.log(updateLivroPorId);

      if (updateLivroPorId !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });

      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }

    } catch (error) {
      next(error);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleteLivroPorId = await livros.findByIdAndDelete(id);
      if (deleteLivroPorId !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });

      } else {
        next(new NaoEncontrado("Id do livro não encontrado."));
      }

    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livroPorEditora = await livros
          .find(busca)
          .populate("autor");
        res.status(200).send(livroPorEditora);

      } else {
        res.status(200).send([]);
      }

    } catch (error) {
      next(error);
    }
  };
}

async function processaBusca(paramentros) {

  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = paramentros;

  let busca = {};

  if (editora) busca.editora = editora;

  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};
  // gte = Greater than or equal = Maior ou igual que
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  // lte = Less than or equal = Menor ou igual que
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }

  }

  return busca;

}

export default LivroController;