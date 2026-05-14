const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_DETAILS_LENGTH = 2500;

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function makeReferenceId() {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `INK-${stamp}-${suffix}`;
}

function normalizeInquiry(body = {}) {
  let source = body;

  if (typeof body === "string") {
    try {
      source = JSON.parse(body || "{}");
    } catch {
      source = {};
    }
  }

  return {
    fullName: String(source.fullName || "").trim(),
    email: String(source.email || "").trim().toLowerCase(),
    company: String(source.company || "").trim(),
    service: String(source.service || "").trim(),
    budget: String(source.budget || "").trim(),
    timeline: String(source.timeline || "").trim(),
    details: String(source.details || "").trim().slice(0, MAX_DETAILS_LENGTH),
    website: String(source.website || "").trim(),
    startedAt: Number(source.startedAt || 0),
  };
}

function validateInquiry(data) {
  if (data.website) return "Submission blocked.";
  if (!data.fullName || data.fullName.length < 2) return "Please enter your name.";
  if (!EMAIL_PATTERN.test(data.email)) return "Please enter a valid email.";
  if (!data.service) return "Please select a service.";
  if (!data.budget) return "Please select a budget.";
  if (!data.timeline) return "Please select a timeline.";
  if (!data.details || data.details.length < 10) return "Please add a few project details.";

  const elapsed = Date.now() - data.startedAt;
  if (!data.startedAt || elapsed < 2500) {
    return "Please wait a moment before submitting.";
  }

  return null;
}

function inquiryEmailHtml(data, referenceId) {
  const fields = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Company", data.company || "Independent / Not provided"],
    ["Service", data.service],
    ["Budget", data.budget],
    ["Timeline", data.timeline],
    ["Reference", referenceId],
  ];

  return `
    <div style="margin:0;background:#050505;padding:32px;font-family:Inter,Arial,sans-serif;color:#f8f8f8;">
      <div style="max-width:680px;margin:0 auto;border:1px solid rgba(255,255,255,.12);border-radius:28px;overflow:hidden;background:linear-gradient(145deg,#111,#050505 62%,#1d0706);box-shadow:0 32px 120px rgba(0,0,0,.45);">
        <div style="padding:34px 34px 26px;border-bottom:1px solid rgba(255,255,255,.08);">
          <div style="font-size:11px;letter-spacing:.32em;text-transform:uppercase;color:#d64238;font-weight:700;">New Studio Inquiry</div>
          <h1 style="margin:14px 0 0;font-size:34px;line-height:1;letter-spacing:-.04em;">${escapeHtml(data.fullName)} wants to start a project.</h1>
          <p style="margin:14px 0 0;color:rgba(255,255,255,.55);font-size:15px;line-height:1.7;">A new inquiry was submitted through the Inkaa Studio website.</p>
        </div>
        <div style="padding:30px 34px;">
          ${fields.map(([label, value]) => `
            <div style="display:flex;gap:18px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.07);">
              <div style="width:110px;color:rgba(255,255,255,.38);font-size:12px;text-transform:uppercase;letter-spacing:.14em;">${label}</div>
              <div style="flex:1;color:rgba(255,255,255,.84);font-size:15px;">${escapeHtml(value)}</div>
            </div>
          `).join("")}
          <div style="margin-top:26px;padding:22px;border-radius:18px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.08);">
            <div style="margin-bottom:10px;color:#d64238;font-size:11px;text-transform:uppercase;letter-spacing:.24em;font-weight:700;">Project Details</div>
            <div style="white-space:pre-wrap;color:rgba(255,255,255,.72);font-size:15px;line-height:1.75;">${escapeHtml(data.details)}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function confirmationEmailHtml(data, referenceId) {
  return `
    <div style="margin:0;background:#050505;padding:32px;font-family:Inter,Arial,sans-serif;color:#f8f8f8;">
      <div style="max-width:640px;margin:0 auto;border:1px solid rgba(255,255,255,.12);border-radius:28px;overflow:hidden;background:radial-gradient(circle at 18% 0%,rgba(214,66,56,.22),transparent 34%),linear-gradient(145deg,#111,#050505 66%,#190605);">
        <div style="padding:36px 34px 30px;text-align:center;">
          <div style="display:inline-grid;place-items:center;width:68px;height:68px;border-radius:50%;background:rgba(214,66,56,.14);border:1px solid rgba(214,66,56,.32);color:#d64238;font-size:34px;">✓</div>
          <div style="margin-top:24px;font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#d64238;font-weight:700;">Inkaa Studio</div>
          <h1 style="margin:14px 0 0;font-size:38px;line-height:1;letter-spacing:-.045em;">Inquiry Received</h1>
          <p style="margin:16px auto 0;max-width:470px;color:rgba(255,255,255,.62);font-size:16px;line-height:1.75;">Your vision has been received by Inkaa Studio. We’ll review your inquiry and get back within 24–48 hours.</p>
        </div>
        <div style="padding:0 34px 34px;">
          <div style="border-radius:20px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.09);padding:24px;">
            <div style="font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.4);font-weight:700;">Reference</div>
            <div style="margin-top:8px;font-size:22px;font-weight:800;letter-spacing:.04em;color:#fff;">${escapeHtml(referenceId)}</div>
            <div style="height:1px;background:rgba(255,255,255,.08);margin:22px 0;"></div>
            <p style="margin:0 0 8px;color:rgba(255,255,255,.72);font-size:15px;"><strong>Service:</strong> ${escapeHtml(data.service)}</p>
            <p style="margin:0 0 8px;color:rgba(255,255,255,.72);font-size:15px;"><strong>Timeline:</strong> ${escapeHtml(data.timeline)}</p>
            <p style="margin:0;color:rgba(255,255,255,.72);font-size:15px;"><strong>Budget:</strong> ${escapeHtml(data.budget)}</p>
          </div>
          <p style="margin:22px 0 0;text-align:center;color:rgba(255,255,255,.34);font-size:12px;">inkaastudio.com · premium cinematic digital experiences</p>
        </div>
      </div>
    </div>
  `;
}

async function sendResendEmail(payload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Resend failed: ${message}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ message: "Email service is not configured." });
  }

  const data = normalizeInquiry(req.body);
  const validationError = validateInquiry(data);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const referenceId = makeReferenceId();
  const toEmail = process.env.INQUIRY_TO_EMAIL || "mosesmartin@inkaastudio.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Inkaa Studio <onboarding@resend.dev>";
  const replyToEmail = process.env.INQUIRY_REPLY_TO_EMAIL || toEmail;
  const shouldSendUserConfirmation = process.env.SEND_USER_CONFIRMATION !== "false";

  try {
    await sendResendEmail({
      from: fromEmail,
      to: [toEmail],
      reply_to: data.email,
      subject: `New Inkaa inquiry: ${data.fullName} · ${data.service}`,
      html: inquiryEmailHtml(data, referenceId),
      text: `New inquiry ${referenceId}\n\nName: ${data.fullName}\nEmail: ${data.email}\nCompany: ${data.company || "N/A"}\nService: ${data.service}\nBudget: ${data.budget}\nTimeline: ${data.timeline}\n\n${data.details}`,
    });

    if (shouldSendUserConfirmation) {
      try {
        await sendResendEmail({
          from: fromEmail,
          to: [data.email],
          reply_to: replyToEmail,
          subject: `Inquiry received · ${referenceId}`,
          html: confirmationEmailHtml(data, referenceId),
          text: `Inquiry Received\n\nYour vision has been received by Inkaa Studio. We'll review your inquiry and get back within 24-48 hours.\n\nReference: ${referenceId}\nService: ${data.service}\nTimeline: ${data.timeline}\nBudget: ${data.budget}`,
        });
      } catch (confirmationError) {
        console.warn("User confirmation email failed", confirmationError);
      }
    }

    return res.status(200).json({ referenceId });
  } catch (error) {
    console.error(error);
    return res.status(502).json({ message: "Inquiry could not be sent. Please try again shortly." });
  }
}
