const productos = [
    {
        id: 1,
        nombre: "3m",
        precio: 3000,
        img:"../img/productos/3m.png"
    },{
        id: 2,
        nombre: "bardahl",
        precio: 4000,
        img:"../img/productos/bardahl.png"
    },{
        id: 3,
        nombre: "bosch",
        precio: 5000,
        img:"../img/productos/bosch.png"
    },{
        id: 4,
        nombre: "motul",
        precio: 800,
        img:"../img/productos/motul.png"
    },{
        id: 5,
        nombre: "castrol",
        precio: 9400,
        img:"../img/productos/castrol.png"
    },{
        id: 6,
        nombre: "elf",
        precio: 3200,
        img:"../img/productos/elf.png"
    },{
        id: 7,
        nombre: "gulf",
        precio: 1000,
        img:"../img/productos/gulf.png"
    },{
        id: 8,
        nombre: "ipone",
        precio: 6700,
        img:"../img/productos/ipone.png"
    },{
        id: 9,
        nombre: "liquimoly",
        precio: 200,
        img:"../img/productos/liquimoly.png"
    },{
        id: 10,
        nombre: "mobil",
        precio: 3500,
        img:"../img/productos/mobil.png"
    },{
        id: 11,
        nombre: "petronas",
        precio: 1100,
        img:"../img/productos/petronas.png"
    },{
        id: 12,
        nombre: "pirelli",
        precio: 2800,
        img:"../img/productos/pirelli.png"
    },{
        id: 13,
        nombre: "shell",
        precio: 4300,
        img:"../img/productos/shell.png"
    },{
        id: 14,
        nombre: "total",
        precio: 500,
        img:"../img/productos/total.png"
    },{
        id: 15,
        nombre: "valvoline",
        precio: 700,
        img:"../img/productos/valvoline.png"
    },{
        id: 16,
        nombre: "wagner",
        precio: 9700,
        img:"../img/productos/wagner.png"
    },{
        id: 17,
        nombre: "wynns",
        precio: 3400,
        img:"../img/productos/wynns.png"
    },{
        id: 18,
        nombre: "ypf",
        precio: 1500,
        img:"../img/productos/ypf.png"
    },
];

let contadorCarrito = 0;
let carrito = [];

let carritoLS = (clave, valor) => {localStorage.setItem(clave, valor)}

if (localStorage.getItem('carrito')) {
    carritoLS('carrito', JSON.stringify(carrito))
} else {
    carrito = []
};

const productoCatalogoHTML = (producto) => {
    return `
    <div class="card__brand">
        <img src="${producto.img}">
        <div class="btnGridPos">
            $ ${producto.precio}
            <button id= "btn-catalogo-${producto.id}" class="btn btn-success btnRadius">AGREGAR</button>
        </div>
    </div>`;
};
const productoCarritoHTML = (producto) => {
    return `
    <div class="card__brand-cart">
        <img src="${producto.img}">
        <div class="btnGridPos">
            $ ${producto.precio}
            <button id= "decrease-quantity-${producto.id}" class="btn btn-success btnSignos">-</button>
            <span style={display:'grid'}>${producto.quantity}</span>
            <button id= "add-quantity-${producto.id}" class="btn btn-success btnSignos">+</button>
            <button id= "btn-carrito-${producto.id}" class="btn btn-danger btnRadius">QUITAR</button>
        </div>
    </div>`;
};


const mostrarCatalogo = () => {
    const catalogoNodo = document.getElementById("catalogo");
    let catalogoHTML = "";

    for(const producto of productos) {
        catalogoHTML += productoCatalogoHTML(producto);
    };
    catalogoNodo.innerHTML = catalogoHTML;
    botonesCatalogo();
    checkCounterCart()
};

const mostrarCarrito = () => {
    const carritoNodo = document.getElementById("carrito");
    const precioNodo = document.getElementById("precioTotal");
    let carritoHTML = "";
    let precio = 0;
    for(const producto of carrito) {
        carritoHTML += productoCarritoHTML(producto);
        precio += producto.precio * producto.quantity;
    };
    precioNodo.innerHTML = precio;
    carritoNodo.innerHTML = carritoHTML;
    botonesCarrito();
};

const botonesCatalogo = () => {
    for(const producto of productos) {
        const botonNodo = document.getElementById(`btn-catalogo-${producto.id}`);

        botonNodo.addEventListener("click", () => {
            const productoCarrito = {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                img: producto.img,
                quantity: 1
            };
            // Check if item is in cart
            const indexProductCart = carrito.findIndex((elem) => elem.id === producto.id)
            if(indexProductCart >= 0) { // si existe
                const newCart = [...carrito]
                newCart[indexProductCart].quantity += 1
                carrito = newCart
                localStorage.setItem('carrito', JSON.stringify(carrito))
            } else { // si no existe
                carrito.push(productoCarrito);
                localStorage.setItem('carrito', JSON.stringify(carrito))
            }
            mostrarCarrito();
            checkCounterCart();
        });
    };
};


const checkCounterCart = () => {
    const totalCountNode = document.getElementById('total-count')
    let totalCart = 0;
    for(let item in carrito) {
        totalCart += carrito[item].quantity;
    }
    totalCountNode.innerHTML = `<span style="color:white">Total de productos: ${totalCart}</span>`;
}

const botonesCarrito = () => {
    for(const producto of carrito) {
        // Boton quitar del carrito
        const botonNodo = document.getElementById(`btn-carrito-${producto.id}`);
        // Boton agregar cantidad
        const botonAddNodo = document.getElementById(`add-quantity-${producto.id}`);
        // Boton disminur cantidad
        const botonDecNodo = document.getElementById(`decrease-quantity-${producto.id}`);

        // Evento agregar cantidad
        botonAddNodo.addEventListener('click', () => {
            const indexProductCart = carrito.findIndex((elem) => elem.id === producto.id)
            const newCart = [...carrito]
            newCart[indexProductCart].quantity += 1
            carrito = newCart
            localStorage.setItem('carrito', JSON.stringify(carrito))
            mostrarCarrito();
            checkCounterCart()
        })
        // Evento quitar cantidad
        botonDecNodo.addEventListener('click', () => {
            const indexProductCart = carrito.findIndex((elem) => elem.id === producto.id)
            const newCart = [...carrito]
            if(newCart[indexProductCart].quantity > 1){
                newCart[indexProductCart].quantity -= 1
                carrito = newCart
                localStorage.setItem('carrito', JSON.stringify(carrito))
            } else {
                const newCart = carrito.filter((elem) => elem.id !== producto.id)
                carrito = newCart
                localStorage.setItem('carrito', JSON.stringify(carrito))
            }
            
            mostrarCarrito();
            checkCounterCart()
        })
        // Evento remover
        botonNodo.addEventListener("click" , () => {
            const index = carrito.findIndex((p) => p.id == producto.id);
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito))
            mostrarCarrito();
            checkCounterCart()
        });
    };
};

mostrarCatalogo();
