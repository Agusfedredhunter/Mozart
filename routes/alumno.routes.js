const { Router } = require('express')
// check nos salva las papas para verificar la data que viene del body, params o query
const { check } = require('express-validator')
// Nos traemos el middleware groso que armamos para atajar los errores
const { validarCampos } = require('../middlewares/validar-campos')

const {
  getAlumnoAll,
  getAlumnoById,
  postAlumno,
  putAlumno,
  deleteAlumno
} = require('../controllers/alumno.controller')

const rutas = Router()

// Ruta para traerse a todos los alumnos (Acá no hace falta validar nada raro)
rutas.get('/', getAlumnoAll)

// En estas rutas mandamos una batería de validaciones antes de que toque el controlador
rutas.get('/:id', [
  // Nos aseguramos que el parámetro :id que viene en la URL sea un número, nada de letras
  check('id', 'Che, el id (legajo) tiene que ser un número').isNumeric(),
  // Después lo pasamos por el filtro. Si hay bardo, frena acá y no ejecuta getAlumnoById
  validarCampos
], getAlumnoById)

rutas.post('/', [
  // Aca no te podes olvidar del legajo, y encima tiene que ser número
  check('legajo', 'El legajo no puede faltar y tiene que ser un número').isNumeric(),
  // Ni se te ocurra mandar el nombre o apellido vacío
  check('nombre', 'Ponete las pilas, el nombre es obligatorio').not().isEmpty(),
  check('apellido', 'Falta el apellido, rey').not().isEmpty(),
  // isEmail() chequea que tenga formato de mail posta (ejemplo@mail.com)
  check('email', 'Mandá un email válido, no pongas giladas').isEmail(),
  check('fechaAlta', 'Falta la fecha de alta').not().isEmpty(),
  check('modificacion', 'Falta la fecha de modificación').not().isEmpty(),
  // isBoolean() se fija que isActive sea true o false nomás
  check('isActive', 'El campo isActive es clave y tiene que ser booleano').isBoolean(),
  // Atajamos los penales de los errores
  validarCampos
], postAlumno)

rutas.put('/:id', [
  // El ID que vamos a actualizar tiene que ser número sí o sí
  check('id', 'El id (legajo) tiene que ser un número').isNumeric(),
  // Le metemos .optional() porque por ahí el loco solo quiere actualizar un campo y no hace 
  // falta que mande toda la bola de nuevo. Pero si lo manda, que esté bien.
  check('nombre', 'El nombre no puede venir vacío').optional().not().isEmpty(),
  check('apellido', 'El apellido no puede venir vacío').optional().not().isEmpty(),
  check('email', 'Mandá un email posta').optional().isEmail(),
  check('isActive', 'El campo isActive tiene que ser booleano').optional().isBoolean(),
  validarCampos
], putAlumno)

rutas.delete('/:id', [
  // Chequeamos que pasen un ID como la gente para poder borrar
  check('id', 'El id (legajo) tiene que ser un número').isNumeric(),
  validarCampos
], deleteAlumno)

module.exports = rutas
