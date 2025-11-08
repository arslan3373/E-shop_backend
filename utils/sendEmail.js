import getTransporter from '../config/email.js';

const sendEmail = async (options) => {
  const transporter = getTransporter();
  // Check if transporter is configured
  if (!transporter) {
    console.warn('Email not sent - transporter not configured (missing EMAIL_USER or EMAIL_PASSWORD)');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const mailOptions = {
      from: `"E-Shop" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    return { success: false, error: error.message };
  }
};

export default sendEmail;
