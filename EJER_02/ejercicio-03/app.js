import { agregarLibro, obtenerLibros } from "./biblioteca.js"

console.log(obtenerLibros())

const nuevoLibro = {
    id: 11,
    titulo: "El nombre del viento",
    autor: "Patrick Rothfuss",
    paginas: 880
}

agregarLibro(nuevoLibro)

console.log(obtenerLibros())