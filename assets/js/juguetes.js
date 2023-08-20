const contenedor = document.getElementById('contenedorCartas2')

import { mostrarProductos } from '../modules/funciones.js'



fetch('https://mindhub-xj03.onrender.com/api/petshop')
    .then ( response => response.json() )
    .then ( response => {
        const arrayProductos = response
        console.log(arrayProductos)
        mostrarProductos ( arrayProductos, contenedor, "jugueteria")
    })
    .catch( error => console.log(error) )