import { NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      age,
      phone,
      email,
      level = "Not specified",
      mode = "Not specified",
      message = "No additional notes",
      source = "Website Contact / Demo Form",
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required" },
        { status: 400 }
      );
    }

    // Save lead in Neon PostgreSQL database
    try {
      await prisma.lead.create({
        data: {
          name,
          age: age ? String(age) : null,
          phone,
          email: email || null,
          level: level || "Beginner",
          mode: mode || "Online",
          status: "NEW",
          source: source || "Website Enquiry",
          notes: message || null,
        },
      });
    } catch (dbErr) {
      console.warn("Could not save lead to database (continuing with email dispatch):", dbErr);
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from: "Elephant Chess Academy <onboarding@resend.dev>",
        to: "elephantchessacademy@gmail.com",
        replyTo: email || undefined,
        subject: `🏆 New Chess Enquiry: ${name} (${level})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 2px solid #0a1128; border-radius: 16px; overflow: hidden;">
            <div style="background: #0a1128; padding: 24px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 22px; color: #fdb813; letter-spacing: 1px; text-transform: uppercase;">
                🐘 Elephant Chess Academy
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #29a3dd; font-weight: bold;">
                New Student Admission & Trial Enquiry
              </p>
            </div>
            
            <div style="padding: 24px; color: #1e293b;">
              <div style="background: #f0f9ff; border-left: 4px solid #29a3dd; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 14px; font-weight: bold; color: #0369a1;">
                  📍 Source: ${source}
                </p>
              </div>

              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #64748b; width: 38%;">Student Name:</td>
                  <td style="padding: 10px 0; font-weight: bold; color: #0f172a;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Age / Grade:</td>
                  <td style="padding: 10px 0; color: #0f172a;">${age || "Not provided"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Parent Phone:</td>
                  <td style="padding: 10px 0; font-weight: bold; color: #0f172a;">
                    <a href="tel:${phone}" style="color: #0284c7; text-decoration: none;">${phone}</a>
                    &nbsp;|&nbsp;
                    <a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" style="color: #16a34a; text-decoration: none; font-weight: bold;">WhatsApp</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Parent Email:</td>
                  <td style="padding: 10px 0; color: #0f172a;">
                    ${email ? `<a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a>` : "Not provided"}
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Skill Level:</td>
                  <td style="padding: 10px 0; font-weight: bold; color: #d97706;">${level}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Preferred Mode:</td>
                  <td style="padding: 10px 0; color: #0f172a;">${mode}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: bold; color: #64748b; vertical-align: top;">Message / Notes:</td>
                  <td style="padding: 12px 0; color: #334155; line-height: 1.5;">${message}</td>
                </tr>
              </table>
            </div>

            <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
              Elephant Chess Academy • Danavai Peta, Rajamahendravaram, AP 533103<br/>
              Direct Hotline: +91 98878 21721
            </div>
          </div>
        `,
      });
    } else {
      console.warn("RESEND_API_KEY is not configured in .env. Enquiry received:", body);
    }

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully" });
  } catch (error: any) {
    console.error("Error processing enquiry email:", error);
    return NextResponse.json(
      { error: "Failed to send email enquiry", details: error?.message },
      { status: 500 }
    );
  }
}
