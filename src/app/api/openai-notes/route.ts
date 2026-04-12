import OpenAI from 'openai';

export async function POST(request: Request) {
    const apiKey = process.env.PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
        return new Response(JSON.stringify({ error: 'OpenAI API key is not configured' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const openai = new OpenAI({ apiKey });
    const { notes } = await request.json();

    const noteList = notes
        .map((n: { _id: string; text: string }) => `ID: ${n._id}\nText: ${n.text}`)
        .join('\n\n');

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'system',
                content:
                    'You are a productivity assistant. Reorder the given notes from most to least urgent/important based on their content. Respond with ONLY a JSON object with an "ids" key containing an array of IDs in priority order, no explanation.',
            },
            { role: 'user', content: noteList },
        ],
        response_format: { type: 'json_object' },
    });

    return new Response(response.choices[0].message.content, {
        headers: { 'Content-Type': 'application/json' },
    });
}
