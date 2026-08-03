export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, email, story, smsConsent } = body;

  if (!name || !email || !story) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const subject = `New Gathr request — ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    ``,
    `Their story:`,
    story,
    ``,
    `SMS consent: ${smsConsent ? 'Yes' : 'No'}`,
    `Submitted: ${new Date().toISOString()}`,
  ].join('\n');

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'invitations@mail.getgathr.co',
      to: 'kristinseed@gmail.com',
      reply_to: email,
      subject,
      text,
    }),
  });

  if (!resendRes.ok) {
    const err = await resendRes.text();
    console.error('Resend error:', err);
    return new Response(JSON.stringify({ error: 'Email delivery failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
