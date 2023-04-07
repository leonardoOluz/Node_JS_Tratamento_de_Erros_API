import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
      
    } catch (error) {
      next(error);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorPorId = await autores.findById(id);
    
      if (autorPorId !== null) {
        res.status(200).send(autorPorId);
      } else {
        res.status(404).send({ message: "Id do Autor não localizado." });
      }
    
    } catch (error) {
      next(error);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    let autor = new autores(req.body);
    try {
      const novoAutor = await autor.save();
      res.status(201).send(novoAutor);
    
    } catch (error) {
      next(error);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    const id = req.params.id;
    try {
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso" });

    } catch (error) {
      next(error);
    }
  };

  static excluirAutor = async (req, res, next) => {
    const id = req.params.id;
    try {
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso" });

    } catch (error) {
      next(error);
    }
  };

}

export default AutorController;