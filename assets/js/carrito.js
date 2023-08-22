const mainCarrito = document.getElementById('mainCarrito')
const divCarrito = document.getElementById('divCarrito')

let carrito = JSON.parse( localStorage.getItem( "carrito" ) ) || []
let total = 0;
for ( let producto of carrito ){
    total += producto.precio
}

import { mostrarProductosCarrito } from '../modules/funciones.js'

fetch('https://mindhub-xj03.onrender.com/api/petshop')
    .then ( response => response.json() )
    .then ( response => {
        const arrayProductos = response
        if (carrito.length === 0){
                divCarrito.innerHTML = '<h2 id="mensajeCarritoVacio" class="mt-5 p-4" >Parece que tu carrito esta vacio.</h2>'
            } else {
                mostrarProductosCarrito ( carrito, divCarrito, total )            
            }
        })
    .catch( error => console.log(error) )

divCarrito.addEventListener( 'change', e => {
    e.preventDefault()
    const inputSeleccionado = e.target.dataset.input
    if ( inputSeleccionado ){
        total = 0
        const totalElement = divCarrito.querySelector(".total")
        const cantidadInputs = divCarrito.querySelectorAll(".item-quantity")
        for ( const [index, input] of cantidadInputs.entries() ) {
            const cantidad = parseInt(input.value)
            const valor = parseFloat(carrito[index].precio)
            total += cantidad * valor
        }
        totalElement.innerHTML = `Total: $${total}`
    }
})

mainCarrito.addEventListener( 'click', ev => {
    const botonSeleccionado = ev.target.dataset.botonborrar
    if ( botonSeleccionado ){
        const indicePersonaje = carrito.findIndex( favorito => favorito._id == botonSeleccionado)
        carrito.splice( indicePersonaje, 1)
        localStorage.setItem( "carrito", JSON.stringify(carrito) )
        mostrarProductosCarrito ( carrito, divCarrito, total )
        const cantidadInputs = divCarrito.querySelectorAll(".item-quantity")
        total = 0
        for ( const [index, input] of cantidadInputs.entries() ) {
            const cantidad = parseInt(input.value)
            const precio = parseFloat(carrito[index].precio)
            total += cantidad * precio
        }
        mostrarProductosCarrito ( carrito, divCarrito, total )
    }
})