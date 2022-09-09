
let contadorCarrito = 0;
let carrito = [];
let productos = []
let localStorageCart = localStorage.getItem('carrito')


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

const renderCatalog = async () => {
    const catalogoNodo = document.getElementById("catalogo");
    let catalogoHTML = "";

    // Llamar a los archivos desde un json mediante un fetch
    await fetch('../data/productos.json').then( async(res) => {
        // Esperar a que la promesa de la respuesta finalice
        const data = await res.json()
        productos = data
        
    }).catch((err) => {
        console.error(err)
    })
    for(const producto of productos) {
        catalogoHTML += productoCatalogoHTML(producto);
    };
    catalogoNodo.innerHTML = catalogoHTML;
    botonesCatalogo();
    checkCounterCart()
};

const renderCart = () => {
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
            // libreria de alertas
            Toastify({
                text: "Producto Agregado",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {background: "linear-gradient(to right, #2c3e50, #f55239)"},
                onClick: function(){} // Callback after click
            }).showToast();
            renderCart();
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
            renderCart();
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
            renderCart();
            checkCounterCart()
        })
        // Evento remover
        botonNodo.addEventListener("click" , () => {
            const index = carrito.findIndex((p) => p.id == producto.id);
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito))
            // libreria de alertas
            Toastify({
                text: "Producto Eliminado",
                duration: 3000,
                newWindow: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {background: "linear-gradient(to left, #bdc3c7, #f55239)"},
                onClick: function(){} // Callback after click
            }).showToast();
            renderCart();
            checkCounterCart()
        });
    };
};

renderCatalog();

if(localStorageCart) {
    carrito = JSON.parse(localStorageCart)
    renderCart()  
    checkCounterCart()
}





