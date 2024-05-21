document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        // Obtener los valores ingresados por el usuario
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        if (!username.trim() || !password.trim()) {
            displayMessage('Por favor, completa todos los campos.', 'error');
            return;
        }

        // Llamar a la función para autenticar al usuario
        authenticateUser(username, password);
    });
});

function authenticateUser(username, password) {
    // JSON de usuarios
    fetch('usuarios.json')
        .then(response => response.json())
        .then(data => {
            const usuarios = data.usuarios;

            // Buscar el usuario por nombre de usuario
            const user = usuarios.find(user => user.username === username);

            // Verificar si se encontró el usuario y la contraseña es correcta
            if (user && user.password === password) {
                displayMessage('Inicio de sesión exitoso.', 'success');
                // Aquí puedes redirigir a otra página después del inicio de sesión
                window.location.href = 'admin.html';
            } else {
                displayMessage('Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.', 'error');
            }
        })
        .catch(error => {
            console.error('Error al cargar usuarios:', error);
            displayMessage('Error al cargar usuarios. Por favor, inténtalo de nuevo más tarde.', 'error');
        });

        function displayMessage(message, type) {
            const loginMessage = document.getElementById('loginMessage');
            loginMessage.textContent = message;
            loginMessage.className = type; // Asignar una clase CSS basada en el tipo de mensaje
        }
}
