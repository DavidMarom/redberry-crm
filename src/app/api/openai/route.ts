import OpenAI from 'openai';
require('dotenv').config();

export async function POST(request: Request) {
    const apiKey = process.env.PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
        return new Response(JSON.stringify({ error: 'OpenAI API key is not configured' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    const openai = new OpenAI({ apiKey });
    const { notesArray } = await request.json();
    console.log(notesArray);
    const date = new Date();
    const requestToOpenAI = "The date today is " + date + ". I own a small business, I have a few tasks, please help me prioritize them, and tell me why you decided like this: \n" + notesArray.map((note: string) => note + "\n").join("") + "\n";

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 0.1,
        messages: [{ "role": "user", "content": requestToOpenAI }]
    });

    // console.log(response.choices[0].message);

    return new Response(JSON.stringify(response.choices[0].message), {
        headers: { 'Content-Type': 'application/json' },
    });

}

