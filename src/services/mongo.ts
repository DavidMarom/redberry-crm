// 'use client';
import { MongoClient, ObjectId } from "mongodb";

export async function connectDatabase() {
    const dbConnection: any = process.env.PUBLIC_DB_CONNECTION;
    return await MongoClient.connect(dbConnection);
}

export async function insertDocument(client: any, collection: string, document: object) {
    const db = client.db('rb');
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments(client: any, collection: string) {
    const db = client.db('rb');
    const documents = await db.collection(collection).find().toArray();
    return documents;
}

export async function getDocumentsByFilter(client: any, collection: string, filter: object) {
    const db = client.db('rb');
    const documents = await db.collection(collection).find(filter).toArray();
    return documents;
}

export async function getUser(client:any, userId:string) {
    const db = client.db('rb');
    const filter = { uid: userId };
    const result = await db.collection('users').findOne(filter);
    return result;
}

export async function deleteDocument(client: any, collection: string, id: string) {
    const db = client.db('rb');
    try {
        const objectId = new ObjectId(id);
        const filter = { _id: objectId };
        const result = await db.collection(collection).deleteOne(filter);
        return result;
    } catch (error) {
        console.log(error)
    }
}

export async function updateDocument(client: any, collection: string, id: string, update: object) {
    const db = client.db('rb');
    try {
        const objectId = new ObjectId(id);
        const filter = { _id: objectId };
        const result = await db.collection(collection).updateOne(filter, update);
        return result;
    } catch (error) {
        console.log(error)
    }
}
