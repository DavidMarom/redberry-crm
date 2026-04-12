export const verifyToken = async (req) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1];

    try {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken: token }),
            }
        );
        const data = await response.json();
        if (data.users && data.users.length > 0) {
            return data.users[0];
        }
        return null;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}
