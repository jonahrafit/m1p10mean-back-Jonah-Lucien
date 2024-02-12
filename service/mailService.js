const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jonahrafit@gmail.com',
        pass: 'vupp bpwz pijf mnod ',
    },
});

async function sendConfirmationEmail(email) {
    console.log('--------------', email);
    const mailOptions = {
        from: 'jonahrafit@gmail.com',
        to: email,
        subject: 'Confirmation d\'inscription',
        html: `
      <p>Merci de vous être inscrit!</p>
      <p>Cliquez sur le bouton ci-dessous pour confirmer votre inscription :</p>
      <a href="http://localhost:3001/auth/confirm/compte/${email}">Confirmer l'inscription</a>
    `,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendConfirmationEmail };