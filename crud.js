function editarProducto(button) {
    var row = button.parentNode.parentNode;
    productoEditando = row;
    var id = row.cells[1].innerHTML;
    var producto = row.cells[2].innerHTML;
    var precio = row.cells[3].innerHTML;
    var descripcion = row.cells[4].innerHTML;
    var fecha = row.cells[5].innerHTML;
    var imagen = row.cells[6].querySelector('img').src; // Obtener la URL de la imagen
    
    // Mostrar los detalles del producto en los campos de entrada
    document.getElementById("id").value = id;
    document.getElementById("producto").value = producto;
    document.getElementById("precio").value = precio;
    document.getElementById("descripcion").value = descripcion;
    document.getElementById("fecha").value = fecha;
    
    // Mostrar la imagen actual del producto
    var imagenPreview = document.createElement("img");
    imagenPreview.src = imagen;
    imagenPreview.style.maxWidth = "100px";
    document.getElementById("imagenPreview").innerHTML = ''; // Limpiar la imagen anterior
    document.getElementById("imagenPreview").appendChild(imagenPreview);
    
    // Mostrar el botón de "Guardar cambios" y ocultar el botón de "Agregar"
    document.getElementById("agregar").style.display = "none";
    document.getElementById("editar").style.display = "inline";
}

// función para eliminar un producto existente
function eliminarProducto(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function guardarCambios() {
    var nuevoID = document.getElementById("id").value;
    var nuevoProducto = document.getElementById("producto").value;
    var nuevoPrecio = document.getElementById("precio").value;
    var nuevaDescripcion = document.getElementById("descripcion").value;
    var nuevaFecha = document.getElementById("fecha").value;

    // Obtener el archivo de imagen seleccionado por el usuario
    var fileInput = document.getElementById('imagen');
    var file = fileInput.files[0];

    // Verificar si se seleccionó un nuevo archivo de imagen
    if(file) {
        // Crear un lector de archivos para leer el contenido de la imagen
        var reader = new FileReader();
        
        // Definir una función de devolución de llamada cuando la lectura del archivo esté completa
        reader.onload = function(e) {
            // Crear elemento de imagen
            var imagen = document.createElement("img");
            imagen.src = e.target.result; // URL de datos de la nueva imagen
            
            // Establecer estilos
            imagen.style.maxWidth = "100px";
            
            // Actualizar la imagen en la tabla
            productoEditando.cells[6].innerHTML = '';
            productoEditando.cells[6].appendChild(imagen);

            // Actualizar los detalles del producto en la tabla
            productoEditando.cells[1].innerHTML = nuevoID;
            productoEditando.cells[2].innerHTML = nuevoProducto;
            productoEditando.cells[3].innerHTML = nuevoPrecio;
            productoEditando.cells[4].innerHTML = nuevaDescripcion;
            productoEditando.cells[5].innerHTML = nuevaFecha;

            // Limpiar los campos de entrada después de guardar los cambios
            document.getElementById("id").value = "";
            document.getElementById("producto").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("descripcion").value = "";
            document.getElementById("fecha").value = "";

            // Limpiar la vista previa de la imagen
            document.getElementById("imagenPreview").innerHTML = '';

            // Mostrar el botón de "Agregar" y ocultar el botón de "Guardar cambios"
            document.getElementById("agregar").style.display = "inline";
            document.getElementById("editar").style.display = "none";

            // Reiniciar la variable productoEditando
            productoEditando = null;
        };
        
        // Leer el contenido del nuevo archivo como una URL de datos
        reader.readAsDataURL(file);
    } else {
        // Si no se selecciona una nueva imagen, simplemente actualizar los detalles del producto en la tabla
        productoEditando.cells[1].innerHTML = nuevoID;
        productoEditando.cells[2].innerHTML = nuevoProducto;
        productoEditando.cells[3].innerHTML = nuevoPrecio;
        productoEditando.cells[4].innerHTML = nuevaDescripcion;
        productoEditando.cells[5].innerHTML = nuevaFecha;

        // Limpiar los campos de entrada después de guardar los cambios
        document.getElementById("id").value = "";
        document.getElementById("producto").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("descripcion").value = "";
        document.getElementById("fecha").value = "";

        // Limpiar la vista previa de la imagen
        document.getElementById("imagenPreview").innerHTML = '';

        // Mostrar el botón de "Agregar" y ocultar el botón de "Guardar cambios"
        document.getElementById("agregar").style.display = "inline";
        document.getElementById("editar").style.display = "none";

        // Reiniciar la variable productoEditando
        productoEditando = null;
    }
}

