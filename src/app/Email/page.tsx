"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import http from '@/services/http';
import { Card01 } from '@/components';
import { Button } from "@nextui-org/react";
import useContactsStore from "@/store/contacts";

const AboutPage = () => {
    const router = useRouter();
    const [sending, setSending] = useState(false);
    const contactToEdit = useContactsStore((state) => state.contactToEdit);
    const [mailFields, setMailFields] = useState(contactToEdit.email);

    function handleSend(event: any) {
        event.preventDefault();
        setSending(true);
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        http.post('send-mail', value)
            .then((response: any) => {
                alert('Email sent!')
                router.push('/');
            })
            .catch((error: any) => { console.log(error) })
    }

    return (
        <div>
            <h1>Email your client:</h1>
            <Card01 width="100%">
                <form onSubmit={handleSend} >
                    <div className="mail-grid-container">
                        <label htmlFor="mail">Email:</label>
                        <input type="email" id="mail" name="mail" value={mailFields} onChange={(e) => { setMailFields(e.target.value) }} />

                        <label htmlFor="recName">Recipient Name:</label>
                        <input type="text" id="recName" name="recName" />

                        <label htmlFor="fromName">From Name:</label>
                        <input type="text" id="fromName" name="fromName" />

                        <label htmlFor="subject">Email Subject:</label>
                        <input type="text" id="subject" name="subject" />

                        <label htmlFor="bodyTitle">Body Title:</label>
                        <input type='text' id="bodyTitle" name="bodyTitle" />

                        <label htmlFor="body">Body Message:</label>
                        <textarea id="body" name="body" />

                        <br />
                        {!sending && <Button color="primary" type="submit">Send</Button>}

                    </div>
                </form>
            </Card01>

        </div >
    );
};

export default AboutPage;
