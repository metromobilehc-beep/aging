// Vercel serverless function — receives Aging in Place referral form submissions.
//
// SETUP (do this once you're ready to turn on notifications):
//   1. In Vercel: Project → Settings → Environment Variables, add:
//        RESEND_API_KEY   — same Resend account used for Selko Cred reminders
//        NOTIFY_EMAIL     — the inbox that should receive new referrals
//        NOTIFY_FROM      — a verified sending address on your Resend domain
//                            (e.g. referrals@selko360.com or a metromobilehc.com address
//                            once that domain is verified in Resend)
//   2. Redeploy. That's it — no code changes needed.
//
// Until RESEND_API_KEY is set, this function still accepts and logs every
// submission (so nothing is lost) and returns success to the visitor —
// it just won't send an email yet.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { who, service, name, client_name, phone, email, organization, message } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const submittedAt = new Date().toISOString();
  const serviceLabel = service === 'fall-detection' ? 'Fall Detection (Evolve)'
    : service === 'family-assessment' ? 'Family Needs Assessment'
    : 'Aging in Place';

  // Always log the submission server-side so nothing is lost even before
  // notifications are wired up. Visible in Vercel's function logs.
  console.log(`New ${serviceLabel} referral:`, {
    submittedAt, who, service, name, client_name, phone, email, organization, message
  });

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL;
  const NOTIFY_FROM = process.env.NOTIFY_FROM;

  if (RESEND_API_KEY && NOTIFY_EMAIL && NOTIFY_FROM) {
    try {
      const whoLabel = {
        family: 'Family member',
        self: 'Client (self-referral)',
        professional: 'Healthcare professional'
      }[who] || 'Unknown';

      const html = `
        <h2>New ${serviceLabel} referral</h2>
        <p><strong>Type:</strong> ${whoLabel}</p>
        <p><strong>Submitted by:</strong> ${escapeHtml(name)}</p>
        ${client_name ? `<p><strong>Client name:</strong> ${escapeHtml(client_name)}</p>` : ''}
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        ${email ? `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` : ''}
        ${organization ? `<p><strong>Organization:</strong> ${escapeHtml(organization)}</p>` : ''}
        ${message ? `<p><strong>Details:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>` : ''}
        <p style="color:#888;font-size:12px;">Submitted ${submittedAt}</p>
      `;

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: NOTIFY_FROM,
          to: NOTIFY_EMAIL,
          subject: `New ${serviceLabel} referral — ${name}`,
          html
        })
      });

      if (!resendRes.ok) {
        const errText = await resendRes.text();
        console.error('Resend send failed:', errText);
        // Don't fail the request to the visitor just because the email
        // notification failed — the submission is already logged above.
      }
    } catch (err) {
      console.error('Error sending notification email:', err);
    }
  } else {
    console.log('Notification email skipped — RESEND_API_KEY / NOTIFY_EMAIL / NOTIFY_FROM not yet set in Vercel.');
  }

  return res.status(200).json({ ok: true });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
