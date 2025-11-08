import nodemailer from 'nodemailer';
// Lazily created transporter cached after first use
let cachedTransporter = null;
let verifiedOnce = false;

export const getTransporter = () => {
  if (cachedTransporter) return cachedTransporter;

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  if (!user || !pass) {
    console.warn('Email credentials not configured. Email functionality will be disabled.');
    return null;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });

  if (!verifiedOnce) {
    transporter.verify((error) => {
      if (error) {
        console.log('Email configuration error:', error.message);
      } else {
        console.log('✅ Email server is ready to send messages');
      }
    });
    verifiedOnce = true;
  }

  cachedTransporter = transporter;
  return cachedTransporter;
};

export default getTransporter;
