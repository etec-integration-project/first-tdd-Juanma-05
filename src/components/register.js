
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

  
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                name,
                email,
                password
            })
        });

        // Maneja la respuesta
        if (response.ok) {
            // Redirige al usuario a la página de inicio de sesión si el registro fue exitoso
            window.location.href = '/login';
        } else {
            // Si hubo un error, muestra el mensaje de error
            const errorText = await response.text();
            document.getElementById('error-message').textContent = 'Error: ' + errorText;
        }
    } catch (error) {
        console.error('Error al registrar:', error);
        document.getElementById('error-message').textContent = 'Error al conectar con el servidor.';
    }
});

// <!-- <!DOCTYPE html>
// <html lang="es">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Frontend App</title>
//     <link rel="stylesheet" href="/styles.css">
// </head>
// <body>
//     <h1>Frontend App</h1>

//     <form id="loginForm">
//         <label for="email">Correo electrónico:</label><br>
//         <input type="email" id="email" name="email" required><br>
//         <label for="password">Contraseña:</label><br>
//         <input type="password" id="password" name="password" required><br>
//         <button type="submit">Iniciar sesión</button>
//     </form>

//     <script>

//         // Manejar el envío del formulario de login
//         document.getElementById('loginForm').addEventListener('submit', async function(event) {
//             event.preventDefault();

//             const formData = new FormData(this);
//             const formDataJson = Object.fromEntries(formData.entries());

//             try {
//                 const response = await fetch('http://localhost:3000/login', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(formDataJson)
//                 });

//                 if (!response.ok) {
//                     throw new Error('Error en la solicitud.');
//                 }

//                 const data = await response.json();
//                 console.log('Respuesta del backend:', data);

//                 // Aquí puedes redirigir al usuario o realizar otra acción después del login exitoso
//             } catch (error) {
//                 console.error('Error:', error.message);
//                 // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
//             }
//         });
//     </script>
// </body>
// </html> -->
