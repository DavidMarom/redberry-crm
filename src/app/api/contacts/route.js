import { connectDatabase, getDocumentsByFilter } from "../../../services/mongo";

export async function GET() {
    const client = await connectDatabase();
    const documents = await getDocumentsByFilter(client, 'contacts', { owner: 'RMoaUsadiSTcWKDSEXyJi0zctXc2' });
    console.log('-----------',documents);
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}