//declaracion de lets y const

let productosEnCarrito = localStorage.getItem("productos-en-carrito")
productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
let botonesEliminar = document.querySelectorAll(".carrit-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar")
const botonComprar = document.querySelector("#carrito-acciones-comprar")
const contenedorTotal = document.querySelector("#total")


function cargarProductosCarrito () {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    
        contenedorCarritoProductos.innerHTML = ""
    
        //por cada producto generamos un div con su imagen e informacion
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
        contenedorCarritoVacio.classList.remove("disabled")
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    }
    generarBotonesEliminar()
    actualizarTotal()
}

cargarProductosCarrito()

function generarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")

    botonesEliminar.forEach(boton => {
        boton.addEventListener ("click", eliminarDelCarrito)
    })
}

//funcion del boton eliminar

function eliminarDelCarrito (e) {
    const idBoton = e.currentTarget.id
    const index = productosEnCarrito.findIndex(product => product.id == idBoton)
    productosEnCarrito.splice(index,1)

    cargarProductosCarrito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

//eliminar todo el carrito

botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito() {
    productosEnCarrito.length = 0
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    cargarProductosCarrito()
}

botonComprar.addEventListener("click", comprarCarrito)

function comprarCarrito() {
    productosEnCarrito.length = 0
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    
    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.remove("disabled")
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, product)=> acc + (product.price * product.cantidad), 0)
    total.innerText =`$${totalCalculado}`
}