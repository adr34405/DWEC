import {
    agregarEmpleado,
    eliminarEmpleado,
    buscarPorDepartamento,
    calcularSalarioPromedio,
    obtenerEmpleadosOrdenadosPorSalario
} from "./empleados.js"

const empleado1 = {
    id: 6,
    nombre: "Ana",
    departamento: "Informática",
    salario: 27000
}

const empleado2 = {
    id: 7,
    nombre: "David",
    departamento: "Ventas",
    salario: 24000
}

agregarEmpleado(empleado1)
agregarEmpleado(empleado2)

console.log(buscarPorDepartamento("Informática"))

console.log(calcularSalarioPromedio())

console.log(obtenerEmpleadosOrdenadosPorSalario())

eliminarEmpleado(2)

console.log(obtenerEmpleadosOrdenadosPorSalario())