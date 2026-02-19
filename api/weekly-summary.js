import { createClient } from '@supabase/supabase-js';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  // Authorization check (Temporarily disabled for user testing)
  /*
  const authHeader = req.headers.get('authorization');
  if (process.env.VERCEL_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  */

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Look back 7 days
  const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  try {
    // 1. Fetch queries from the last 7 days
    const { data: queries, error } = await supabase
      .from('chat_queries')
      .select('*')
      .gt('created_at', lastWeek)
      .order('created_at', { ascending: false });

    if (error) throw error;

    let emailHtml;
    let subject;

    if (!queries || queries.length === 0) {
      console.log('AI_BRAIN: No queries found in the last 7 days.');
      subject = "Weekly AI Report: No new messages";
      emailHtml = `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h1 style="color: #0070f3;">Weekly Chat Summary - Portfolio AI</h1>
            <p>I tracked your visitor activity for the last 7 days, and <strong>no new messages</strong> were found.</p>
            <p>Everything is working correctly, but it was just a quiet week!</p>
            <p style="margin-top: 30px; font-size: 12px; color: #888;">This is an automated report from your Vercel Portfolio.</p>
          </body>
        </html>
      `;
    } else {
      console.log(`AI_BRAIN: Found ${queries.length} queries.`);
      subject = `Weekly AI Report: ${queries.length} new questions`;
      const queryListHtml = queries.map(q => `
        <div style="margin-bottom: 25px; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #f9f9f9;">
        <p style="margin: 0 0 10px 0; color: #666; font-size: 12px;"><strong>Time:</strong> ${new Date(q.created_at).toLocaleString()}</p>
        <p style="margin: 0 0 10px 0;"><strong>Visitor:</strong> ${q.query}</p>
        <p style="margin: 0 0 10px 0; color: #0070f3;"><strong>AI Response:</strong> ${q.answer || '<em>No answer recorded</em>'}</p>
        <p style="margin: 0; font-size: 11px; color: #999;"><em>Context Chunks: ${q.context_count}</em></p>
      </div>
      `).join('');

      emailHtml = `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h1 style="color: #0070f3;">Weekly Chat Summary - Portfolio AI</h1>
            <p>Here are the questions asked by your visitors in the last 7 days:</p>
            ${queryListHtml}
            <p style="margin-top: 30px; font-size: 12px; color: #888;">This is an automated report from your Vercel Portfolio.</p>
          </body>
        </html>
      `;
    }

    // 2. Send via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio AI <onboarding@resend.dev>',
        to: process.env.NOTIFICATION_EMAIL || 'faizaan.developer@gmail.com',
        subject: subject,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const err = await resendResponse.text();
      throw new Error(`Resend Error: ${err}`);
    }

    return new Response('Weekly summary processed successfully!', { status: 200 });

  } catch (error) {
    console.error('AI_BRAIN_ERROR:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
