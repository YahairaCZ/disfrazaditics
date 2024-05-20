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

    // Arreglo temporal para almacenar los productos (simulación de datos)
    let productos = [];

    nuevoProductoForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const descripcion = document.getElementById('descripcion').value;

        if (nombre && precio && descripcion) {
            // Crear un objeto de producto
            const nuevoProducto = {
                id: productos.length + 1, // Generar un ID único (simulación)
                nombre: nombre,
                precio: precio,
                descripcion: descripcion
            };

            // Agregar el nuevo producto al arreglo de productos
            productos.push(nuevoProducto);

            // Actualizar la tabla mostrando los productos
            mostrarProductos();

            // Limpiar el formulario después de agregar el producto
            nuevoProductoForm.reset();
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    function mostrarProductos() {
        // Limpiar el contenido previo de la tabla
        productosBody.innerHTML = '';

        // Iterar sobre todos los productos y agregar filas a la tabla
        productos.forEach(producto => {
            const newRow = productosBody.insertRow();
            newRow.innerHTML = `
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>${producto.descripcion}</td>
                <td>
                    <button class="editarBtn" data-id="${producto.id}">Editar</button>
                    <button class="eliminarBtn" data-id="${producto.id}">Eliminar</button>
                </td>
            `;
        });

        // Agregar eventos de clic a los botones de editar y eliminar
        agregarEventosEditar();
        agregarEventosEliminar();
    }

    function agregarEventosEditar() {
        const editarBtns = document.querySelectorAll('.editarBtn');

        editarBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productoId = parseInt(btn.dataset.id);

                // Encontrar el producto correspondiente en el arreglo
                const producto = productos.find(p => p.id === productoId);

                if (producto) {
                    // Simular la edición mostrando los datos del producto en un mensaje
                    alert(`Editar producto: ID ${producto.id}, Nombre: ${producto.nombre}, Precio: $${producto.precio.toFixed(2)}, Descripción: ${producto.descripcion}`);
                }
            });
        });
    }

    function agregarEventosEliminar() {
        const eliminarBtns = document.querySelectorAll('.eliminarBtn');

        eliminarBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productoId = parseInt(btn.dataset.id);

                // Confirmar la eliminación del producto
                if (confirm(`¿Estás seguro de eliminar el producto con ID ${productoId}?`)) {
                    // Filtrar el arreglo de productos para eliminar el producto con el ID especificado
                    productos = productos.filter(p => p.id !== productoId);

                    // Volver a mostrar la tabla con los productos actualizados
                    mostrarProductos();
                }
            });
        });
    }

    // Mostrar los productos al cargar la página
    mostrarProductos();
});





