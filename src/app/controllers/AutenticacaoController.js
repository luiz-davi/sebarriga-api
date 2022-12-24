import AuthService from "../services/auth/auth";


class AutenticacaoController {

  async auth(req, res){

    const service = await AuthService.call(req.body);

    if(!service.success){
      return res.status(service.status).json( service.error );
    }

    return res.status(service.status).json( service.result );
  }

}

export default new AutenticacaoController();
