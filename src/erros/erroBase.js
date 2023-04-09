class ErroBase extends Error {
  constructor(mensagem = "Erro interno do servidor", status = 500){
    super();
    this.message = mensagem;
    this.status = status;
  }


}
 
export default ErroBase;