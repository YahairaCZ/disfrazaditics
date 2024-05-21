var carrito = localStorage.getItem('carrito');
if (carrito) {
    carrito = JSON.parse(carrito);
    var listaDeseosBody = document.getElementById('carritoBody');

    // Mostrar cada producto en la lista de deseos
    carrito.forEach(function(producto, index) {
        var fila = document.createElement('tr');
        fila.innerHTML = '<td>' + producto.nombre + '</td><td>' + producto.precio + '</td><td><button onclick="eliminarProducto(' + index + ')">Eliminar</button></td>';
        listaDeseosBody.appendChild(fila);
    });
}

// Función para eliminar un producto de la lista de deseos
function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem('listaDeseos', JSON.stringify(carrito));
    location.reload(); // Recargar la página para actualizar la lista
}