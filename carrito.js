// script.js

document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productosDiv = document.getElementById('productos');
    const carritoDiv = document.getElementById('carrito');
    const totalSpan = document.getElementById('total');

    // Función para guardar el carrito en localStorage
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para agregar productos al carrito
    function agregarAlCarrito(producto) {
        const item = carrito.find(item => item.id === producto.id);
        if (item) {
            item.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        guardarCarrito();
        actualizarCarrito();
    }

    // Función para actualizar el carrito
    function actualizarCarrito() {
        if (!carritoDiv) return;

        carritoDiv.innerHTML = '';
        let total = 0;

        carrito.forEach(item => {
            total += item.precio * item.cantidad;
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item-carrito');
            itemDiv.innerHTML = `
                <h4>${item.nombre}</h4>
                <p>Precio: $${item.precio.toFixed(2)}</p>
                <p>Cantidad: ${item.cantidad}</p>
                <button data-id="${item.id}">Eliminar</button>
            `;
            carritoDiv.appendChild(itemDiv);
        });

        totalSpan.textContent = total.toFixed(2);

        carritoDiv.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const id = parseInt(e.target.dataset.id);
                eliminarDelCarrito(id);
            }
        });
    }

    // Función para eliminar productos del carrito
    function eliminarDelCarrito(id) {
        const index = carrito.findIndex(item => item.id === id);
        if (index > -1) {
            carrito.splice(index, 1);
        }
        guardarCarrito();
        actualizarCarrito();
    }

    // Cargar productos en la página principal (index.html)
    if (productosDiv) {
        fetch('productos.json')
            .then(response => response.json())
            .then(data => {
                const productos = data.productos;
                productos.forEach(producto => {
                    const productoDiv = document.createElement('div');
                    productoDiv.classList.add('producto');
                    productoDiv.innerHTML = `
                        <h3>${producto.nombre}</h3>
                        <p>Precio: $${producto.precio.toFixed(2)}</p>
                        <a href="producto.html?id=${producto.id}">Ver más</a>
                        <button data-id="${producto.id}">Agregar al carrito</button>
                    `;
                    productosDiv.appendChild(productoDiv);
                });

                productosDiv.addEventListener('click', (e) => {
                    if (e.target.tagName === 'BUTTON') {
                        const id = parseInt(e.target.dataset.id);
                        const producto = productos.find(p => p.id === id);
                        agregarAlCarrito(producto);
                    }
                });
            });
    }

    // Cargar información del producto en producto.html
    if (document.body.contains(document.getElementById('nombre'))) {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        if (productId) {
            fetch('productos.json')
                .then(response => response.json())
                .then(data => {
                    const producto = data.productos.find(p => p.id == productId);
                    if (producto) {
                        document.getElementById('nombre').textContent = producto.nombre;
                        document.getElementById('descripcion').textContent = producto.descripcion;
                        document.getElementById('precio').textContent = producto.precio.toFixed(2);
                        
                        // Agregar funcionalidad de agregar al carrito en producto.html
                        document.getElementById('agregarCarrito').addEventListener('click', () => {
                            agregarAlCarrito(producto);
                        });
                    }
                });
        }
    }

    // Cargar el carrito en carrito.html
    if (carritoDiv) {
        actualizarCarrito();
    }
});

