import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores} from "../models/index.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
     
      const autoresResultado = autores.find();

      req.resultado = autoresResultado;

      next();
      
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
        next(new NaoEncontrado("Id do Autor não localizado."));
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
      const updateAutorPorId = await autores.findByIdAndUpdate(id, { $set: req.body });
      if (updateAutorPorId !== null) {
        res.status(200).send({ message: "Autor atualizado com sucesso" });     
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
      

    } catch (error) {
      next(error);
    }
  };

  static excluirAutor = async (req, res, next) => {
    const id = req.params.id;
    try {
      const deleteAutorPorId = await autores.findByIdAndDelete(id);
      if (deleteAutorPorId !== null) {
        res.status(200).send({ message: "Autor removido com sucesso" });
        
      } else {
        next(new NaoEncontrado("Id do autor não localizado"));
      }

    } catch (error) {
      next(error);
    }
  };

}

export default AutorController;