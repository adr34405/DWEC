import {
    agregarLibro,
    obtenerLibros,
    buscarLibro,
    eliminarLibro
} from "./biblioteca.js"

console.log(obtenerLibros())

const libroBuscado = buscarLibro(5)

console.log(libroBuscado)

eliminarLibro(5)

console.log(obtenerLibros())