const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.EMAIL_CLIENT_ID,
    process.env.EMAIL_SECRET,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: process.env.EMAIL_REFRESH
})
const accessToken = oauth2Client.getAccessToken();

const appUrl = process.env.APP_URL;
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;

const transport = nodemailer.createTransport({
    // service: 'Gmail',
    // auth: {
    //     user,
    //     pass
    // },
    service: "gmail",
     auth: {
          type: "OAuth2",
          user: process.env.EMAIL_USER, 
          clientId: process.env.EMAIL_CLIENT_ID,
          clientSecret: process.env.EMAIL_SECRET,
          refreshToken: process.env.EMAIL_REFRESH,
          accessToken: accessToken
     },
     tls: {
        rejectUnauthorized: false
    }
});

module.exports.sendValidationEmail = (email, activationToken, name) => {
    transport.sendMail({
        to: email,
        from: `Homelidarity team`,
        subject: 'Activa tu cuenta',
        html: `
            <h1>Hola ${name}, bienvenid@ a Homelidarity</h1>
            <p>Clica en el botón para activar tu cuenta </p>
            <a href="${appUrl}/activate?token=${activationToken}" 
            style="padding: 10px 20px; color: white; background-color: orange; border-radius: 5px">Click aquí</a>
            `

    })
    .then(() => {
        console.log('email sent!');
    })
    .catch(console.error);
}