# Email server (Express + Nodemailer)

This small server exposes a POST `/send-email` endpoint that sends email using SMTP credentials provided via environment variables.

Usage

1. Install dependencies (from project root):

```powershell
npm install express nodemailer dotenv
```

2. Copy the example env file and fill in your credentials:

```powershell
cp server/.env.example server/.env
# then edit server/.env and set SMTP_USER and SMTP_PASS (app password)
```

3. Run the server:

```powershell
npm run dev:server
```

If you're calling the server from the Vite dev server, the default allowed origin is `http://localhost:5173`. To change this or run in production, set `CORS_ORIGIN` in `server/.env`.

Default recipient

By default the server will route contact-form messages to the address in `RECEIVER_EMAIL` (set in `server/.env`).
If `RECEIVER_EMAIL` is not set, the server currently defaults to `ramarv7859@gmail.com`.

4. Send a POST request to `http://localhost:3001/send-email` with JSON body:

```json
{
  "to": "recipient@example.com",
  "subject": "Hello from my portfolio",
  "text": "Plain text body",
  "html": "<p>HTML body</p>"
}
```

Security notes

- Do not commit `server/.env` to source control. Use environment variables in CI or secret storage for production.
- For Gmail, create an App Password (not your main account password) and use that as `SMTP_PASS`.

