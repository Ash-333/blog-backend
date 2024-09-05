const nodemailer = require("nodemailer");

const sendResetEmail = async (toEmail, resetToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "ashishkamat121@gmail.com",
        pass: "aorivtnadnbopqri",
      },
    });

    // Message with reset code
    const mailOptions = {
      from: "ashishkamat121@gmail.com",
      to: toEmail,
      subject: "Password Reset",
      html: `
          <h1>Password Reset Request</h1>
          <p>We received a request to reset your password. To proceed, use the following code:</p>
          <h2>${resetToken}</h2>
          <p>If you did not request this change, please ignore this email.</p>
          <p>Thank you!</p>
        `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendResetEmail;
