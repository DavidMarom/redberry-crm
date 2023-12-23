"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import http from '@/services/http';
import { Card01 } from '@/components';
import { Button } from "@nextui-org/react";


const AboutPage = () => {
    const router = useRouter();

    const [sending, setSending] = useState(false);

    function handleSend(event: any) {
        event.preventDefault();
        setSending(true);
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        http.post('send-mail', value)
            .then((response: any) => {
                console.log(response)
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
                        <input type="email" id="mail" name="mail" />

                        <label htmlFor="recName">Recipient Name:</label>
                        <input type="text" id="recName" name="recName" />

                        <label htmlFor="fromName">From Name:</label>
                        <input type="text" id="fromName" name="fromName" />

                        <label htmlFor="subject">Subject:</label>
                        <input type="text" id="subject" name="subject" />

                        <label htmlFor="bodyTitle">Title:</label>
                        <input type='text' id="bodyTitle" name="bodyTitle" />

                        <label htmlFor="body">Message body:</label>
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
