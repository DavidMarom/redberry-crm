import http from '@/services/http';
import { store } from '@/store/user';

export function getNotesByOwner(ownerId: string) {
    return http.get(`notes/${ownerId}`)
        .then((response: any) => response.data)
        .catch((error: any) => error)
}

export function addNote(note: any) {
    const token = store().jwt;
    return http.post(`notes`, note, { headers: { Authorization: `Bearer ${token}` } })
        .then((response: any) => response.data)
        .catch((error: any) => error)
}

export function deleteNote(noteId: string) {
    return http.delete(`notes`, { data: { _id: noteId } })
        .then((res) => res.data)
        .catch((error) => error);
}
