const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyToken = async (req) => {
    const token = req.headers.get('Authorization').split(' ')[1];

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        return payload;
    }
    catch (error) {
        console.log('error', error);
        return null;
    }
}