require('dotenv').config();

export async function POST(request: Request) {
    const apiKey = process.env.PUBLIC_MANDRIL;
    if (!apiKey) {
        return new Response(JSON.stringify({ error: 'Mailchimp API key is not configured' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    const mailchimpClient = require("@mailchimp/mailchimp_transactional")(apiKey);
    const { email, recipientName, fromName, subject, bodyTitle, body } = await request.json();
    const run = async () => {
        const response = await mailchimpClient.messages.send({
            message: {
                "from_email": "info@redberry-crm.com",
                "from_name": fromName,
                "subject": subject,
                "html": `
                <h1>${bodyTitle}</h1>
                <br />
                ${body}
                <br />
                <br />
                <br />
                <br />
                <br />
                <img src="https://res.cloudinary.com/dojmo7vcc/image/upload/v1702237675/redberry/rb_pjm7sr.png" alt="Redberry CRM" />
                <br />
                Sent via <a href="https://www.redberry-crm.com/" targer="_blank">Redberry CRM</a>
                `,
                "to": [
                    {
                        "email": email,
                        "name": recipientName,
                        "type": "to"
                    }
                ]
            }
        });
        console.log(response);
    };

    run();

    return new Response('Sent Email', {
        headers: { 'Content-Type': 'application/json' },
    });
}