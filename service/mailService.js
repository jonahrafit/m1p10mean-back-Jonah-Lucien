const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jonahrafit@gmail.com',
        pass: 'vupp bpwz pijf mnod ',
    },
});

async function sendConfirmationEmail(email, str) {
    const mailOptions = {
        from: 'jonahrafit@gmail.com',
        to: email,
        subject: 'Confirmation d\'inscription',
        html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmation d'inscription</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    text-align: center;
                }
        
                .container {
                    max-width: 600px;
                    margin: 50px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
        
                .message {
                    margin-bottom: 20px;
                }
        
                .confirmation-link {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
        
                .confirmation-link:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="message">
                    <p>Merci de vous être inscrit!</p>
                    <p>Cliquez sur le bouton ci-dessous pour confirmer votre inscription :</p>
                </div>
                <a href="http://localhost:3001/auth/confirm/compte/${email}/${str}" class="confirmation-link">Confirmer l'inscription</a>
            </div>
        </body>
        </html>
        `,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendConfirmationEmail };