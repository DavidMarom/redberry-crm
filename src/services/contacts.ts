import http from '@/services/http';
import { ContactType } from '@/types';

export async function getContactsByOwner(ownerId: string) {
    const response = await http.get(`contacts/${ownerId}`);
    return response.data;
}

export async function addContact(contact: ContactType) {
    const response = await http.post(`contacts`, contact);
    return response.data;
}

export async function deleteContact(contactId: string) {
    const response = await http.delete(`contacts`, { data: { _id: contactId } });
    return response.data;
}

export async function updateContact(contact: ContactType) {
    const response = await http.patch(`contacts`, { ...contact });
    return response.data;
}
