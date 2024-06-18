const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignIn.addEventListener("click",()=>{
   container.classList.remove("toggle");
});
btnSignUp.addEventListener("click",()=>{
   container.classList.add("toggle");
});
document.addEventListener('DOMContentLoaded', () => {
   const sendCodeButton = document.getElementById('send-code');
   const signInButton = document.getElementById('sign-in-button');
   const registerSendCodeButton = document.getElementById('register-send-code');
   const signUpButton = document.getElementById('sign-up-button');

   function sendVerificationCode(phoneNumber) {
       fetch('/send-code', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ phoneNumber })
       })
       .then(response => response.json())
       .then(data => {
           if (data.success) {
               alert('Código de verificación enviado correctamente.');
           } else {
               alert('Error al enviar el código de verificación.');
           }
       })
       .catch(error => {
           console.error('Error al enviar el código de verificación:', error);
           alert('codigo enviado SMS.');
       });
   }

   function verifyCodeAndSignIn(phoneNumber, verificationCode) {
       fetch('/verify-code', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ phoneNumber, verificationCode })
       })
       .then(response => response.json())
       .then(data => {
           if (data.success) {
               alert('Inicio de sesión exitoso.');
               // Aquí puedes redirigir al usuario a otra página o realizar otras acciones necesarias
           } else {
               alert('Código de verificación incorrecto.');
           }
       })
       .catch(error => {
           console.error('Error al verificar el código de verificación:', error);
           alert('codigo enviado.');
       });
   }

   sendCodeButton.addEventListener('click', () => {
       const phoneNumber = document.getElementById('phone-number').value;
       if (phoneNumber) {
           sendVerificationCode(phoneNumber);
       } else {
           alert('Por favor, ingrese un número de celular válido.');
       }
   });

   signInButton.addEventListener('click', () => {
       const phoneNumber = document.getElementById('phone-number').value;
       const verificationCode = document.getElementById('verification-code').value;
       if (phoneNumber && verificationCode) {
           verifyCodeAndSignIn(phoneNumber, verificationCode);
       } else {
           alert('Por favor, ingrese su número de celular y el código de verificación.');
       }
   });

   registerSendCodeButton.addEventListener('click', () => {
       const phoneNumber = document.getElementById('register-phone-number').value;
       if (phoneNumber) {
           sendVerificationCode(phoneNumber);
       } else {
           alert('Por favor, ingrese un número de celular válido.');
       }
   });

   signUpButton.addEventListener('click', () => {
       const phoneNumber = document.getElementById('register-phone-number').value;
       const verificationCode = document.getElementById('register-verification-code').value;
       const name = document.getElementById('name').value;
       const email = document.getElementById('register-email').value;
       const password = document.getElementById('register-password').value;
       if (phoneNumber && verificationCode && name && email && password) {
           // Aquí agregarías la lógica para registrar al usuario con los datos proporcionados
           alert('Registro exitoso.');
       } else {
           alert('Por favor, complete todos los campos y el código de verificación.');
       }
   });
});
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

const accountSid = 'ACf0a782e6d50434f4adaab051392d9c24'; 
const authToken = '65b32ab5148d59f6fa27855d6f78fd3c'; 
const client = new twilio(accountSid, authToken);

const verificationCodes = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'iniciosesion.html');
});

app.post('/send-code', (req, res) => {
    const { phoneNumber } = req.body;
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    verificationCodes[phoneNumber] = verificationCode;
    client.messages.create({
        body: `Tu código de verificación para la aplicación es: ${verificationCode}`,
        to: `+${phoneNumber}`,
        from: '+527445820993' 
    })
    .then(() => {
        console.log(`Código de verificación enviado correctamente a ${phoneNumber}: ${verificationCode}`);
        res.json({ success: true, message: 'Código de verificación enviado correctamente.' });
    })
    .catch((error) => {
        console.error('Error al enviar el código de verificación:', error);
        res.status(500).json({ success: false, message: 'Error al enviar el código de verificación.' });
    });
});

app.post('/verify-code', (req, res) => {
    const { phoneNumber, verificationCode } = req.body;
    const storedVerificationCode = verificationCodes[phoneNumber];

    if (verificationCode === storedVerificationCode) {
        console.log(`Código de verificación correcto para ${phoneNumber}`);
        res.json({ success: true, message: 'Código de verificación correcto.' });
    } else {
        console.log(`Código de verificación incorrecto para ${phoneNumber}`);
        res.status(400).json({ success: false, message: 'Código de verificación incorrecto.' });
    }
});


    