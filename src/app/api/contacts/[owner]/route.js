import { connectDatabase, getDocumentsByFilter } from "../../../../services/mongo";

export async function GET(request, params) {
    const owner = params.params.owner;

    const client = await connectDatabase();
    const documents = await getDocumentsByFilter(client, 'contacts', { owner: owner });
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}


