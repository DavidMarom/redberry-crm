import { connectDatabase, getAllDocuments } from "../../../services/mongo";

export async function GET() {
    const client = await connectDatabase();
    const documents = await getAllDocuments(client, 'contacts' );
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}
