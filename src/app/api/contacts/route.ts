import { connectDatabase, getAllDocuments, insertDocument } from "../../../services/mongo";

export async function GET() {
    const client = await connectDatabase();
    const documents = await getAllDocuments(client, 'contacts');
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request: Request) {
    const { name, owner } = await request.json();
    const client = await connectDatabase();
    const result = await insertDocument(client, 'contacts', { name, owner });
    client.close();
    return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
    });
}