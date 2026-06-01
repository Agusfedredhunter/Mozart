# Trabajo Práctico N°4 - API REST Alumnos

## 👥 Número de grupo e integrantes
- **Grupo:** 0 *(Completá tu número de grupo acá, crack)*
- **Integrantes:** 
  - [Nombre Apellido 1]
  - [Nombre Apellido 2]
  - [Nombre Apellido 3]
*(¡Acuérdense de poner sus nombres, changos!)*

## 🚀 Nombre del proyecto y su descripción
**API de Gestión de Alumnos - TP4**
Básicamente, armamos una API RESTful re picante con Node.js, Express y TypeScript. Sirve para gestionar alumnos con todo el combo (CRUD completo). La data la guardamos en un archivo JSON para que quede persistente y no se pierda nada cuando se apaga el server. Le metimos arquitectura MVC y pura Programación Orientada a Objetos (POO) para que el código quede un lujo. Además, le mandamos validaciones piolas con `express-validator` para que nadie mande giladas.

## 🛠️ Metodología de trabajo con Git y GitHub
Para no pisarnos el código y hacer cagadas, usamos Git y GitHub a full. 
1. Le mandamos un Fork al repo base del profe.
2. Cada uno se clonó el repo en su máquina.
3. Laburamos con el flujo clásico: `pull` para traer los cambios de los pibes, `commit` con mensajes claros, y `push` para subir todo al repo.
4. Las juntadas en la rama `main` (merges) se hacían con cuidado para no romper nada antes de mandar el proyecto a producción (deploy).

## 🗂️ División de los archivos entre los integrantes
*(Acá completen quién hizo qué, muchachos)*
- **[Nombre 1]**: Se puso la 10 y armó el `alumno.controller.js` con los métodos GET.
- **[Nombre 2]**: Le metió garra a los modelos con TypeScript (`alumno.model.ts`) y armó los métodos POST, PUT y DELETE.
- **[Nombre 3]**: Se encargó de atajar los penales: hizo el Dockerfile, redactó este hermoso README.md y metió el deploy en Render.

## 📂 Distribución de los archivos y carpetas
Así organizamos el boliche para que no sea un quilombo:
```text
/controllers   -> Acá está el cerebro de la operación. Tiene la lógica de cada ruta (ej. alumno.controller.js).
/core          -> Configuración a prueba de balas de Express y el servidor (server.js).
/data          -> Nuestra "base de datos" económica, guarda los registros en formato JSON (alumnos.json).
/middlewares   -> Los patovicas que revisan que la data llegue bien (validar-campos.js con express-validator).
/models        -> Las clases chetas en TypeScript con POO pura (alumno.model.ts, persona.model.ts).
/routes        -> El mapa de la API. Acá definimos las rutas y validaciones (alumno.routes.js).
app.js         -> El archivo principal, le das play a este y arranca el motor.
Dockerfile     -> Para armar el contenedor y que corra igual en la máquina de cualquiera.
```

## 🧠 Un 90% de las funciones explicadas a detalle
- `getAlumnoAll`: Va a leer el JSON de alumnos (`alumnos.json`) de forma asíncrona. Si todo sale joya, te escupe la lista completa con un `Status 200`. Si hay bardo, te tira un `500`.
- `getAlumnoById`: Pesca el `id` que mandás por la URL, se pone a buscar al alumno en el arreglo y te lo devuelve. Si no lo juna (no existe), te tira un `404` por la cabeza.
- `postAlumno`: Agarra la data que viene en el `body`, se fija que el legajo no exista ya (si existe tira `409`). Después pasa la validación de POO instanciando `AlumnoModel`. Si está todo ok, lo empuja al arreglo (`push`), guarda el archivo JSON y te devuelve un `201` (Creado).
- `putAlumno`: Agarra el `id` de la URL, busca al chabón. Le pisa los datos viejos con los nuevos (sin dejar que modifiques el legajo original). Lo pasa por el filtro de `AlumnoModel` y si pasa la validación, sobreescribe el JSON y tira `200`.
- `deleteAlumno`: Busca el índice del loquito según el legajo. Le mete un `splice()` fiero para borrarlo del mapa, guarda el JSON actualizado y chau picho (`Status 200`).
- `validarCampos` (Middleware): Usa `express-validator` para fijarse si alguno de los `check` de las rutas tiró error. Si hay quilombo, corta todo con un `400` antes de que llegue al controlador.

## 📦 Documentación con 'Postman' de todos los métodos
Acá está la colección re prolija con todos los métodos (GET, PUT, DELETE, POST) para que los pruebes:
👉 **[Reemplazar por el Link a la colección de Postman publicada]**

## 📄 Mínimo un ejemplo de la estructura de cada archivo JSON utilizado
Ojo, este es el esqueleto de UN solo objeto (no integramos varios "arrays" en un mismo archivo, somos ordenados). Así se ve la estructura de un alumno adentro de `data/alumnos.json`:
```json
{
  "legajo": 10001,
  "nombre": "Mora",
  "apellido": "García",
  "email": "m.garcia@facultad.edu.ar",
  "fechaAlta": "2026-03-02",
  "modificacion": "2026-03-02",
  "isActive": true
}
```

## 🌐 Link del deploy en Render
La API ya está subida y laburando en la nube:
👉 **[Reemplazar por el Link del Deploy en Render]**

## 🖥️ Link al repositorio con el front-end
*(Si tienen repo para el front-end, manden el link acá)*
👉 **[Reemplazar por el Link al repositorio del Front-end]**
