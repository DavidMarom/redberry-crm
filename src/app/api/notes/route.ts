import { connectDatabase, insertDocument, deleteDocument } from "../../../services/mongo";
import { verifyToken } from '@/services/middlewares/verifyToken';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        
        const user = await verifyToken(request);
        const { text, owner } = await request.json();
        const client = await connectDatabase();
        const result = await insertDocument(client, 'notes', { text, owner });
        client.close();
        return NextResponse.json({
            message: 'This is a protected route',
            user,
            result
        });
    }
    catch (error) {
        return NextResponse.json({
            message: 'This is a protected route',
            error
        });
    }
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
