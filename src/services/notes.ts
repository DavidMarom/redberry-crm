import http from '@/services/http';
import { getAuth } from 'firebase/auth';

export function getNotesByOwner(ownerId: string) {
    return http.get(`notes/${ownerId}`)
        .then((response: any) => response.data)
        .catch((error: any) => error)
}

export async function addNote(note: any) {
    const token = await getAuth().currentUser?.getIdToken();
    return http.post(`notes`, note, { headers: { Authorization: `Bearer ${token}` } })
        .then((response: any) => response.data)
}

export function deleteNote(noteId: string) {
    return http.delete(`notes`, { data: { _id: noteId } })
        .then((res) => res.data)
        .catch((error) => error);
}
