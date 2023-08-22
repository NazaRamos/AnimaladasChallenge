function crearCard ( producto ){
    let carrito = JSON.parse( localStorage.getItem( "carrito" ) ) || []
    const car = carrito.some( item => item._id == producto._id) ? "text-warning" : ""
    return `<div class="card shadow mb-5 bg-body-tertiary rounded" style="width: 18rem">
    <h6 class="mensajeUltimasUnidades">Ultimas unidades!</h6>
    <img class="card-img img-fluid" src="${producto.imagen}" class="card-img-top" alt="..." />
    <div class="card-body">
        <h6 class="card-title" id="producto">${producto.producto}</h6>
        <p class="card-text" id="precio">$${producto.precio}</p>
        <a href="./detalles.html?_id=${producto._id}" class="btn btn-primary" id="boton">Ver detalles</a>
        <svg class="carritoIcono ${car}" data-id='${producto._id}' xmlns="http://www.w3.org/2000/svg" width="16" height="16"
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
    for ( let producto of productosAMostrar ){
        if(producto.disponibles <= 5 && producto.disponibles > 0){
            template += crearCard(producto)
        } else if (producto.disponibles > 5){
            template += crearCard(producto).replace('<h6 class="mensajeUltimasUnidades">Ultimas unidades!</h6>', "")
        } else if (producto.disponibles === 0) {
            template += crearCard(producto).replace('<h6 class="mensajeUltimasUnidades">Ultimas unidades!</h6>', '<h6 class="mensajeAgotado">Agotado!</h6>')
        }
    }
    contenedor.innerHTML = template
}

export function filtrarPorMascota ( productos, array ){
    if ( array.length == 0 ){
        return productos
    } else {
        const filtrado = productos.filter( producto => {
            if ( array.includes('perros') && array.includes('gatos')){
                return true
            } else if ( array.includes('perros')){
                return producto.producto.includes( array ) || producto.producto.includes ('cachorros') || producto.producto.includes('Cepillo') || producto.producto.includes('Hueso') || producto.producto.includes('pelota')
            } else if (array.includes('gatos')){
                return producto.producto.includes( array ) || producto.producto.includes( 'gatitos' ) || producto.producto.includes('Cepillo') || producto.producto.includes('Rata') || producto.producto.includes('Peluche')
            }
        })
        return filtrado
    }
}

export function filtrarPorNombre ( productos, nombre){
    const filtrado = productos.filter( producto => producto.producto.toLowerCase().includes ( nombre.toLowerCase() ) )
    return filtrado
}

export function mostrarCardError2 (contenedor){
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

function crearCardCarrito(producto) {
    return `<div class="cart-card position-relative">
    <div class="item">
      <img class="botonBorradoProducto" data-botonborrar='${producto._id}' src="../images/x_circle_icon_174835.png" alt="">
      <img class="item-image" src="${producto.imagen}" alt="">
      <div class="item-details d-flex flex-column">
        <span class="item-name">${producto.producto}</span>
        <span class="item-price">$${producto.precio}</span>
        <input class="item-quantity" id="${producto._id}" data-input="${producto._id}" type="number" min="1" max="${producto.disponibles}" value="1">
        <div class="max-quantity-message" style="color: red;"></div>
      </div>
    </div>
  </div>`;
}

function updateMaxQuantityMessage(inputElement) {
    const productId = inputElement.getAttribute("data-input");
    const maxQuantity = parseInt(inputElement.getAttribute("max"));
    const currentQuantity = parseInt(inputElement.value);
    const messageElement = inputElement.parentElement.querySelector(".max-quantity-message");

    if (currentQuantity > maxQuantity) {
        messageElement.textContent = `Lo sentimos, de momento contamos solamente con ${maxQuantity} unidades.`;
    } 
    else if (currentQuantity === maxQuantity) {
        messageElement.textContent = `Lo sentimos, de momento contamos solamente con ${maxQuantity} unidades.`;
    }
    else {
        messageElement.textContent = "";
    }
}

document.addEventListener("input", function (event) {
    if (event.target.classList.contains("item-quantity")) {
        updateMaxQuantityMessage(event.target);
    }
});

document.addEventListener("change", function (event) {
    if (event.target.classList.contains("item-quantity")) {
        updateMaxQuantityMessage(event.target);
    }
});


export function mostrarProductosCarrito(productos, contenedor, total) {
    let template = ''
    for ( let producto of productos ){
        template += crearCardCarrito(producto)
    }
    template += 
    `<div class="total">Total: $${total}</div>
    <a href="#" class=" btn btn-primary" id="botonCompraRealizada">Comprar</a>`
    contenedor.innerHTML = template

    const botonCompraRealizada = document.getElementById('botonCompraRealizada')
    botonCompraRealizada.addEventListener('click', () => {
    divCarrito.innerHTML = '<h2 id="mensajeCarritoComprado" class="mt-5 p-4" >Tu compra ha sido un exito!</h2>'
    return divCarrito
})
}