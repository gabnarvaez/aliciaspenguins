let carrito = JSON.parse(localStorage.getItem("carrito")) || []; 



const productos = [
    {
        titulo: "Pinguino Africano",
        precio: 20,
        img: "img/01.jpg",
    },
    {
        titulo: "Pinguino Argentino",
        precio: 20,
        img: "img/pinguinoarg1.jpg",
    },
    {
        titulo: "Pinguino Australiano",
        precio: 20,
        img: "img/03.jpeg",
    },
    {
        titulo: "Pinguino Emperador",
        precio: 25,
        img: "img/emperardor.jpg",
    },
    {
        titulo: "Pinguino Cachorro",
        precio: 15,
        img: "img/cubpenguin.jpg",
    },
    {
        titulo: "Pinguino Madre",
        precio: 25,
        img: "img/mom&son.jpg",
    }
];

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");
const numerito = document.querySelector("#numerito");


productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="producto-img" src="${producto.img}" alt="${producto.titulo}">
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
    `;

    const btn = document.createElement("button");
    btn.classList.add("producto-btn");
    btn.innerText = "Agregar al carrito";

    btn.addEventListener("click", () => {
        agregarAlCarrito(producto);
    })

    div.append(btn);
    contenedorProductos.append(div);
})

function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>$${producto.precio}</p>
                <p>Cant: ${producto.cantidad}</p>
                <p>Subt: $${producto.cantidad * producto.precio}</p>
            `;

            const btnSumar = document.createElement("button");
            btnSumar.classList.add("carrito-producto-btn");
            btnSumar.innerText = "➕";
            btnSumar.addEventListener("click", () => {
                sumarDelCarrito(producto);
            })
            div.append(btnSumar);

            const btnRestar = document.createElement("button");
            btnRestar.classList.add("carrito-producto-btn");
            btnRestar.innerText = "➖";
            btnRestar.addEventListener("click", () => {
                restarDelCarrito(producto);
            })
            div.append(btnRestar);

            const btnEliminar = document.createElement("button");
            btnEliminar.classList.add("carrito-producto-btn");
            btnEliminar.innerText = "✖️";
            btnEliminar.addEventListener("click", () => {
                borrarDelCarrito(producto);
            })
            div.append(btnEliminar);

            carritoProductos.append(div);
        })
    }
    calcularNumerito();
    actualizarTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const agregarAlCarrito = (producto) => {
    const itemEncontrado = carrito.find(item => item.titulo === producto.titulo);
    if (itemEncontrado) {
        itemEncontrado.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    actualizarCarrito();

    Toastify({
        text: "Se ha agredado al carrito",
        duration: 1000,
        close: true,
        gravity: "bottom", 
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #217a8e)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

const borrarDelCarrito = (producto) => {
    const prodIndex = carrito.findIndex(item => item.titulo === producto.titulo);
    carrito.splice(prodIndex, 1);
    actualizarCarrito();
}

const sumarDelCarrito = (producto) => {
    producto.cantidad++;
    actualizarCarrito();
}

const restarDelCarrito = (producto) => {
    if (producto.cantidad === 1) {
        borrarDelCarrito(producto);
    } else { 
        producto.cantidad--;
    }
    actualizarCarrito();
}


const actualizarTotal = () => {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
}

const calcularNumerito = () => {
    const numeritoTotal = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    numerito.innerText = numeritoTotal;
}



function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode'); 
}

document.body.classList.remove('dark-mode');
