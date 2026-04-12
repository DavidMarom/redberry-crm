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
    const { mail, name } = await request.json();
    const run = async () => {
        const response = await mailchimpClient.messages.send({
            message: {
                "from_email": "info@redberry-crm.com",
                "from_name": "David from Redberry CRM",
                "subject": "Welcome to Redberry CRM!",
                "html": `
                <img src="https://res.cloudinary.com/dojmo7vcc/image/upload/v1702237675/redberry/rb_pjm7sr.png" alt="Redberry CRM" />
                <h1>Welcome to redberry CRM !</h1>
                <p>Hi ${name},<br />
                we are happy to see you!<br />
                <br />
                </p>
                <h2>Contact us: <a href="https://www.linkedin.com/in/maromdavid/" target="_blank">click here!</a></h2>
                `,
                "to": [
                    {
                        "email": mail,
                        "name": name,
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