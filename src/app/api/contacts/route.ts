import { connectDatabase, insertDocument, deleteDocument, updateDocument } from "../../../services/mongo";

export async function POST(request: Request) {
    const { name, email, status, owner, phone, note } = await request.json();
    const client = await connectDatabase();
    const result = await insertDocument(client, 'contacts', { name, email, status, owner, phone, note });
    client.close();
    return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function DELETE(request: Request) {
    const body = await request.json();
    const client = await connectDatabase();
    const documents = await deleteDocument(client, 'contacts', body._id);
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function PATCH(request: Request) {
    const body = await request.json();
    const client = await connectDatabase();
    const update = { $set: { name: body.name, email: body.email, status: body.status, phone: body.phone, note: body.note } };
    const documents = await updateDocument(client, 'contacts', body._id, update);
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}

