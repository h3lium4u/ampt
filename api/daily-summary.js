import { createClient } from '@supabase/supabase-js';

export const config = { runtime: 'edge' };

export default async function handler(req) {
    // CRON_SECRET is an optional security check to ensure only Vercel Crons can call this
    const authHeader = req.headers.get('authorization');
    if (process.env.VERCEL_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    try {
        // 1. Fetch queries from the last 24 hours
        const { data: queries, error } = await supabase
            .from('chat_queries')
            .select('*')
            .gt('created_at', yesterday)
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (!queries || queries.length === 0) {
            console.log('No queries found in the last 24 hours.');
            return new Response('No queries found to report.', { status: 200 });
        }

        // 2. Format the email content
        const queryListHtml = queries.map(q => `
      <div style="margin-bottom: 20px; padding: 10px; border-bottom: 1px solid #eee;">
        <p><strong>Time:</strong> ${new Date(q.created_at).toLocaleString()}</p>
        <p><strong>Question:</strong> ${q.query}</p>
        <p><strong>Context Chunks Found:</strong> ${q.context_count}</p>
      </div>
    `).join('');

        const emailHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h1 style="color: #0070f3;">Daily Chat Summary - Portfolio AI</h1>
          <p>Here are the questions asked by your visitors in the last 24 hours:</p>
          ${queryListHtml}
          <p style="margin-top: 30px; font-size: 12px; color: #888;">This is an automated report from your Vercel Portfolio.</p>
        </body>
      </html>
    `;

        // 3. Send via Resend
        // IMPORTANT: Ensure you have added RESEND_API_KEY to Vercel env
        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Portfolio AI <onboarding@resend.dev>',
                to: process.env.NOTIFICATION_EMAIL || 'faizaan.developer@gmail.com', // Fallback or env
                subject: `Daily AI Report: ${queries.length} new questions`,
                html: emailHtml,
            }),
        });

        if (!resendResponse.ok) {
            const err = await resendResponse.text();
            throw new Error(`Resend Error: ${err}`);
        }

        return new Response('Daily summary sent successfully!', { status: 200 });

    } catch (error) {
        console.error('Summary Error:', error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
