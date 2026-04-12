import { connectDatabase, getDocumentsByFilter } from "../../../../services/mongo";
import { ContactGetType } from "../../apiTypes";

export async function GET(request: Request, { params }: { params: Promise<{ owner: string }> }) {
    const { owner } = await params;
    const client = await connectDatabase();
    const documents = await getDocumentsByFilter(client, 'notes', { owner: owner });
    client.close();
    return new Response(JSON.stringify(documents), {
        headers: { 'Content-Type': 'application/json' },
    });
}
