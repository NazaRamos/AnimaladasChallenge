const mainCarrito = document.getElementById('mainCarrito')

let carrito = JSON.parse( localStorage.getItem( "carrito" ) ) || []

import { mostrarProductosCarrito } from '../modules/funciones.js'

fetch('https://mindhub-xj03.onrender.com/api/petshop')
    .then ( response => response.json() )
    .then ( response => {
        const arrayProductos = response
        console.log(arrayProductos)
        mostrarProductosCarrito ( carrito, mainCarrito )
    })
    .catch( error => console.log(error) )