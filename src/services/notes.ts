import http from '@/services/http';

export function getNotesByOwner(ownerId: string) {
    return http.get(`notes/${ownerId}`)
        .then((response: any) => response.data)
        .catch((error: any) => error)
}

export function addNote(note: any) {
    const ls = localStorage.getItem('user');
    const token = ls ? JSON.parse(ls).token : '';
    

    return http.post(`notes`, note, { headers: { Authorization: `Bearer ${token}` } })
        .then((response: any) => response.data)
        .catch((error: any) => error)
}

export function deleteNote(noteId: string) {
    return http.delete(`notes`, { data: { _id: noteId } })
        .then((res) => res.data)
        .catch((error) => error);
}
