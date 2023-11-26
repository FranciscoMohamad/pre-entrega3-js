// Cambio de color

const colorModeButton = document.querySelector("#color-mode")
const body = document.body
const ul = document.querySelector("#lista")
const hi = document.querySelector("#Titulo")
const carritoComprado = document.querySelector("#carrito-comprado")
const carritoVacio = document.querySelector("#carrito-vacio")
let modoNocturno = localStorage.getItem("modo-nocturno")

                //Funciones para activar/desactivar modo nocturno. Guardamos el dato en local storage

function activarModoNocturno() {
    carritoVacio.classList.add("color-white")
    carritoComprado.classList.add("color-white")
    body.classList.add("dark-mode")
    ul.classList.add("dark-mode")
    hi.classList.add("color-white")
    colorModeButton.classList.add("light-mode")
    colorModeButton.innerText = "Activar Modo Claro"
    localStorage.setItem("modo-nocturno", "activado")
}

function desactivarModoNocturno() {
    carritoVacio.classList.remove("color-white")
    carritoComprado.classList.remove("color-white")
    body.classList.remove("dark-mode")
    ul.classList.remove("dark-mode")
    hi.classList.remove("color-white")
    colorModeButton.classList.remove("light-mode")
    colorModeButton.innerText = "Activar Modo Nocturno"    
    localStorage.setItem("modo-nocturno", "desactivado")
}

                //Verificamos si modo nocturno esta activo o no segun el local storage

colorModeButton.addEventListener("click", () => {
    modoNocturno = localStorage.getItem("modo-nocturno")
    if (modoNocturno === "activado") {
        desactivarModoNocturno()
    }else {
        activarModoNocturno()
    }
})

                //mantenemos Modo elejido por el usuario

if (modoNocturno === "activado") {
    activarModoNocturno()
}else {
    desactivarModoNocturno()
}