"use client";

import React, { useEffect, useState } from 'react';
import http from '../../services/http';

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);

    const user = localStorage.getItem('user');
    const uid = user ? JSON.parse(user).uid : null;

    useEffect(() => {
        http.get(`contacts/${uid}`)
            .then((response: any) => {
                if (!response.data) {
                    alert('No contacts found');

                } else {
                    setContacts(response.data)
                }
            })
            .catch((error: any) => { console.log(error) });

    }, []);

    const submitHandler = (e: any) => {
        e.preventDefault();
        const name = e.target.name.value;

        const contact = {
            name,
            owner: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '').uid : null
        }

        http.post('contacts', contact)
            .then((response: any) => {
                const newContacts = [...contacts, contact];
                setContacts(newContacts as never[])
            })
            .catch((error: any) => { console.log(error) });
    }

    return (
        <div>
            <h1>Contacts</h1>
            <br />
            <p>Contacts:</p>
            {contacts.map((contact: any, idx: number) => (
                <p key={idx}>{contact.name}</p>
            ))}

            <br/>

            <h2>Add contact</h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />
                <button type="submit">Add contact</button>
            </form>

        </div>
    );
};

export default ContactsPage;
