import http from '@/services/http';

export function getNotesByOwner(ownerId: string) {
    return http.get(`notes/${ownerId}`)
        .then((response: any) => response.data)
        .catch((error: any) => error)
}

export function addNote(note: any) {
    return http.post(`notes`, note)
        .then((response: any) => response.data)
        .catch((error: any) => error)
}

export function deleteNote(noteId: string) {
    return http.delete(`notes`, { data: { _id: noteId } })
        .then((res) => res.data)
        .catch((error) => error);
}
