const fs = require('fs').promises
const { AlumnoModel } = require('../models/alumno.model')

const getAlumnoAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    return res.status(200).json(alumnos)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'No se puedieron obtener los datos de los alumnos' })
  }
}

const getAlumnoById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const { id } = req.params

    const legajoId = alumnos.find(
      (a) => a.legajo === Number(id)
    )

    if (!legajoId) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con el legajo ${id}` })
    }

    return res.status(200).json(legajoId)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'No se pudo obtener el datalle del alumno con legajo n° ' + req.params.id
    })
  }
}

const postAlumno = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const { legajo, nombre, apellido, email, fechaAlta, modificacion, isActive } = req.body

    const exists = alumnos.find((a) => a.legajo === legajo)
    if (exists) {
      return res.status(409).json({ msg: 'El alumno con ese legajo ya existe' })
    }

    let nuevoAlumno
    try {
      nuevoAlumno = new AlumnoModel(legajo, nombre, apellido, email, fechaAlta, modificacion, isActive)
    } catch (e) {
      return res.status(400).json({ msg: e.message })
    }

    alumnos.push(nuevoAlumno.getAllAttributes())
    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos, null, 2), 'utf8')

    return res.status(201).json(nuevoAlumno.getAllAttributes())
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo crear el alumno' })
  }
}

const putAlumno = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const { id } = req.params
    const legajoNum = Number(id)
    const index = alumnos.findIndex((a) => a.legajo === legajoNum)

    if (index === -1) {
      return res.status(404).json({ msg: `No existe el alumno con el legajo ${id}` })
    }

    // No se permite modificar el numero de legajo
    const alumnoModificado = { ...alumnos[index], ...req.body, legajo: legajoNum }

    // Validación opcional usando nuestro modelo de clases re cheto (POO pura)
    // Instanciamos el AlumnoModel para que su constructor filtre y salte si la data es trucha.
    try {
      // Le mandamos este mensajito al linter de eslint para que no rompa las bolas
      // diciendo que no usamos la variable _validacion. La instanciamos nomás para 
      // que valide la data y tire bronca (throw) si ve algo raro.
      // eslint-disable-next-line no-unused-vars
      const _validacion = new AlumnoModel(
        alumnoModificado.legajo,
        alumnoModificado.nombre,
        alumnoModificado.apellido,
        alumnoModificado.email,
        alumnoModificado.fechaAlta,
        alumnoModificado.modificacion,
        alumnoModificado.isActive
      )
    } catch (e) {
      return res.status(400).json({ msg: e.message })
    }

    alumnos[index] = alumnoModificado
    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos, null, 2), 'utf8')

    return res.status(200).json(alumnoModificado)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo modificar el alumno' })
  }
}

const deleteAlumno = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const { id } = req.params
    const legajoNum = Number(id)
    const index = alumnos.findIndex((a) => a.legajo === legajoNum)

    if (index === -1) {
      return res.status(404).json({ msg: `No existe el alumno con el legajo ${id}` })
    }

    alumnos.splice(index, 1)
    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos, null, 2), 'utf8')

    return res.status(200).json({ msg: 'Alumno eliminado con exito' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo eliminar el alumno' })
  }
}

module.exports = { getAlumnoAll, getAlumnoById, postAlumno, putAlumno, deleteAlumno }
