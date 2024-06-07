require('dotenv').config();

const accountSid = process.env.PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.PUBLIC_TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export async function POST(request: Request) {
    const { message, toPhone } = await request.json();

    client.messages
        .create({
            body: message,
            from: '+12183878520',
            to: toPhone
        })
        .then((message: { sid: any; }) => console.log('Message sent:', message.sid))
        .catch((error: any) => console.error(error));

    return new Response('SMS sent', { headers: { 'Content-Type': 'application/json' }, status: 200 });
}