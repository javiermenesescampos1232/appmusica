const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const app = express();
const port = 3000;

// Configuración de OAuth2 para Gmail API (necesitas tus credenciales)
const oauth2Client = new OAuth2(
    'YOUR_CLIENT_ID',
    'YOUR_CLIENT_SECRET',
    'https://developers.google.com/oauthplayground' // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: 'YOUR_REFRESH_TOKEN'
});

// Ruta POST para enviar correo de recuperación
app.use(bodyParser.json());

app.post('/send-recovery-email', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    // Configuración del transportador de correo usando nodemailer con Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'YOUR_GMAIL_ADDRESS',
            clientId: 'YOUR_CLIENT_ID',
            clientSecret: 'YOUR_CLIENT_SECRET',
            refreshToken: 'YOUR_REFRESH_TOKEN',
            accessToken: oauth2Client.getAccessToken(),
        },
    });

    // Opciones del correo
    const mailOptions = {
        from: 'Your Name <your-email@gmail.com>',
        to: email,
        subject: 'Recuperación de Contraseña',
        text: 'Aquí está el enlace para restablecer tu contraseña.',
        html: '<p>Aquí está el enlace para restablecer tu contraseña.</p>',
    };

    // Envío del correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Error sending email.' });
        }

        console.log('Email sent:', info.response);
        return res.status(200).json({ success: true, message: 'Email sent successfully.' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
