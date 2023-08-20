const contenedor = document.getElementById('contenedorCartas')
const contenedorFiltro = document.getElementById('divCheck')
const input = document.getElementById('searchEvento')

import { mostrarProductos } from '../modules/funciones.js'

function filtrarPorMascota ( productos, array ){
    if ( array.length == 0 ){
        return productos
    } else {
        const filtrado = productos.filter( producto => array.includes( producto.categoria ) )
        return filtrado
    }
}

function filtrarPorNombre ( productos, nombre){
    const filtrado = productos.filter( producto => producto.producto.toLowerCase().includes ( nombre.toLowerCase() ) )
    return filtrado
}

function mostrarCardError2 (contenedor){
    contenedor.innerHTML = `<section class="card col-11 col-sm-3">
    <div class="card-body d-flex flex-column">
        <h2 class="card-title">No results found</h2>
        <p class="card-text">We couldn't find what you searched for.</p>
        <div class="d-flex justify-content-around align-items-center">
            <h3 class="card-title">Try searching again</h3>
        </div>
    </div>
</section>`
}


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