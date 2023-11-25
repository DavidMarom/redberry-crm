import { env } from "process";
const mailchimpClient = require("@mailchimp/mailchimp_transactional")(env.PUBLIC_MANDRIL || 'md' + '-DJRXFri1VK8JqDmXYDdWPg');

export async function POST(request: Request) {
    const { mail, name } = await request.json();
    console.log('Sending to:', mail, name);
    const run = async () => {
        const response = await mailchimpClient.messages.send({
            message: {
                "from_email": "info@redberry-crm.com",
                "from_name": "Redberry CRM",
                "subject": "Welcome to Redberry CRM!",
                "html": `
                <h1>Welcome to redberry CRM !</h1>
                <p>Hi ${name},<br />
                we are happy to see you!<br />
                <br />
                </p>
                <h2>Looking to hire a Front End Developer?: <a href="https://www.linkedin.com/in/maromdavid/" target="_blank">click here!</a></h2>
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