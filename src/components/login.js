document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

   
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                email,
                password
            })
        });

        if (response.ok) {
            // Redirige al usuario a la página principal o a un dashboard si el inicio de sesión fue exitoso
            window.location.href = '/dashboard'; // Cambia esto a la ruta deseada
        } else {
            // Si hubo un error, muestra el mensaje de error
            const errorText = await response.text();
            document.getElementById('error-message').textContent = 'Error: ' + errorText;
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        document.getElementById('error-message').textContent = 'Error al conectar con el servidor.';
    }
});
