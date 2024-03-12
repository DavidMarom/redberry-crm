import OpenAI from 'openai';
require('dotenv').config();
const openai = new OpenAI({ apiKey: process.env.PUBLIC_OPENAI_API_KEY });

export async function POST(request: Request) {
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

