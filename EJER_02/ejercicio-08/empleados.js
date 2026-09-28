const empleados = [
    {
        id: 1,
        nombre: "Juan",
        departamento: "Informática",
        salario: 22000
    },
    {
        id: 2,
        nombre: "María",
        departamento: "Ventas",
        salario: 20000
    },
    {
        id: 3,
        nombre: "Pedro",
        departamento: "Informática",
        salario: 25000
    },
    {
        id: 4,
        nombre: "Laura",
        departamento: "Recursos Humanos",
        salario: 23000
    },
    {
        id: 5,
        nombre: "Carlos",
        departamento: "Ventas",
        salario: 21000
    }
]

function agregarEmpleado(empleado) {
    empleados.push(empleado)
}

function eliminarEmpleado(id) {
    const indice = empleados.findIndex(function(empleado) {
        return empleado.id === id
    })

    empleados.splice(indice, 1)
}

function buscarPorDepartamento(departamento) {
    const resultado = empleados.filter(function(empleado) {
        if(empleado.departamento === departamento) {
            return empleado
        }
    })

    return resultado
}

function calcularSalarioPromedio() {
    const total = empleados.reduce(function(total, empleado) {
        return total + empleado.salario
    }, 0)

    return total / empleados.length
}

function obtenerEmpleadosOrdenadosPorSalario() {
    const resultado = [...empleados]

    function compare(empleado1, empleado2) {
        if(empleado1.salario < empleado2.salario) {
            return 1
        } else if(empleado1.salario > empleado2.salario) {
            return -1
        } else {
            return 0
        }
    }

    resultado.sort(compare)

    return resultado
}

export {
    agregarEmpleado,
    eliminarEmpleado,
    buscarPorDepartamento,
    calcularSalarioPromedio,
    obtenerEmpleadosOrdenadosPorSalario
}