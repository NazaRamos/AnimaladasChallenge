const mainCarrito = document.getElementById('mainCarrito')

let carrito = JSON.parse( localStorage.getItem( "carrito" ) ) || []

import { mostrarProductosCarrito } from '../modules/funciones.js'

fetch('https://mindhub-xj03.onrender.com/api/petshop')
.then ( response => response.json() )
.then ( response => {
    const arrayProductos = response
    console.log(arrayProductos)
    if (carrito.length === 0){
            mainCarrito.innerHTML = '<h2 id="mensajeCarritoVacio" class="mt-5 p-4" >Parece que tu carrito esta vacio.</h2>'
        } else {
            mostrarProductosCarrito ( carrito, mainCarrito )            
        }    
    })
    .catch( error => console.log(error) )