const main = document.getElementById('main')

function crearCard ( producto ){
    return `<section class="card col-11 col-sm-3">
    <img class="card-img-top img-fluid" src="${producto.imagen}" alt="">
    <div class="card-body d-flex flex-column">
        <h2 class="card-title">${producto.producto}</h2>
        <p class="card-text">Disponibles: ${producto.disponibles}</p>
        <div class="d-flex justify-content-around align-items-center">
            <h3 class="card-title">$${producto.precio}</h3>
            <a class="btn btn-danger" href="../pages/details.html?id=${producto._id}">Details</a>
        </div>
    </div>
</section>`
}

function mostrarProductos ( productos, contenedor, categoria ){
    let template = ''
    let productosAMostrar = productos.filter( productoActual => productoActual.categoria === categoria )
    console.log(productosAMostrar)
    for ( let producto of productosAMostrar ){
        template += crearCard(producto)
    }
    contenedor.innerHTML = template
}

fetch('https://mindhub-xj03.onrender.com/api/petshop')
    .then ( response => response.json() )
    .then ( response => {
        const arrayProductos = response
        console.log(arrayProductos)
        mostrarProductos ( arrayProductos, main, "jugueteria")
    })
    .catch( error => console.log(error) )