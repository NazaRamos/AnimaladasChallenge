function crearCard ( producto ){
    return `<div class="card" style="width: 18rem">
    <img class="card-img img-fluid" src="${producto.imagen}" class="card-img-top" alt="..." />
    <div class="card-body">
        <h6 class="card-title">${producto.producto}</h6>
        <p class="card-text">$${producto.precio}</p>
        <a href="./detalles.html?id=${producto._id}" class="btn btn-primary">Ver detalles</a>
        <svg class="carritoIcono" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
            <path
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
    </div>
</div>`
}

export function mostrarProductos ( productos, contenedor, categoria ){
    let template = ''
    let productosAMostrar = productos.filter( productoActual => productoActual.categoria === categoria )
    console.log(productosAMostrar)
    for ( let producto of productosAMostrar ){
        template += crearCard(producto)
    }
    contenedor.innerHTML = template
}