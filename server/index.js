import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config({ path: '.env' });

const app = express();
const PORT = process.env.PORT || 3001;

const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

// Create reusable transporter using Gmail + App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  pool: String(process.env.SMTP_POOL).toLowerCase() === 'true',
  maxConnections: Number(process.env.SMTP_MAX_CONNECTIONS) || 5,
  connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT) || 30000,
  socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT) || 30000,
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Email server up' });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    const safeName = String(name || '').trim();
    const safeEmail = String(email || '').trim();
    const safeMsg = String(message || '').trim();

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email address' });
    }

    const mailOptions = {
      from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: safeEmail || undefined,
      subject: `New message${safeName ? ` from ${safeName}` : ''} (Portfolio Contact Form)`,
      headers: {
        'X-Contact-Name': safeName,
        'X-Contact-Email': safeEmail,
      },
      text: [
        `Name: ${safeName || 'N/A'}`,
        `Email: ${safeEmail || 'N/A'}`,
        '',
        'Message:',
        safeMsg || '—',
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${safeName || 'N/A'}</p>
          <p><strong>Email:</strong> ${safeEmail || 'N/A'}</p>
          <hr/>
          <p style="white-space: pre-line;">${safeMsg || '—'}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ ok: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to send message' });
  }
});

app.listen(PORT, () => {
  console.log(`Mail server running on http://localhost:${PORT}`);
});
