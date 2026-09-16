const coche = {
   marca: "Seat",
   modelo: "Ibiza",
   año: "2011",
   estaDisponible: false
}
const {marca, modelo} = coche
console.log(marca, modelo)
coche.estaDisponible = true
coche.color = "rojo"
delete coche.año 
console.log(coche)
