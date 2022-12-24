import * as Yup from 'yup';
import StoreService from '../services/users/store';
import UpdateService from '../services/users/update';

class UsersController {

	async store(req, res){

    const schema = Yup.object().shape({
      name: Yup.string().required(),
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

		const service = await StoreService.call(req);

    if(!service.success){
      return res.status(400).json( service.error );
    }

    return res.status(201).json( service.result );

	}

  async update(req, res){

    const schema = Yup.object().shape({
      name: Yup.string(),
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

export default new UsersController();
