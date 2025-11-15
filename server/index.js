import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for local dev (adjust origin in production)
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
// Parse JSON request bodies
app.use(express.json());
// Optionally support URL-encoded forms (not strictly needed for current React form)
app.use(express.urlencoded({ extended: true }));

// Create and verify a reusable transporter at startup so errors are visible early
// Defaults tuned for Gmail: secure SMTP on port 465.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
  pool: process.env.SMTP_POOL ? process.env.SMTP_POOL === 'true' : true,
  maxConnections: Number(process.env.SMTP_MAX_CONNECTIONS || 5),
  connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT || 30000),
  socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT || 30000),
  auth: {
    user: process.env.EMAIL_USER || process.env.SMTP_USER,
    pass: process.env.EMAIL_PASS || process.env.SMTP_PASS,
  },
  // Enable verbose logging for debugging (remove in production)
  logger: true,
  debug: true,
});

transporter.verify()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("SMTP transporter verified — ready to send emails");
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Failed to verify SMTP transporter:", err && err.message ? err.message : err);
  });

// Health check
app.get("/", (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || "development" });
});

// POST /send-email
// Body: { to, subject, text, html }
app.post("/send-email", async (req, res) => {
  // Expect { name, email, message }
  const { name, email, message } = req.body || {};
  // Optionally accept attachments: [{ filename, path, contentType }] or [{ filename, content, encoding }]
  const attachments = Array.isArray(req.body.attachments) ? req.body.attachments : undefined;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields: name, email, message" });
  }

  try {
    // Use configured RECEIVER_EMAIL, otherwise default to the user's inbox
    const recipient = process.env.RECEIVER_EMAIL || 'ramarv7859@gmail.com';

    const subject = `New contact message from ${name}`;
    const text = `${message}\n\nFrom: ${name} <${email}>`;
    const html = `<p>${message.replace(/\n/g, '<br/>')}</p><hr/><p>From: ${name} &lt;${email}&gt;</p>`;

    const mailOptions = {
      from: process.env.FROM_EMAIL || process.env.EMAIL_USER || process.env.SMTP_USER,
      to: recipient,
      replyTo: `${name} <${email}>`,
      subject,
      text,
      html,
    };

    if (attachments && attachments.length) {
      // Basic validation/normalization: ensure attachments is an array of objects
      mailOptions.attachments = attachments.map((att) => {
        // att may be { filename, path, contentType } or { filename, content, encoding }
        const allowed = {};
        if (att.filename) allowed.filename = att.filename;
        if (att.path) allowed.path = att.path;
        if (att.content) allowed.content = att.content;
        if (att.encoding) allowed.encoding = att.encoding;
        if (att.contentType) allowed.contentType = att.contentType;
        return allowed;
      });
    }

    const info = await transporter.sendMail(mailOptions);

    // eslint-disable-next-line no-console
    console.log(`Email sent: messageId=${info.messageId} accepted=${JSON.stringify(info.accepted)}`);

    return res.json({ ok: true, messageId: info.messageId, accepted: info.accepted });
  } catch (err) {
    const message = err && err.message ? err.message : 'Unknown error';
    // Collect nodemailer relevant fields if present
    const code = err && err.code ? err.code : undefined;
    const response = err && err.response ? err.response : undefined;
    const command = err && err.command ? err.command : undefined;
    // eslint-disable-next-line no-console
    console.error('Error sending email:', { message, code, command, response });
    return res.status(500).json({ error: message, code, command, response });
  }
});

// Report transporter status
app.get('/email-status', async (req, res) => {
  try {
    await transporter.verify();
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err && err.message ? err.message : String(err) });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Email server listening on http://localhost:${port}`);
});
