const contenedor = document.getElementById('contenedorCartas3')

let parametroProducto = location.search

let objetoURLSearchParam = new URLSearchParams(parametroProducto)

let objetoID = objetoURLSearchParam.get("_id")

fetch("https://mindhub-xj03.onrender.com/api/petshop")
.then(response => response.json())
.then(datos => {
    console.log(datos)
    let arrayProductosDetails = datos
    console.log(arrayProductosDetails)
    let productoID = arrayProductosDetails.find( objeto => objeto._id == objetoID )
    console.log(productoID)
    let estructuraHTML = crearTarjeta(productoID)
    renderizarTarjeta(contenedorCartas3, estructuraHTML)
})

function crearTarjeta(objeto){
    return `<section class="card" style="width: 18rem;">
                <img src="${objeto.imagen}" class="card-img-top" alt="school_book_fair">
                <div class="card-body d-flex flex-column align-items-center text-center">
                    <h5 class="card-title">${objeto.producto}</h5>
                    <p class="card-text">${objeto.descripcion}</p>
                    <p>Categoria: ${objeto.categoria}</p>
                </div>
                <div class="card-body d-flex flex-column justify-content-around align-items-center">
                    <p>Precio: $${objeto.precio}</p>
                    <p>Disponibles: ${objeto.disponibles}</p>
                </div>
            </section>`
}

function renderizarTarjeta(contenedorHTML, string){
    contenedorHTML.innerHTML = string
}

/*

function crearTarjeta(objeto){
    return `<section class="card" style="width: 18rem;">
                <img src="${objeto.image}" class="card-img-top" alt="school_book_fair">
                <div class="card-body d-flex flex-column align-items-center text-center">
                    <h5 class="card-title">${objeto.name}</h5>
                    <p class="card-text">${objeto.description}</p>
                    <p>${objeto.category}</p>
                </div>
                <div class="card-body d-flex flex-column justify-content-around align-items-center">
                    <p>Price: $${objeto.price}</p>
                    <p>Date: ${objeto.date}</p>
                    <p>Location: ${objeto.place}</p>
                    <p>${objeto.assistance?(`Assistance: ${objeto.assistance}`):(`Estimate: ${objeto.estimate}`)}</p>
                    <p>Capacity: ${objeto.capacity}</p>
                </div>
            </section>`
}

function renderizarTarjeta(contenedorHTML, string){
    contenedorHTML.innerHTML = string
}
*/