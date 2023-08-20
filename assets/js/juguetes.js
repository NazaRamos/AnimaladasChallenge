const contenedor = document.getElementById('contenedorCartas2')

import { mostrarProductos } from '../modules/funciones.js'



fetch('https://mindhub-xj03.onrender.com/api/petshop')
    .then ( response => response.json() )
    .then ( response => {
        const arrayProductos = response
        console.log(arrayProductos)
        mostrarProductos ( arrayProductos, contenedor, "jugueteria")
        contenedorFiltro.addEventListener( 'input', e => {
            e.preventDefault()
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
    })
    .catch( error => console.log(error) )

    
function filtrarPorNombre ( productos, nombre){
    const filtrado = productos.filter( producto => producto.producto.toLowerCase().includes ( nombre.toLowerCase() ) )
    return filtrado
}

function filtrarPorMascota ( productos, array ){
    if ( array.length == 0 ){
        return productos
    } else {
        const filtrado = productos.filter( producto => array.includes( producto.categoria ) )
        return filtrado
    }
}