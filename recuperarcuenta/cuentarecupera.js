document.getElementById('send-email').addEventListener('click', function() {
    var email = document.getElementById('email').value.trim();

    if (email !== '') {
        // Hacer una solicitud HTTP POST al backend para enviar el correo de recuperación
        fetch('http://tu-backend.com/send-recovery-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('message').innerHTML = '<p>Se ha enviado un correo con instrucciones para recuperar la contraseña a <strong>' + email + '</strong>.</p>';
            } else {
                document.getElementById('message').innerHTML = '<p style="color: red;">Hubo un problema al enviar el correo. Por favor, intenta de nuevo más tarde.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').innerHTML = '<p style="color: red;">Hubo un problema al enviar el correo. Por favor, intenta de nuevo más tarde.</p>';
        });
    } else {
        document.getElementById('message').innerHTML = '<p style="color: red;">Por favor, ingresa tu correo electrónico.</p>';
    }
});