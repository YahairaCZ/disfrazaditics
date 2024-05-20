
document.addEventListener('DOMContentLoaded', function() {
    const nuevoProductoForm = document.getElementById('nuevoProductoForm');
    const productosBody = document.getElementById('productosBody');

    // Arreglo temporal para almacenar los productos (simulación de datos)
    let productos = [];
    let productoEditando = null; // Variable para almacenar el producto que se está editando

    nuevoProductoForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const descripcion = document.getElementById('descripcion').value;

        if (nombre && precio && descripcion) {
            if (productoEditando) {
                // Actualizar el producto existente
                productoEditando.nombre = nombre;
                productoEditando.precio = precio;
                productoEditando.descripcion = descripcion;

                // Limpiar la variable de edición
                productoEditando = null;
            } else {
                // Crear un objeto de producto
                const nuevoProducto = {
                    id: productos.length + 1, // Generar un ID único (simulación)
                    nombre: nombre,
                    precio: precio,
                    descripcion: descripcion
                };

                // Agregar el nuevo producto al arreglo de productos
                productos.push(nuevoProducto);
            }

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
                    // Cargar los datos del producto en el formulario
                    document.getElementById('nombre').value = producto.nombre;
                    document.getElementById('precio').value = producto.precio;
                    document.getElementById('descripcion').value = producto.descripcion;

                    // Establecer el producto en edición
                    productoEditando = producto;
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
