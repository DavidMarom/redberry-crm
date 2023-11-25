import { env } from "process";
const mailchimpClient = require("@mailchimp/mailchimp_transactional")(env.PUBLIC_MANDRIL);

export async function POST(request: Request) {
    const { mail, name } = await request.json();
    console.log('Sending to:', mail, name);
    const run = async () => {
        const response = await mailchimpClient.messages.send({
            message: {
                "from_email": "info@redberry-crm.com",
                "from_name": "Redberry CRM",
                "subject": "Welcome to Redberry CRM!",
                "text": "Welcome to Redberry CRM!",
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