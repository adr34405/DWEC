// tienda.js
// Ejercicio integrador UT 2.1 + UT 2.2: Tienda de música
//
// Completa cada función. No cambies su nombre ni sus parámetros.
// Comprueba tu trabajo con:  node pruebas.js
// Cuando todo esté en verde:  node main.js
//
// Recuerda: salvo en la PARTE 5, las funciones NO deben modificar
// los arrays que reciben. Si necesitas ordenar, copia primero.

// ================================================================
// PARTE 1 · EL CATÁLOGO
// ================================================================

// 1.1 Convierte la matriz [[nombre, categoria, precio, stock], ...]
//     en un array de objetos { nombre, categoria, precio, stock }.
//     Si lo que recibe no es un array, devuelve [].
export const crearCatalogo = (matriz) => {
  if (!Array.isArray(matriz)) {
    return [];
  }
  return matriz.map((fila) => ({ nombre: fila[0], categoria: fila[1], precio: fila[2], stock: fila[3] }));
};

// 1.2 Devuelve un catálogo NUEVO con las novedades (que llegan en
//     formato matriz) añadidas al final.
export const ampliarCatalogo = (catalogo, matrizNovedades) => {
  return catalogo.concat(crearCatalogo(matrizNovedades));
};

// 1.3 Devuelve los nombres de todos los productos en orden
//     alfabético, respetando las tildes ('Vinilo Ópera' va tras 'Vinilo Jazz').
export const nombresOrdenados = (catalogo) => {
  return catalogo.map((p) => p.nombre).sort((a, b) => a.localeCompare(b));
};

// 1.4 Devuelve una COPIA del catálogo ordenada por precio,
//     de menor a mayor o, si descendente es true, de mayor a menor.
export const ordenarPorPrecio = (catalogo, descendente = false) => {
  const copia = [...catalogo].sort((a, b) => a.precio - b.precio);
  if (descendente) {
    return copia.reverse();
  }
  return copia;
};

// 1.5 Devuelve los nombres de los tres productos más baratos.
export const tresMasBaratos = (catalogo) => {
  return ordenarPorPrecio(catalogo).slice(0, 3).map((p) => p.nombre);
};

// ================================================================
// PARTE 2 · BÚSQUEDAS
// ================================================================

// 2.1 Devuelve el producto con ese nombre, sin distinguir mayúsculas
//     y minúsculas, o undefined si no existe.
export const buscarProducto = (catalogo, nombre) => {
  return catalogo.find((p) => p.nombre.toLowerCase() === nombre.toLowerCase());
};

// 2.2 Devuelve true si existe un producto con ese nombre.
//     Obligatorio: usa includes.
export const existeProducto = (catalogo, nombre) => {
  return catalogo.map((p) => p.nombre.toLowerCase()).includes(nombre.toLowerCase());
};

// 2.3 Devuelve la posición del producto en el catálogo, o -1.
export const posicionProducto = (catalogo, nombre) => {
  return catalogo.findIndex((p) => p.nombre.toLowerCase() === nombre.toLowerCase());
};

// 2.4 Devuelve un array con los NOMBRES de los productos sin stock.
export const agotados = (catalogo) => {
  return catalogo.filter((p) => p.stock === 0).map((p) => p.nombre);
};

// 2.5 Devuelve los productos con precio entre minimo y maximo
//     (ambos incluidos).
export const productosEntre = (catalogo, minimo, maximo) => {
  return catalogo.filter((p) => p.precio >= minimo && p.precio <= maximo);
};

// ================================================================
// PARTE 3 · CÁLCULOS
// ================================================================

// 3.1 Valor total del almacén: suma de precio × stock.
export const valorAlmacen = (catalogo) => {
  return catalogo.reduce((total, p) => total + p.precio * p.stock, 0);
};

// 3.2 Devuelve el producto (el objeto completo) más caro.
export const productoMasCaro = (catalogo) => {
  return catalogo.reduce((caro, p) => (p.precio > caro.precio ? p : caro));
};

// 3.3 Devuelve un objeto con las unidades en stock de cada categoría:
//     { equipos: 7, accesorios: 29, discos: 14 }
export const unidadesPorCategoria = (catalogo) => {
  return catalogo.reduce((acc, p) => {
    acc[p.categoria] = (acc[p.categoria] || 0) + p.stock;
    return acc;
  }, {});
};

// 3.4 Devuelve true si hay AL MENOS un producto agotado.
export const hayAgotados = (catalogo) => {
  return catalogo.some((p) => p.stock === 0);
};

// 3.5 Devuelve true si TODOS los precios son números mayores que 0.
export const preciosValidos = (catalogo) => {
  return catalogo.every((p) => typeof p.precio === 'number' && p.precio > 0);
};

// ================================================================
// PARTE 4 · PEDIDOS
// ================================================================

// 4.1 Convierte el texto 'Lucía|Tocadiscos:1;Vinilo Jazz:2' en:
//     {
//       cliente: 'Lucía',
//       lineas: [
//         { nombre: 'Tocadiscos', cantidad: 1 },
//         { nombre: 'Vinilo Jazz', cantidad: 2 },
//       ],
//     }
//     ¡Ojo! La cantidad debe ser un número, no un string.
export const parsearPedido = (texto) => {
  const partes = texto.split('|');
  const lineas = partes[1].split(';').map((linea) => {
    const datos = linea.split(':');
    return { nombre: datos[0], cantidad: Number(datos[1]) };
  });
  return { cliente: partes[0], lineas };
};

// 4.2 Devuelve true si TODOS los productos del pedido existen
//     y tienen stock suficiente.
export const puedeServirse = (catalogo, pedido) => {
  return pedido.lineas.every((linea) => {
    const producto = buscarProducto(catalogo, linea.nombre);
    return producto !== undefined && producto.stock >= linea.cantidad;
  });
};

// 4.3 Devuelve el importe total del pedido.
export const totalPedido = (catalogo, pedido) => {
  return pedido.lineas.reduce((total, linea) => {
    return total + buscarProducto(catalogo, linea.nombre).precio * linea.cantidad;
  }, 0);
};

// 4.4 Devuelve un catálogo NUEVO en el que se ha restado del stock
//     la cantidad pedida de cada producto. El original no cambia.
//     Pista: { ...producto, stock: nuevoStock } crea una copia del objeto.
export const servirPedido = (catalogo, pedido) => {
  return catalogo.map((producto) => {
    const linea = pedido.lineas.find((l) => l.nombre.toLowerCase() === producto.nombre.toLowerCase());
    if (linea) {
      return { ...producto, stock: producto.stock - linea.cantidad };
    }
    return { ...producto };
  });
};

// 4.5 Devuelve el ticket del pedido como un único texto:
//     Cliente: Lucía
//     1 x Tocadiscos = 200 €
//     2 x Vinilo Jazz = 60 €
//     TOTAL: 260 €
//     Pista: construye un array de líneas y únelas con '\n'.
export const generarTicket = (catalogo, pedido) => {
  const lineas = pedido.lineas.map((linea) => {
    const importe = buscarProducto(catalogo, linea.nombre).precio * linea.cantidad;
    return `${linea.cantidad} x ${linea.nombre} = ${importe} €`;
  });
  return [`Cliente: ${pedido.cliente}`, ...lineas, `TOTAL: ${totalPedido(catalogo, pedido)} €`].join('\n');
};

// ================================================================
// PARTE 5 · COLA DE PEDIDOS Y CARRITO CON "DESHACER"
// En esta parte SÍ se modifican los arrays recibidos.
// ================================================================

// 5.1 COLA (el primero que llega es el primero en salir):
//     saca y devuelve el primer pedido de la cola.
export const atenderSiguiente = (cola) => {
  return cola.shift();
};

// 5.2 Coloca el pedido al PRINCIPIO de la cola y devuelve
//     la nueva longitud de la cola.
export const agregarUrgente = (cola, pedido) => {
  return cola.unshift(pedido);
};

// 5.3 Añade el nombre al final del carrito y apunta la acción en el
//     historial: { accion: 'agregar', nombre }
export const agregarAlCarrito = (carrito, historial, nombre) => {
  carrito.push(nombre);
  historial.push({ accion: 'agregar', nombre });
};

// 5.4 Quita la PRIMERA aparición del nombre en el carrito y apunta en
//     el historial: { accion: 'quitar', nombre, posicion }
//     Devuelve true, o false (sin tocar nada) si no estaba.
export const quitarDelCarrito = (carrito, historial, nombre) => {
  const posicion = carrito.indexOf(nombre);
  if (posicion === -1) {
    return false;
  }
  carrito.splice(posicion, 1);
  historial.push({ accion: 'quitar', nombre, posicion });
  return true;
};

// 5.5 PILA (la última acción es la primera en deshacerse):
//     saca la última acción del historial y la revierte:
//     - si fue 'agregar', quita la ÚLTIMA aparición de ese nombre;
//     - si fue 'quitar', vuelve a insertarlo en su posición original.
//     Devuelve true, o false si el historial estaba vacío.
export const deshacer = (carrito, historial) => {
  if (historial.length === 0) {
    return false;
  }
  const ultima = historial.pop();
  if (ultima.accion === 'agregar') {
    carrito.splice(carrito.lastIndexOf(ultima.nombre), 1);
  } else {
    carrito.splice(ultima.posicion, 0, ultima.nombre);
  }
  return true;
};

// ================================================================
// PARTE 6 · INFORME FINAL
// ================================================================

// 6.1 Atiende uno a uno (con atenderSiguiente) todos los pedidos de la
//     cola. Si puede servirse, actualiza el catálogo con servirPedido y lo
//     guarda en servidos; si no, en rechazados. Al terminar la cola queda vacía.
//     Devuelve { catalogo, servidos, rechazados }
export const procesarCola = (catalogo, cola) => {
  let actual = catalogo;
  const servidos = [];
  const rechazados = [];
  while (cola.length > 0) {
    const pedido = atenderSiguiente(cola);
    if (puedeServirse(actual, pedido)) {
      actual = servirPedido(actual, pedido);
      servidos.push(pedido);
    } else {
      rechazados.push(pedido);
    }
  }
  return { catalogo: actual, servidos, rechazados };
};

// 6.2 Recibe un array de pedidos y devuelve los nombres de los productos
//     vendidos, SIN repetidos y en orden alfabético.
export const productosVendidos = (pedidos) => {
  return pedidos
    .map((pedido) => pedido.lineas.map((linea) => linea.nombre))
    .flat()
    .filter((nombre, i, todos) => todos.indexOf(nombre) === i)
    .sort((a, b) => a.localeCompare(b));
};

// 6.3 Devuelve un array de textos con una barra por producto:
//     'Altavoz: ■■■ (3)'
//     Obligatorio: crea la barra con new Array(...).fill('■')
export const graficoStock = (catalogo) => {
  return catalogo.map((p) => `${p.nombre}: ${new Array(p.stock).fill('■').join('')} (${p.stock})`);
};
