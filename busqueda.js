document.addEventListener("DOMContentLoaded", function() {
    var formBusqueda = document.getElementById("form-busqueda");
    formBusqueda.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe normalmente

        var terminoBusqueda = document.getElementById("termino-busqueda").value;
        // Aquí puedes realizar la acción de búsqueda con el término ingresado
        console.log("Realizar búsqueda con el término: " + terminoBusqueda);
        // Por ejemplo, podrías redirigir a una nueva página con los resultados de búsqueda
        // window.location.href = "resultados.html?query=" + encodeURIComponent(terminoBusqueda);
    });
});
