const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"))

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")

if (productosEnCarrito) {
    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.remove("disabled")
    contenedorCarritoAcciones.classList.remove("disabled")
    contenedorCarritoComprado.classList.add("disabled")

    productosEnCarrito.forEach(products => {
        const div = document.createElement("div")
        div.classList.add("carrito-producto")
        div.innerHTML = `    
        <img class="carrito-producto-img" src="${products.image}" alt="${products.title}">
        <div class="carrito-producto-titulo">
            <small>Titulo</small>
            <h3>${products.title}</h3>
        </div>
        <div class="carrito-producto-cantidad">
            <small>cantidad</small>
            <p>${products.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
            <small>precio</small>
            <p>${products.price}</p>
        </div>
        <div class="carrito-producto-subtotal">
            <small>subtotal</small>
            <p>${products.price * products.cantidad}</p>
        </div>
        <button class="carrito-producto-eliminar" id="${products.id}"><i class="bi bi-trash-fill"></i></button>
`
        contenedorCarritoProductos.append(div)
    })
    
}else {

}