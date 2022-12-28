const Yup = require('yup');
const StoreService = require('../services/accounts/store');

class AccountsController {

	async store(req, res){
		 const service = await StoreService.call(req.body, req.user_id);

     if(!service.success){
      return res.status(service.status).json( service.error );
     }

    return res.status(service.status).json( service.result );

	}

  async validation(req, res, next){

    const schema = Yup.object().shape({
      name: Yup.string().min(5).max(20).required(),
      balance: Yup.number()
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (error) {
      const validationErrors = {}
      error.inner.forEach((infos) => {
        if(!infos.path) { return; };

        validationErrors[infos.path] = infos.errors.join(', ');
      });

      return res.status(400).json({ errors: validationErrors })
    }

  }

}

module.exports = new AccountsController();
