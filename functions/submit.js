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

  const { name, email, type, org, event, notes } = body;

  if (!name || !email || !type || !org) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const subject = `New Gathr request — ${org}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Gathering type: ${type}`,
    `Org name: ${org}`,
    `Event: ${event || 'not provided'}`,
    `Notes: ${notes || 'none'}`,
    ``,
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
