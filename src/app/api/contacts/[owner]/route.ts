import { connectDatabase, getDocumentsByFilter } from "../../../../services/mongo";

export async function GET(
    request: Request,
    { params }: { params: { owner: string } }
) {
    const owner = params.owner;

    const client = await connectDatabase();
    const documents = await getDocumentsByFilter(
        client,
        "contacts",
        { owner }
    );
    client.close();

    return new Response(JSON.stringify(documents), {
        headers: { "Content-Type": "application/json" },
    });
}
