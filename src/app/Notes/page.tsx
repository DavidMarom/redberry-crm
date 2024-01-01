"use client";

import React, { useState } from 'react';
import { getNotesByOwner, addNote, deleteNote } from "../../services/notes";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "@/app/layout";
import Image from "next/image";

const NotesPage = () => {

    const { data, isLoading, error } = useQuery("notes", () => getNotesByOwner(uid));
    const [notes, setNotes] = useState(data ?? []);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const user = localStorage.getItem("user");
    const uid = user ? JSON.parse(user).uid : null;

    const deleteMutation = useMutation((id: string) => deleteNote(id), { onSuccess: () => { queryClient.invalidateQueries('notes') } })
    const handleChange = (event: any) => { setInput(event.target.value) }

    const submitHandler = () => {
        setLoading(true);
        const note = { text: input, owner: uid };
        addNote(note)
            .then((response: any) => {
                setLoading(false);
                const newNote = { ...note, _id: response.insertedId }
                const newNotes = [...notes, newNote];
                setNotes(newNotes as never[]);
                localStorage.setItem("notes", JSON.stringify(newNotes));
            })
            .catch((err) => { console.log(err) });
    }

    return (
        <div className='full-width'>
            {isLoading ? <h1>Loading...</h1> : <h1>Notes</h1>}
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
                    data && data.map((note: any) => (
                        <div className='grid-item' key={note._id}>
                            <button className="row-r" onClick={() => deleteMutation.mutate(note._id)}><Image src="/x.svg" alt="Lichi Logo" width={18} height={18} />
                            </button>
                            {deleteMutation.isError && <div>Something went wrong</div>}
                            <div>{note.text}</div>
                        </div>
                    ))
                }
            </div>
        </div >
    );
};

export default NotesPage;
