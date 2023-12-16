import http from '@/services/http';
import { setContacts } from "@/store/contacts";
import { setContactLoading, unsetContactLoading } from "@/store/navigation";

export function getContactsByOwner(ownerId: string) {
    console.log("getContactsByOwner initiated");
    setContactLoading();
    http.get(`contacts/${ownerId}`)
        .then((response: any) => {
            if (!response.data) { alert("No contacts found") }
            else {
                setContacts(response.data);
                localStorage.setItem("contacts", JSON.stringify(response.data));
            }
        })
        .catch((error: any) => { console.log(error) })
        .finally(() => { unsetContactLoading() });
}

export function addContact(contact: any) {
    return http.post(`contacts`, contact)
        .then((response: any) => response.data)
        .catch((error: any) => { console.log(error) })
}