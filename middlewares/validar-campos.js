const { validationResult } = require('express-validator')

// este middleware agarra la petición (req) y se fija si hubo algún quilombo 
// con las validaciones (los 'check') que armamos en las rutas.
const validarCampos = (req, res, next) => {
  // validationResult junta todos los errores que vinieron en la petición
  const errors = validationResult(req)
  
  // Si la lista de errores NO está vacía, es porque mandaron cualquiera
  if (!errors.isEmpty()) {
    // Le clavamos un estado 400 (Bad Request) y le pateamos los errores al front
    return res.status(400).json(errors)
  }
  
  // Si está todo joya, le damos mecha con next() para que siga viaje 
  // hasta el controlador correspondiente (onda postAlumno).
  next()
}

module.exports = {
  validarCampos
}
