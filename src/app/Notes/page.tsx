"use client";

import React, { useEffect, useState } from 'react';
import http from "../../services/http";

const NotesPage = () => {


    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = localStorage.getItem("user");
    const uid = user ? JSON.parse(user).uid : null;

    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem("notes") != null) {
            setNotes(JSON.parse(localStorage.getItem("notes") ?? ""));
        }

        http
            .get(`notes/${uid}`)
            .then((response: any) => {
                setLoading(false);
                if (!response.data) {
                    alert("No notes found");
                } else {
                    setNotes(response.data);
                    localStorage.setItem("notes", JSON.stringify(response.data));
                }
            })
            .catch((error: any) => {
                setLoading(false);
                console.log(error);
            });
    }, []);


    if (loading) return (<div>Loading...</div>);


    return (
        <div className='full-width'>
            <h1>Notes</h1>
            <div className='grid-container '>
                <p>Add note</p>
                {
                    notes.map((note: any) => (
                        <div className='grid-item' key={note._id}>
                            <div>{note.text}</div>
                        </div>
                    ))
                }
            </div>
            



        </div >
    );
};

export default NotesPage;
