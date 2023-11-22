import { connectDatabase, getUser } from "../../../../services/mongo";

export async function GET(request, params) {

    const userId = params.params.userId;
    const client = await connectDatabase();
    const user = await getUser(client, userId);
    client.close();

    return new Response(JSON.stringify(user), {
        headers: { 'Content-Type': 'application/json' },
    });
}
