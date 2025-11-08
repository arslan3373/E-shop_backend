import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

console.log('=== Email Configuration Test ===\n');

// Check environment variables
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***configured***' : 'NOT SET');
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
console.log('\n');

// Test transporter creation
try {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  console.log('✅ Transporter created successfully\n');

  // Verify connection
  transporter.verify((error, success) => {
    if (error) {
      console.log('❌ Email verification failed:');
      console.log('Error:', error.message);
      console.log('\nPossible solutions:');
      console.log('1. Make sure you generated an App Password from Google (not your regular password)');
      console.log('2. Go to: https://myaccount.google.com/apppasswords');
      console.log('3. Enable 2-Step Verification first if not enabled');
      console.log('4. Generate a new App Password for "Mail"');
      console.log('5. Copy the 16-character password WITHOUT spaces');
      console.log('6. Update EMAIL_PASSWORD in your .env file');
    } else {
      console.log('✅ Email server connection successful!');
      console.log('Email system is ready to send messages.');
    }
    process.exit(0);
  });
} catch (error) {
  console.log('❌ Failed to create transporter:');
  console.log('Error:', error.message);
  process.exit(1);
}
