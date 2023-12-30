require('dotenv').config();

const apiKey = process.env.PUBLIC_MANDRIL;
const mailchimpClient = require("@mailchimp/mailchimp_transactional")(apiKey);

export async function POST(request: Request) {
    const { mail, recName, fromName, subject, bodyTitle, body } = await request.json();
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
                        "email": mail,
                        "name": recName,
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