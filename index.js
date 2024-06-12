const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 3016;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // Port for STARTTLS
    secure: false, // Use STARTTLS
    auth: {
        user: 'aakashvishwakarmarm4001@gmail.com', // Use environment variable for email
        pass: 'inciilyqofmnlxgr', // Use environment variable for password or app password
    },
    tls: {
        ciphers: 'SSLv3',
    },
});

// API endpoint to send email
app.post('/api/sendemail', async (req, res) => {
    const { from, to, cc, bcc, subject, text, html } = req.body;

    if (!to) {
        return res.status(400).send({ error: 'Recipient email (to) is a mandatory field' });
    }

    const mailOptions = {
        from: from,
        to: to,
        cc: cc,
        bcc: bcc,
        subject: subject,
        text: text,
        html: html,
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ error: 'Failed to send email' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
