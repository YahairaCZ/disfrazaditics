var carrito = localStorage.getItem('carrito');
        if (carrito) {
            carrito = JSON.parse(carrito);
            var carritoBody = document.getElementById('carritoBody');
    
            carrito.forEach(function(producto, index) {
                var fila = document.createElement('tr');
                fila.innerHTML = '<td>' + producto.nombre + '</td><td>' + producto.precio + '</td><td><button onclick="eliminarProducto(' + index + ')">Eliminar</button></td>';
                carritoBody.appendChild(fila);
            });
        }

        function eliminarProducto(index) {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            location.reload(); 
        }