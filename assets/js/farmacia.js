const contenedor = document.getElementById('contenedorCartas')
const contenedorFiltro = document.getElementById('divCheck')
const input = document.getElementById('searchEvento')

import { mostrarProductos } from '../modules/funciones.js'
import { filtrarPorMascota } from '../modules/funciones.js'
import { filtrarPorNombre } from '../modules/funciones.js'
import { mostrarCardError2 } from '../modules/funciones.js'

fetch('https://mindhub-xj03.onrender.com/api/petshop')
    .then ( response => response.json() )
    .then ( response => {
        const arrayProductos = response
        console.log(arrayProductos)
        mostrarProductos ( arrayProductos, contenedor, "farmacia")
        contenedorFiltro.addEventListener( 'input', e => {
            e.preventDefault()
            const checked = document.querySelectorAll('input[type=checkbox]:checked')
            const arrayChecked = Array.from( checked ).map( checkbox => checkbox.value)
            const filtradoCategorias = filtrarPorMascota ( arrayProductos, arrayChecked)
            const filtradoNombre = filtrarPorNombre ( filtradoCategorias, input.value)
            if ( filtradoNombre.length == 0 ){
                mostrarCardError2(contenedor)
            } else {
                mostrarProductos ( filtradoNombre, contenedor, "farmacia" )
            }
        })
    })
    .catch( error => console.log(error) )