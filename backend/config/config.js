// filepath: f:\fullstack_app_complete\home\ubuntu\fullstack_app\backend\config\config.js
module.exports = {
    jwtSecret: process.env.JWT_SECRET || "your-secret-key",
    smtpHost: process.env.SMTP_HOST || "smtp.example.com",
    smtpPort: process.env.SMTP_PORT || 587,
    smtpUser: process.env.SMTP_USER || "your-email@example.com",
    smtpPass: process.env.SMTP_PASS || "your-email-password",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  };