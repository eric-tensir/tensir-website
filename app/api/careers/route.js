// POST /api/careers — forwards an application whiteboard via Resend.
// Same pattern as the contact route: no SDK, plain fetch, RESEND_API_KEY env.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  const { firstName, lastName, email, cashEquity, role, whiteboard } = body ?? {};
  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    typeof email !== "string" ||
    !EMAIL_RE.test(email) ||
    !cashEquity?.trim() ||
    !role?.trim() ||
    !whiteboard?.trim()
  ) {
    return Response.json({ error: "missing or invalid fields" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: "mail not configured" }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // TODO(eric): sender must be on a domain verified in Resend.
      from: "Tensir Careers <careers@tensir.ai>",
      to: ["eric@tensir.ai"],
      reply_to: email,
      subject: `careers whiteboard — ${firstName.trim()} ${lastName.trim()}`,
      text:
        `from: ${firstName.trim()} ${lastName.trim()} <${email}>\n` +
        `\n— cash vs. equity —\n\n${cashEquity.trim()}\n` +
        `\n— role, self-defined —\n\n${role.trim()}\n` +
        `\n— whiteboard —\n\n${whiteboard.trim()}\n`,
    }),
  });

  if (!res.ok) {
    return Response.json({ error: "send failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
