import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export async function sendQueryNotification(query) {
  const { firstName, lastName, email, phone, message } = query;
  const name = `${firstName || ''} ${lastName || ''}`.trim() || 'Not provided';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
      <div style="background: #027cc1; color: #ffffff; padding: 20px;">
        <h2 style="margin: 0;">New Customer Query</h2>
      </div>
      <div style="padding: 24px; color: #111827;">
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f9fafb; padding: 14px; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    </div>
  `;

  const text = `New Customer Query

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}`;

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    cc: process.env.MAIL_CC,
    replyTo: email,
    subject: `New Website Enquiry from ${name}`,
    text,
    html,
  });
}