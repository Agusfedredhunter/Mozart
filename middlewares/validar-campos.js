const { validationResult } = require('express-validator')

// este middleware agarra la petición (req) y se fija si hubo algún error 
// con las validaciones (los 'check') que armamos en las rutas.
const validarCampos = (req, res, next) => {
  // validationResult junta todos los errores que vinieron en la petición
  const errors = validationResult(req)
  
  // Si la lista de errores NO está vacía, es porque se rejistró algún error
  if (!errors.isEmpty()) {
    // Le ponemos un estado 400 (Bad Request)
    return res.status(400).json(errors)
  }
  
  // Si está todo bien, usamos el next() 
  next()
}

module.exports = {
  validarCampos
}
