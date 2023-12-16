"use client";

import React, { useEffect, useState } from 'react';
import http from "../../services/http";
import Image from "next/image";

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const user = localStorage.getItem("user");
    const uid = user ? JSON.parse(user).uid : null;

    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem("notes") != null) {
            setNotes(JSON.parse(localStorage.getItem("notes") ?? ""));
        }

        http.get(`notes/${uid}`)
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

    const handleDelete = (id: any) => {
        setLoading(true);
        http.delete(`notes`, { data: { _id: id } })
            .then(() => {
                const newNotes = notes.filter(
                    (note: any) => note._id !== id
                );
                setNotes(newNotes);
                localStorage.setItem("notes", JSON.stringify(newNotes));
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const handleChange = (event: any) => { setInput(event.target.value) }

    const submitHandler = () => {
        setLoading(true);
        const note = { text: input, owner: uid };
        http
            .post("notes", note)
            .then((response: any) => {
                setLoading(false);
                setInput("");
                const newNote = { ...note, _id: response.data.insertedId }
                const newNotes = [...notes, newNote];
                setNotes(newNotes as never[]);
                localStorage.setItem("notes", JSON.stringify(newNotes));
            })
            .catch((error: any) => {
                console.log(error);
            });
    }


    return (
        <div className='full-width'>
            {loading ? <h1>Loading...</h1> : <h1>Notes</h1>}
            <div className='grid-container '>
                <div className='grid-item'>
                    <textarea onChange={handleChange} value={input} />
                    <div className='row-r'>
                        <button onClick={submitHandler}>
                            <Image src="/enter.svg" alt="Enter" width={22} height={22} />
                        </button>
                    </div>
                </div>
                {
                    notes.map((note: any) => (
                        <div className='grid-item' key={note._id}>
                            <button className="row-r" onClick={() => { handleDelete(note._id) }}><Image src="/x.svg" alt="Lichi Logo" width={18} height={18} />
                            </button>
                            <div>{note.text}</div>
                        </div>
                    ))
                }
            </div>
        </div >
    );
};

export default NotesPage;
