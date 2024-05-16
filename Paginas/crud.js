document.addEventListener('DOMContentLoaded', function() {
    const productosBody = document.getElementById('productosBody');

    // Cargar y mostrar productos al cargar la página
    cargarProductos();

    function cargarProductos() {
        fetch('productos.json')
            .then(response => response.json())
            .then(data => {
                const productos = data.productos;

                // Limpiar el cuerpo de la tabla antes de agregar los productos
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
            })
            .catch(error => {
                console.error('Error al cargar productos:', error);
                productosBody.innerHTML = '<tr><td colspan="4">Error al cargar productos. Inténtalo de nuevo más tarde.</td></tr>';
            });
    }

    function agregarEventosEditar() {
        const editarBtns = document.querySelectorAll('.editarBtn');

        editarBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productoId = btn.dataset.id;

                // Simular edición: mostrar datos del producto en un formulario
                alert(`Editar producto con ID ${productoId}`);
            });
        });
    }

    function agregarEventosEliminar() {
        const eliminarBtns = document.querySelectorAll('.eliminarBtn');

        eliminarBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productoId = btn.dataset.id;

                // Simular eliminación: eliminar el producto y actualizar la tabla
                if (confirm(`¿Estás seguro de eliminar el producto con ID ${productoId}?`)) {
                    // Eliminar el producto (implementación simulada)
                    alert(`Producto con ID ${productoId} eliminado.`);
                    // Actualizar la tabla (volver a cargar productos)
                    cargarProductos();
                }
            });
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const nuevoProductoForm = document.getElementById('nuevoProductoForm');
    const productosBody = document.getElementById('productosBody');

    nuevoProductoForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const descripcion = document.getElementById('descripcion').value;

        if (nombre && precio && descripcion) {
            // Crear nueva fila en la tabla para mostrar el nuevo producto
            const newRow = productosBody.insertRow();
            newRow.innerHTML = `
                <td>${nombre}</td>
                <td>$${precio.toFixed(2)}</td>
                <td>${descripcion}</td>
                <td>
                <button class="editarBtn" data-id="${producto.id}">Editar</button>
                <button class="eliminarBtn" data-id="${producto.id}">Eliminar</button>
                </td>
            `;

            // Limpiar el formulario después de agregar el producto
            nuevoProductoForm.reset();
        } else {
            alert('Por favor, completa todos los campos.');
            
        }
    });
    function agregarEventosEditar() {
        const editarBtns = document.querySelectorAll('.editarBtn');

        editarBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productoId = btn.dataset.id;

                // Simular edición: mostrar datos del producto en un formulario
                alert(`Editar producto con ID ${productoId}`);
            });
        });
    }

    function agregarEventosEliminar() {
        const eliminarBtns = document.querySelectorAll('.eliminarBtn');

        eliminarBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productoId = btn.dataset.id;

                // Simular eliminación: eliminar el producto y actualizar la tabla
                if (confirm(`¿Estás seguro de eliminar el producto con ID ${productoId}?`)) {
                    // Eliminar el producto (implementación simulada)
                    alert(`Producto con ID ${productoId} eliminado.`);
                    // Actualizar la tabla (volver a cargar productos)
                    cargarProductos();
                }
            });
        });
    }
});


