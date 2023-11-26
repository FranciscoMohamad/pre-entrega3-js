                // Cargamos los productos a travez de JS

const contenedorProductos = document.querySelector("#contenedor-productos")
const botonNavegador = document.querySelectorAll(".boton-nav")
const tituloPrincipal = document.querySelector("#Titulo")
let botonAgregar = document.querySelectorAll(".producto-agregar")
const numerito = document.querySelector("#numerito")


//Creo una funcion que primero limpia el dom y luego genera los productos deseados

function cargarProductos (productosElegidos) {

    contenedorProductos.innerHTML = ""

    productosElegidos.forEach(product => {

        const div = document.createElement("div")
        div.classList.add("producto")
        div.innerHTML = `
        <img class="producto-imagen" src="${product.image}" alt="${product.title}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${product.title}</h3>
            <p class="producto-precio">$${product.price}</p>
            <button class="producto-agregar" id="${product.id}">Agregar</button>
        </div>

        `
        contenedorProductos.append(div)
    })
    generarBotones()
    console.log(botonAgregar)
}

cargarProductos(products)

//  Comparo la categoria del array con el id de los botones del nav, y en base a eso se generan los productos deseados.

botonNavegador.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonNavegador.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active")

        if (e.currentTarget.id != "Todos") {

            const productoCategoria = products.filter(product => product.category === e.currentTarget.id)
            tituloPrincipal.innerText = e.currentTarget.id

            const productsBoton = products.filter(product => product.category === e.currentTarget.id)
            cargarProductos(productsBoton)
        }else {
            tituloPrincipal.innerText = "Productos"
            cargarProductos(products)
        }
        
    })
})

// creo una funcion para actualizar los botones "agregar" de los productos, debido a que estan generados desde js.

function generarBotones() {
    botonAgregar = document.querySelectorAll(".producto-agregar")
    botonAgregar.forEach(boton => {
        boton.addEventListener ("click", agregarAlCarrito)
    })
}

let productosEnCarrito
let nuevoNumerito

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS)
    sumarNumerito()
}else {
    productosEnCarrito = []
}

//funcion del boton agregar

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id
    const productoAgregado = products.find(product => product.id == idBoton)

    if(productosEnCarrito.some(product => product.id == idBoton)) {
        const index = productosEnCarrito.findIndex(product => product.id == idBoton)
        productosEnCarrito[index].cantidad++
    }else {
        productoAgregado.cantidad = 1
        productosEnCarrito.push(productoAgregado)
    }
    sumarNumerito()
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

function sumarNumerito() {
    let numeroSumado = productosEnCarrito.reduce((acc, product) => acc + product.cantidad, 0)
    numerito.innerText = numeroSumado
}