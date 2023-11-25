const mailchimpClient = require("@mailchimp/mailchimp_transactional")("md-DJRXFri1VK8JqDmXYDdWPg");

export async function GET() {
    const run = async () => {
        const response = await mailchimpClient.messages.send({
            message: {
                "from_email": "info@redberry-crm.com",
                "from_name": "Redberry CRM",
                "subject": "Hello world",
                "text": "Welcome to Mailchimp Transactional!",
                "to": [
                    {
                        "email": "davidmarom.pro@gmail.com",
                        "name": "David Marom",
                        "type": "to"
                    }
                ]
            }
        });
        console.log(response);
    };

    run();

    return new Response('Hello world!');
}
