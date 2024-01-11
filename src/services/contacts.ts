import http from '@/services/http';

export function getContactsByOwner(ownerId: string) {
    return http.get(`contacts/${ownerId}`)
        .then((response: any) => response.data)
        .catch((error: any) => error)
}

export function addContact(contact: any) {
    return http.post(`contacts`, contact)
        .then((response: any) => response.data)
        .catch((error: any) => error)
}

export function deleteContact(contactId: string) {
    return http.delete(`contacts`, { data: { _id: contactId } })
        .then((res) => res.data)
        .catch((error) => error);
}

export function updateContact2(contact: any) {
    return http.patch(`contacts`, { ...contact })
        .then((res) => res.data)
        .catch((error) => error);
}