import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next){
  try {
    
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
      
    let [campoOrdenacao ,orden] = ordenacao.split(":");

    limite = parseInt(limite);      
    pagina = parseInt(pagina);
    orden = parseInt(orden);
    const resultado = req.resultado;

    if (pagina > 0 && limite > 0 && (orden === -1 || orden === 1)) {
    
      const resultadoPaginado = await resultado.find()
        .sort({[campoOrdenacao]: orden})
        .skip((pagina - 1) * limite)
        .limit(limite)
        .exec();
      res.status(200).json(resultadoPaginado);
      
    } else {
      next(new RequisicaoIncorreta());
    }
  } catch (error) {
    next(error);
  }
}

export default paginar;