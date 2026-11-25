import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = { name?: string; phone?: string; type?: string; message?: string };

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  if (name.length < 2 || phone.length < 6) {
    return NextResponse.json({ ok: false, error: "Name and phone are required" }, { status: 400 });
  }
  const lead = { name, phone, type: body.type ?? "", message: (body.message ?? "").slice(0, 2000), at: new Date().toISOString() };

  // TODO: send the lead to your inbox or CRM (nodemailer, Resend, WhatsApp API, database).
  console.log("New lead:", lead);

  return NextResponse.json({ ok: true });
}
