const contenedor = document.getElementById('contenedorCartas2')
const contenedorFiltro = document.getElementById('divCheck')
const input = document.getElementById('searchEvento')
const main = document.getElementById('mainJugueteria')

import { mostrarProductos } from '../modules/funciones.js'
import { filtrarPorMascota } from '../modules/funciones.js'
import { filtrarPorNombre } from '../modules/funciones.js'
import { mostrarCardError2 } from '../modules/funciones.js'

let arrayProductos = []
let carrito = JSON.parse( localStorage.getItem( "carrito" ) ) || []

fetch('https://mindhub-xj03.onrender.com/api/petshop')
    .then ( response => response.json() )
    .then ( response => {
        arrayProductos = response
        mostrarProductos ( arrayProductos, contenedor, "jugueteria")
    })
    .catch( error => console.log(error) )

contenedorFiltro.addEventListener( 'input', ev => {
    ev.preventDefault()
    const checked = document.querySelectorAll('input[type=checkbox]:checked')
    const arrayChecked = Array.from( checked ).map( checkbox => checkbox.value)
    const filtradoCategorias = filtrarPorMascota ( arrayProductos, arrayChecked)
    const filtradoNombre = filtrarPorNombre ( filtradoCategorias, input.value)
    if ( filtradoNombre.length == 0 ){
        mostrarCardError2(contenedor)
    } else {
        mostrarProductos ( filtradoNombre, contenedor, "jugueteria" )
    }
})

main.addEventListener( 'click', e => {
    const idSeleccionado = e.target.dataset.id
    if ( idSeleccionado ){
        let productoSeleccionado = arrayProductos.find( producto => producto._id == idSeleccionado )
        if ( productoSeleccionado.disponibles > 0 ){
            const articulo = carrito.find( favorito => favorito._id == idSeleccionado )
            if ( articulo ){
                const indicePersonaje = carrito.findIndex( favorito => favorito._id == idSeleccionado)
                carrito.splice( indicePersonaje, 1)
            } else {
                const productoFavorito = arrayProductos.find( producto => producto._id == idSeleccionado )
                carrito.push(productoFavorito)
            }
            e.target.classList.toggle( 'text-warning' )
            localStorage.setItem( "carrito", JSON.stringify(carrito) )
        }
    }
})