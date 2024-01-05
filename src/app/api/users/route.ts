import { connectDatabase, getAllDocuments, insertDocument, updateDocument, updateDocumentByUID } from "../../../services/mongo";

export async function GET() {
    const client = await connectDatabase();
    const documents = await getAllDocuments(client, 'users');
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const client = await connectDatabase();
    const result = await insertDocument(client, 'users', body);
    client.close();
    return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function PATCH(request: Request) {
    const body = await request.json();
    const client = await connectDatabase();
    const update = { $set: { bizName: body.bizName, country: body.country } };

    const documents = await updateDocumentByUID(client, 'users', body.uid, update);
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' }
    });

}