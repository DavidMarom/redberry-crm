import http from '@/services/http';
import { setContacts, contacts } from "@/store/contacts";
import { setContactLoading, unsetContactLoading } from "@/store/navigation";

export function getContactsByOwner(ownerId: string) {
    console.log("getContactsByOwner initiated");
    setContactLoading();
    http.get(`contacts/${ownerId}`)
        .then((response: any) => {
            unsetContactLoading();
            if (!response.data) { alert("No contacts found") }
            else {
                setContacts(response.data);
                localStorage.setItem("contacts", JSON.stringify(response.data));
            }
        })
        .catch((error: any) => { console.log(error) });
}

export function addContact(contact: any) {
    http.post("contacts", contact)
        .then((response: any) => {
            const newContact = { ...contact, _id: response.data.insertedId }
            const newContacts = [...contacts, newContact];
            setContacts(newContacts as never[]);
        })
        .catch((error: any) => {
            console.log(error);
        })
        .finally(() => { unsetContactLoading(); });
}
