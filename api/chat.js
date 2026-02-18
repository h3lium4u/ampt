import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';
import { createClient } from '@supabase/supabase-js';

// Edge runtime is faster and cheaper on Vercel
export const config = { runtime: 'edge' };

// Initialize Supabase and OpenAI
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const configOpenAI = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configOpenAI);

export default async function handler(req) {
    try {
        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1].content;

        // 1. Search for relevant context in Supabase using the match_documents function
        // (You will need to implement embedding generation here for production)
        const { data: documents } = await supabase.rpc('match_documents', {
            query_embedding: [], // Use OpenAI Embeddings API here
            match_threshold: 0.7,
            match_count: 5,
        });

        const context = documents?.map(doc => doc.content).join('\n') || '';

        // 2. Build the prompt
        const systemPrompt = `
      You are an AI assistant for Faizaan's portfolio.
      Use the following context about Faizaan to answer the user's question.
      If you don't know the answer, say you don't know.
      Context: ${context}
    `;

        // 3. Request a completion from OpenAI
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages.map(m => ({
                    role: m.role || 'user',
                    content: m.content
                }))
            ],
        });

        // 4. Return the stream to the frontend
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
