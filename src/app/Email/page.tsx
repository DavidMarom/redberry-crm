"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import http from '@/services/http';
import { Card01 } from '@/components';
import { Button } from "@nextui-org/react";
import useContactsStore from "@/store/contacts";

const Email = () => {
    const router = useRouter();
    const [sending, setSending] = useState(false);
    const contactToEdit = useContactsStore((state) => state.contactToEdit);
    const [mailFields, setMailFields] = useState(contactToEdit.email);
    const [nameFields, setNameFields] = useState(contactToEdit.name);
    const [bodyTitle, setBodyTitle] = useState('Hi ' + '!');

    function handleSend(event: any) {
        event.preventDefault();
        setSending(true);
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());

        let newText = '';
        if (typeof value.body === 'string') {
            newText = value.body.replace(/\n/g, "<br>");
        }
        value.body = newText;

        http.post('send-mail', value)
            .then(() => {
                alert('Email sent!')
                router.push('/');
            })
            .catch((error: any) => { console.log(error) })
    }

    return (
        <div className="page-container2">
            <h1>Email your client:</h1> 
            <div className='row'>
            <Card01 width="auto">
                <form onSubmit={handleSend}>
                    <div className="mail-grid-container">
                        <label htmlFor="mail">Email:</label>
                        <input type="email" id="mail" name="mail" value={mailFields} onChange={(e) => { setMailFields(e.target.value) }} />

                        <label htmlFor="recName">Recipient Name:</label>
                        <input type="text" id="recName" name="recName" value={nameFields} onChange={(e) => { setNameFields(e.target.value) }} />

                        <label htmlFor="fromName">From Name:</label>
                        <input type="text" id="fromName" name="fromName" />

                        <label htmlFor="subject">Email Subject:</label>
                        <input type="text" id="subject" name="subject" />

                        <label htmlFor="bodyTitle">Body Title:</label>
                        <input type='text' id="bodyTitle" name="bodyTitle" value={bodyTitle} onChange={(e) => { setBodyTitle(e.target.value) }} />

                        <label htmlFor="body">Body Message:</label>
                        <textarea id="body" name="body" />

                        <br />
                        {!sending && <Button color="success" style={{ color: "#ffffff" }} type="submit">Send</Button>}
                    </div>
                </form>
            </Card01>
            </div>
        </div >
    );
};

export default Email;
