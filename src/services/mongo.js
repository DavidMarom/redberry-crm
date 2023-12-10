// 'use client';
import { MongoClient, ObjectId } from "mongodb";

export async function connectDatabase() {
    const dbConnection = process.env.PUBLIC_DB_CONNECTION;
    return await MongoClient.connect(dbConnection);
}

export async function insertDocument(client, collection, document) {
    const db = client.db('rb');
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments(client, collection) {
    const db = client.db('rb');
    const documents = await db.collection(collection).find().toArray();
    return documents;
}

export async function getDocumentsByFilter(client, collection, filter) {
    const db = client.db('rb');
    const documents = await db.collection(collection).find(filter).toArray();
    return documents;
}

export async function getUser(client, userId) {
    const db = client.db('rb');
    const filter = { uid: userId };
    const result = await db.collection('users').findOne(filter);
    return result;
}

export async function deleteDocument(client, collection, id) {
    const db = client.db('rb');
    try {
        const objectId = new ObjectId(id);
        const filter = { _id: objectId };

        const result = await db.collection(collection).deleteOne(filter);
        return result;
    } catch (error) {
        console.log(error)
    }
    return result;
}
