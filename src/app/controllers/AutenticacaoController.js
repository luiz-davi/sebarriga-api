const Yup = require('yup');
const AuthService = require("../services/auth/auth");



class AutenticacaoController {

  async auth(req, res){

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required()
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      const validationErrors = {}
      error.inner.forEach((infos) => {
        if(!infos.path) { return; };

        validationErrors[infos.path] = infos.errors.join(', ');
      });

      return res.status(400).json({ errors: validationErrors })
    }

    const service = await AuthService.call(req.body);

    if(!service.success){
      return res.status(service.status).json( service.error );
    }

    return res.status(service.status).json( service.result );
  }

}

module.exports = new AutenticacaoController();
