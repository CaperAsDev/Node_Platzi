import boom from '@hapi/boom'

function validatorHandler (schema, property){
  return (req, res, next) => {
    const data = req[property]
    console.log('DATA validation: ', data);
    const { error } = schema.validate(data, { abortEarly: false })
    if(error){
      next(boom.badRequest(error))
    }
    next()
  }
}

export default validatorHandler
