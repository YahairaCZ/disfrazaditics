document.addEventListener('DOMContentLoaded', function() {
    const productosBody = document.getElementById('productosBody');
    const nuevoProductoForm = document.getElementById('nuevoProductoForm');
    const productoIdInput = document.getElementById('productoId');
    const nombreInput = document.getElementById('nombre');
    const precioInput = document.getElementById('precio');
    const descripcionInput = document.getElementById('descripcion');

    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    if (productos.length === 0) {
        // Cargar productos desde el archivo JSON solo si LocalStorage está vacío
        fetch('productos.json')
            .then(response => response.json())
            .then(data => {
                productos = data.productos;
                localStorage.setItem('productos', JSON.stringify(productos));
                mostrarProductos();
            })
            .catch(error => console.error('Error al cargar productos:', error));
    } else {
        mostrarProductos();
    }

    nuevoProductoForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const id = productoIdInput.value;
        const nombre = nombreInput.value;
        const precio = parseFloat(precioInput.value);
        const descripcion = descripcionInput.value;

        if (nombre && precio && descripcion) {
            if (id) {
                // Editar producto existente
                const productoIndex = productos.findIndex(p => p.id === parseInt(id));
                if (productoIndex !== -1) {
                    productos[productoIndex] = {
                        id: parseInt(id),
                        nombre: nombre,
                        precio: precio,
                        descripcion: descripcion
                    };
                }
            } else {
                // Agregar nuevo producto
                const nuevoProducto = {
                    id: productos.length ? productos[productos.length - 1].id + 1 : 1,
                    nombre: nombre,
                    precio: precio,
                    descripcion: descripcion
                };
                productos.push(nuevoProducto);
            }

            // Guardar productos en LocalStorage
            localStorage.setItem('productos', JSON.stringify(productos));

            // Actualizar la tabla mostrando los productos
            mostrarProductos();

            // Limpiar el formulario después de agregar el producto
            resetForm();
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    function mostrarProductos() {
        // Limpiar el contenido previo de la tabla
        productosBody.innerHTML = '';

        // Mostrar cada producto en la tabla con botones de editar y eliminar
        productos.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>${producto.descripcion}</td>
                <td>
                    <button class="editarBtn" data-id="${producto.id}">Editar</button>
                    <button class="eliminarBtn" data-id="${producto.id}">Eliminar</button>
                </td>
            `;
            productosBody.appendChild(row);
        });

        if (productos.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="4">No hay productos registrados.</td>';
            productosBody.appendChild(row);
        }

        // Agregar eventos para botones de editar y eliminar
        agregarEventosEditar();
        agregarEventosEliminar();
    }

    function agregarEventosEditar() {
        const editarBtns = document.querySelectorAll('.editarBtn');

        editarBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productoId = btn.dataset.id;
                const producto = productos.find(p => p.id === parseInt(productoId));

                if (producto) {
                    productoIdInput.value = producto.id;
                    nombreInput.value = producto.nombre;
                    precioInput.value = producto.precio;
                    descripcionInput.value = producto.descripcion;
                }
            });
        });
    }

    function agregarEventosEliminar() {
        const eliminarBtns = document.querySelectorAll('.eliminarBtn');

        eliminarBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productoId = btn.dataset.id;

                if (confirm(`¿Estás seguro de eliminar el producto con ID ${productoId}?`)) {
                    productos = productos.filter(p => p.id !== parseInt(productoId));

                    // Guardar productos en LocalStorage
                    localStorage.setItem('productos', JSON.stringify(productos));

                    // Volver a mostrar la tabla con los productos actualizados
                    mostrarProductos();
                }
            });
        });
    }

    function resetForm() {
        nuevoProductoForm.reset();
        productoIdInput.value = '';
    }

    mostrarProductos();
});
