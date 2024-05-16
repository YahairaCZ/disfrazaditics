document.addEventListener('DOMContentLoaded', function() {
    const productosBody = document.getElementById('productosBody');

    // Llamar a la función para cargar y mostrar los productos al cargar la página
    cargarProductos();

    function cargarProductos() {
        fetch('productos.json')
            .then(response => response.json())
            .then(data => {
                const productos = data.productos;

                // Limpiar el cuerpo de la tabla antes de agregar los productos
                productosBody.innerHTML = '';

                // Mostrar cada producto en la tabla
                productos.forEach(producto => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${producto.nombre}</td>
                        <td>$${producto.precio.toFixed(2)}</td>
                        <td>${producto.descripcion}</td>
                    `;
                    productosBody.appendChild(row);
                });

                if (productos.length === 0) {
                    const row = document.createElement('tr');
                    row.innerHTML = '<td colspan="3">No hay productos registrados.</td>';
                    productosBody.appendChild(row);
                }
            })
            .catch(error => {
                console.error('Error al cargar productos:', error);
                productosBody.innerHTML = '<tr><td colspan="3">Error al cargar productos. Inténtalo de nuevo más tarde.</td></tr>';
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
            `;

            // Limpiar el formulario después de agregar el producto
            nuevoProductoForm.reset();
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
});


