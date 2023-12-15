import { connectDatabase, insertDocument ,deleteDocument} from "../../../services/mongo";

export async function POST(request: Request) {
    const { name, email, status, owner } = await request.json();
    const client = await connectDatabase();
    const result = await insertDocument(client, 'notes', { name, email, status, owner });
    client.close();
    return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function DELETE(request: Request) {
    const body = await request.json();
    const client = await connectDatabase();
    const documents = await deleteDocument(client, 'notes', body._id);
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}
