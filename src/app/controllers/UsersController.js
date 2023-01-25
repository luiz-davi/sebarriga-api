const Yup = require('yup');
const StoreService = require('../services/users/store');
const UpdateService = require('../services/users/update');

class UsersController {

	async store(req, res){

    const schema = Yup.object().shape({
      full_name: Yup.string().required(),
      cpf: Yup.string().min(11).max(11).required(),
      rg: Yup.string().min(7).max(7).required(),
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

		const service = await StoreService.call(req.body);

    if(!service.success){
      return res.status(service.status).json( service.error );
    }

    return res.status(service.status).json( service.result );

	}

  async update(req, res){

    const schema = Yup.object().shape({
      ful_name: Yup.string(),
      email: Yup.string().email(),
      old_password: Yup.string().min(6).required(),
      password: Yup.string().min(6),
      confirm_password: Yup.string().min(6).when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
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

    const service = await UpdateService.call(req.body, req.user_id);

    if(!service.success){
      return res.status(service.status).json( service.error );
    }

    return res.status(service.status).json( service.result );
  }

}

module.exports = new UsersController();
