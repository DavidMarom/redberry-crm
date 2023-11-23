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

    return (
        <div>
            <h1>Contacts</h1>
            <br />
            <p>Contacts:</p>
            {contacts.map((contact: any, idx: number) => (
                <p key={idx}>{contact.name}</p>
            ))}


        </div>
    );
};

export default ContactsPage;
