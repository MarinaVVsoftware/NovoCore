const nodemailer = require("nodemailer");

async function SendMail (to, subject, text, html) {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "novonautica.com",
		port: 25,
		secure: false, // true for 465, false for other ports
		auth: {
			user: "test@novonautica.com", // generated ethereal user
			pass: "7@16jzyB" // generated ethereal password _Ji89w7z
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: "test@novonautica.com", // sender address
		to: to, // list of receivers
		subject: subject, // Subject line
		text: text, // plain text body
		html: html // html body
	});
}

module.exports = SendMail;
