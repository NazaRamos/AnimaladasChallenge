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
    contenedor.innerHTML = `<section class="card col-11 col-4">
    <div class="card-body d-flex flex-column">
    <img class="card-img img-fluid" src="../images/oops-png-4-1024x1024.png" class="card-img-top" alt="..." />
        <h2 class="card-title">No se han encontrado resultados.</h2>
        <div class="d-flex justify-content-around align-items-center">
            <h5 class="card-title">Intentalo de nuevo</h5>
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