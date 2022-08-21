const productos = [
    {
        id: 1,
        nombre: "3m",
        precio: 3000,
    },{
        id: 2,
        nombre: "bardahl",
        precio: 4000,
    },{
        id: 3,
        nombre: "bosch",
        precio: 5000,
    },
];

let contadorCarrito = 0;
const carrito = [];

const productoCatalogoHTML = (producto) => {
    return `<div class="card__brand"><img src="../img/productos/3m.png" alt="LOGO 3M">$ ${producto.precio}<button id= "btn-catalogo-${producto.id}" class="btn btn-success">AGREGAR</button></div>`;
};
const productoCarritoHTML = (producto) => {
    return `<div class="card__brand"><img src="../img/productos/3m.png" alt="LOGO 3M">$ ${producto.precio}<button id= "btn-carrito-${producto.idCompra}" class="btn btn-danger">QUITAR</button></div>`;
};




const mostrarCatalogo = () => {
    const catalogoNodo = document.getElementById("catalogo");
    let catalogoHTML = "";

    for(const producto of productos) {
        catalogoHTML += productoCatalogoHTML(producto);
    };
    catalogoNodo.innerHTML = catalogoHTML;
    botonesCatalogo();
};
const mostrarCarrito = () => {
    const carritoNodo = document.getElementById("carrito");
    const precioNodo = document.getElementById("precioTotal");
    let carritoHTML = "";
    let precio = 0;
    for(const producto of carrito) {
        carritoHTML += productoCarritoHTML(producto);
        precio += producto.precio;
    };
    precioNodo.innerHTML = precio;
    carritoNodo.innerHTML = carritoHTML;
    botonesCarrito();
};

const botonesCatalogo = () => {
    for(const producto of productos) {
        const botonId = `btn-catalogo-${producto.id}`;
        const botonNodo = document.getElementById(botonId);
        botonNodo.addEventListener("click", () => {
            const productoCarrito = {
                nombre: producto.nombre,
                precio: producto.precio,
                idCompra: contadorCarrito,
            };
            contadorCarrito += 1;
            carrito.push(productoCarrito);
            mostrarCarrito();
        });
    };
};
const botonesCarrito = () => {
    for(const producto of carrito) {
        const botonId = `btn-carrito-${producto.idCompra}`;
        const botonNodo = document.getElementById(botonId);
        botonNodo.addEventListener("click" , () => {
            const index = carrito.findIndex((p) => p.idCompra == producto.idCompra);
            carrito.splice(index, 1);
            mostrarCarrito();
        });
    };
};

mostrarCatalogo();

console.log(productoCatalogoHTML(productos[0]));